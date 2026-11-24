"use strict";

const byId = id => document.getElementById(id);
const clockText = utc => utc.slice(11, 16);
const prettyDay = day => new Intl.DateTimeFormat("en", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC"
}).format(new Date(day + "T12:00:00Z"));

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function clockColumn(utc, version) {
  const time = clockText(utc);
  const [hour, minute] = time.split(":").map(Number);
  const col = element("div", undefined, "clock-col");
  const row = element("div", undefined, "clock-time");
  const dial = element("span", undefined, "dial");
  dial.setAttribute("aria-hidden", "true");
  dial.style.setProperty("--minutes", minute * 6 + "deg");
  dial.style.setProperty("--hours", (hour % 12 * 30 + minute / 2) + "deg");
  dial.append(element("i"), element("b"));
  row.append(dial, element("strong", time));
  col.append(row, element("small", version + " · UTC"));
  return col;
}

function compareCard(row, manifest) {
  const o = row.occurrence;
  const fixed = o.intent === "fixed";
  const card = element("article", undefined, fixed ? "card fixed" : "card");
  const head = element("div", undefined, "card-head");
  const minutes = (Date.parse(row.target) - Date.parse(row.stored)) / 60000;
  head.append(element("h3", o.label), element("span", minutes === 0 ? "Keep instant" : Math.abs(minutes) + " min " + (minutes < 0 ? "earlier" : "later"), "change"));
  const promise = fixed ? "Fixed instant · " + manifest.fixedUtcTime + " UTC" : "Local time · " + manifest.localTime + " in Havana";
  const times = element("div", undefined, "clock-grid");
  const arrow = element("span", "→", "arrow");
  arrow.setAttribute("aria-hidden", "true");
  times.append(clockColumn(row.stored, "2026e"), arrow, clockColumn(row.target, "2026f"));
  card.append(head, element("p", promise, "promise"), times);
  return card;
}

function table(headers, rows) {
  const node = element("table");
  const head = node.createTHead().insertRow();
  headers.forEach(label => {
    const th = element("th", label);
    th.scope = "col";
    head.append(th);
  });
  const body = node.createTBody();
  for (const cells of rows) {
    const tr = body.insertRow();
    cells.forEach(value => { tr.insertCell().textContent = value; });
  }
  return node;
}

const scenario = byId("scenario");
const sequence = ["Review", "Approved", "Interrupted", "Replayed"];
let data, phase = 0, repeated = false, request = 0;

function showEvidence() {
  const m = data.manifest;
  const firstDay = m.pendingDays[0];
  const first = data.review.plan.rows.filter(row => row.occurrence.day === firstDay);
  byId("chart").replaceChildren(...first.map(row => compareCard(row, m)));
  const overnight = m.id === "overnight";
  document.querySelector(".lede").textContent = overnight
    ? "The old rules gave Havana two midnights on November 1. The night shift chose the later 00:30 for handover. Its archive partner expects the file at 05:30 UTC."
    : "Havana canceled its November clock change. A dispatch team still needs its morning briefing at 9. Its settlement partner still expects a file at 14:00 UTC.";
  byId("intro-detail").textContent = "Showing " + prettyDay(firstDay) + ". " + (overnight
    ? "The earlier rules gave 00:30 two possible instants. The operator had selected the later one."
    : "The same change applies to the following day’s dispatch.");
  byId("policy").value = "intent";
  comparePolicy();
  byId("receipt").href = "receipts/" + m.id + ".json";
}

function comparePolicy() {
  if (!data) return;
  const policyRun = data.policyRuns[byId("policy").value];
  const expected = data.policyRuns.intent.scheduled;
  const pending = data.review.plan.rows.filter(r => r.decision !== "protect");
  const misses = new Set(policyRun.missedIntent);
  const firstMiss = pending.find(row => misses.has(row.occurrence.id));
  const summary = firstMiss
    ? firstMiss.occurrence.label + " missed its promise. Expected " + clockText(expected[firstMiss.occurrence.id]) +
      " UTC, fired at " + clockText(policyRun.scheduled[firstMiss.occurrence.id]) + " UTC."
    : "Every pending job fired at its promised time.";
  byId("policy-summary").textContent = summary;
  byId("policies").replaceChildren(table(["Date", "Job", "Promised UTC", "Fired UTC", "Result"], pending.map(row => {
    const job = row.occurrence;
    return [prettyDay(job.day), job.label, clockText(expected[job.id]), clockText(policyRun.scheduled[job.id]), misses.has(job.id) ? "Missed" : "Matched"];
  })));
}

function ledger() {
  const section = byId("ledger");
  section.hidden = phase < 2;
  if (section.hidden) return;
  const rows = data.review.plan.rows;
  if (phase === 2) {
    byId("ledger-title").textContent = "Triggers after interruption";
    byId("ledger-note").textContent = "Read directly from the SQLite trigger table after the operating system stopped the worker. Past firings were already recorded.";
    byId("rows").replaceChildren(table(["Date", "Job", "Original UTC", "Stored UTC"], rows.filter(r => r.decision !== "protect").map(r => [
      prettyDay(r.occurrence.day), r.occurrence.label, clockText(r.stored), clockText(data.interruptedTriggers[r.occurrence.id])
    ])));
  } else {
    const observed = data.resumed.observed;
    const lookup = new Map(rows.map(r => [r.occurrence.id, r]));
    byId("ledger-title").textContent = "Firing ledger";
    byId("ledger-note").textContent = "Recorded inside the Quartz job callback. All times below use the scheduler’s controlled UTC clock.";
    byId("rows").replaceChildren(table(["Date", "Job", "Fired UTC", "Worker"], observed.effects.map(fire => {
      const row = lookup.get(fire.id);
      return [prettyDay(row.occurrence.day), row.occurrence.label, clockText(fire.fired), row.decision === "protect" ? "Original" : "Restarted"];
    })));
  }
}

function render() {
  const moved = data.review.plan.rows.filter(row => row.decision === "move").length;
  const past = data.history.length;
  const pending = data.review.plan.rows.length - past;
  const fired = data.resumed.observed.attempts.length - past;
  const checkpoint = data.interrupt;
  const message = [
    ["Review the proposed move", moved + " local occurrence" + (moved === 1 ? "" : "s") + " would move. The fixed schedule keeps its UTC time. " + past + " past firings are protected."],
    ["Approval recorded", "The worker can now apply the reviewed trigger times. Interrupt it after the first reschedule commits to SQLite."],
    ["Worker stopped after the first write", prettyDay(checkpoint.id.split("/")[1]) + " is stored at " + clockText(checkpoint.after) + " UTC. Reopen the database to reconcile the approved changes."],
    [repeated ? "Replay added " + data.secondReplayCallbacks + " callbacks" : "The restarted worker fired " + fired + " pending jobs",
      fired + " of " + pending + " matched their approved UTC instant. The " + past + " original firings kept their records."]
  ][phase];
  byId("message").replaceChildren(element("h3", message[0]), element("p", message[1]));
  document.querySelectorAll(".steps li").forEach((item, i) => {
    if (sequence[i] === sequence[phase]) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  const action = element("button", ["Approve " + moved + (moved === 1 ? " move" : " moves"), "Interrupt worker", "Restart and replay", "Replay again"][phase]);
  action.onclick = () => {
    if (phase === 3) repeated = true;
    else phase++;
    render();
    byId("actions").querySelector("button").focus({preventScroll:true});
  };
  const actions = byId("actions");
  actions.replaceChildren(action);
  if (phase > 0) {
    const reset = element("button", "Start over", "secondary");
    reset.onclick = () => { phase = 0; repeated = false; render(); byId("actions").querySelector("button").focus({preventScroll:true}); };
    actions.append(reset);
  }
  ledger();
}

async function load() {
  const id = ++request;
  const name = scenario.value;
  byId("actions").replaceChildren();
  try {
    const response = await fetch("receipts/" + name + ".json");
    if (!response.ok) throw new Error("Missing recording");
    const receipt = await response.json();
    if (id !== request) return;
    data = receipt;
    phase = 0;
    repeated = false;
    showEvidence();
    render();
  } catch {
    if (id !== request) return;
    byId("chart").replaceChildren();
    byId("intro-detail").textContent = "The recorded rehearsal could not load. Open the JSON receipt or reload this page over HTTP.";
    byId("message").replaceChildren();
    byId("ledger").hidden = true;
    byId("receipt").href = "receipts/" + name + ".json";
  }
}

scenario.addEventListener("change", load);
byId("policy").addEventListener("change", comparePolicy);
load();
