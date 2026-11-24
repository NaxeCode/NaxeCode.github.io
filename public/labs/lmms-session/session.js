"use strict";
const S = SessionScore,
	synth = SessionSynth,
	project = S.create();
const $ = (id) => document.getElementById(id);
const options = (items, selected) =>
	items
		.map(
			([value, title]) =>
				`<option value="${value}" ${value === selected ? "selected" : ""}>${title}</option>`,
		)
		.join("");
const sequence = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
let active = 0,
	barIndex = 0,
	selected = project.tracks[0].notes[0],
	keys = [],
	undoStack = [];
let ctx = null,
	mix = null,
	run = null,
	pausedTick = 0,
	starting = false;
function track() {
	return project.tracks[active];
}
function snapshot() {
	undoStack.push(
		JSON.stringify({
			tracks: project.tracks,
			bpm: project.bpm,
			active,
			barIndex,
			selectedIndex: track().notes.indexOf(selected),
		}),
	);
	if (undoStack.length > 40) undoStack.shift();
}
function announce(message) {
	$("status").textContent = message;
}
function secPerTick() {
	return 60 / (project.bpm * S.beat);
}
function currentTick() {
	return run
		? (run.startTick +
				Math.max(0, ctx.currentTime - run.origin) / run.sec) %
				S.length
		: pausedTick;
}
async function audio() {
	if (!ctx) {
		ctx = new AudioContext();
		mix = synth.master(ctx);
	}
	if (ctx.state !== "running") await ctx.resume();
}
function stopRun() {
	if (!run) return;
	clearInterval(run.timer);
	cancelAnimationFrame(run.frame);
	run.bus.disconnect();
	run = null;
}
function moveCursor(tick) {
	$("position").value =
		`${Math.floor(tick / S.bar) + 1}.${Math.floor((tick % S.bar) / S.beat) + 1}`;
	document.querySelectorAll(".cursor").forEach((c) => {
		c.style.display = run ? "block" : "none";
		c.style.left = (100 * tick) / S.length + "%";
	});
	const c = $("roll-cursor");
	if (c) {
		c.style.display =
			run && Math.floor(tick / S.bar) === barIndex ? "block" : "none";
		c.style.left = (100 * (tick % S.bar)) / S.bar + "%";
	}
}
function begin(tick) {
	stopRun();
	const bus = ctx.createGain();
	bus.connect(mix);
	run = {
		bus,
		startTick: tick,
		origin: ctx.currentTime + 0.035,
		sec: secPerTick(),
		next: tick,
		timer: 0,
		frame: 0,
	};
	// Include a sustained note when playback resumes in its middle.
	for (const t of project.tracks)
		if (!t.muted)
			for (const n of t.notes)
				if (n.pos < tick && n.pos + n.len > tick)
					synth.instrument(
						ctx,
						bus,
						t,
						n,
						run.origin,
						(n.pos + n.len - tick) * run.sec,
					);
	function queue() {
		const r = run;
		if (!r) return;
		const elapsed = (ctx.currentTime - r.origin) / r.sec + r.startTick;
		const from = Math.max(r.next, elapsed),
			until = elapsed + 0.16 / r.sec;
		for (
			let cycle = Math.floor(from / S.length);
			cycle <= Math.floor(until / S.length);
			cycle++
		) {
			for (const t of project.tracks)
				if (!t.muted)
					for (const n of t.notes) {
						const when = cycle * S.length + n.pos;
						if (when >= from && when < until)
							synth.instrument(
								ctx,
								bus,
								t,
								n,
								r.origin + (when - r.startTick) * r.sec,
								n.len * r.sec,
							);
					}
		}
		r.next = until;
	}
	function animate() {
		moveCursor(currentTick());
		if (run) run.frame = requestAnimationFrame(animate);
	}
	queue();
	run.timer = setInterval(queue, 35);
	animate();
	$("play").textContent = "Ⅱ Pause";
	$("play").setAttribute("aria-pressed", "true");
}
function stop(reset) {
	pausedTick = reset ? 0 : currentTick();
	stopRun();
	moveCursor(pausedTick);
	$("play").textContent = "▶ Play";
	$("play").setAttribute("aria-pressed", "false");
}
function restartIfPlaying() {
	if (run) begin(currentTick());
}
async function audition(n) {
	if (run || track().muted) return;
	try {
		await audio();
		synth.instrument(
			ctx,
			mix,
			track(),
			n,
			ctx.currentTime + 0.01,
			Math.min(n.len * secPerTick(), 0.6),
		);
	} catch {
		announce("Audio is unavailable in this browser.");
	}
}
$("play").onclick = async () => {
	if (starting) return;
	if (run) {
		stop(false);
		return;
	}
	starting = true;
	try {
		await audio();
		begin(pausedTick);
	} catch {
		announce("Audio is unavailable in this browser.");
	} finally {
		starting = false;
	}
};
$("stop").onclick = () => stop(true);
document.addEventListener("visibilitychange", () => {
	if (document.hidden && run) stop(false);
});

function chooseTrack(i, b) {
	active = i;
	barIndex = b;
	selected =
		S.ordered(track()).find((n) => Math.floor(n.pos / S.bar) === b) ?? null;
	render();
}
function overview() {
	$("overview").replaceChildren();
	project.tracks.forEach((t, i) => {
		const row = document.createElement("div");
		row.className = "track" + (t.muted ? " muted" : "");
		row.style.setProperty("--track", t.color);
		const part = document.createElement("button");
		part.className = "track-label";
		part.setAttribute("aria-pressed", String(i === active));
		part.innerHTML = `<i></i>${t.name}`;
		part.onclick = () => chooseTrack(i, barIndex);
		const mute = document.createElement("button");
		mute.className = "mute";
		mute.textContent = t.muted ? "Muted" : "Mute";
		mute.setAttribute("aria-label", "Mute " + t.name);
		mute.setAttribute("aria-pressed", String(t.muted));
		mute.onclick = () => {
			snapshot();
			t.muted = !t.muted;
			restartIfPlaying();
			render();
		};
		const mini = document.createElement("div");
		mini.className = "mini";
		const pitches = t.notes.map((n) => n.key),
			lo = Math.min(...pitches),
			hi = Math.max(...pitches);
		for (let b = 0; b < 4; b++) {
			const measure = document.createElement("button");
			measure.className = "measure";
			measure.setAttribute("aria-label", t.name + ", bar " + (b + 1));
			measure.setAttribute(
				"aria-pressed",
				String(i === active && b === barIndex),
			);
			measure.onclick = () => chooseTrack(i, b);
			for (const n of t.notes) {
				const from = Math.max(n.pos, b * S.bar),
					to = Math.min(n.pos + n.len, (b + 1) * S.bar);
				if (to <= from) continue;
				const mark = document.createElement("i");
				mark.style.left = ((from - b * S.bar) / S.bar) * 100 + "%";
				mark.style.width = ((to - from) / S.bar) * 100 + "%";
				mark.style.top =
					10 + (70 * (hi - n.key)) / Math.max(1, hi - lo) + "%";
				measure.append(mark);
			}
			mini.append(measure);
		}
		const cursor = document.createElement("i");
		cursor.className = "cursor";
		mini.append(cursor);
		row.append(part, mute, mini);
		$("overview").append(row);
	});
}
function pitchRows(notes) {
	const all = notes.length ? notes.map((n) => n.key) : [60, 67];
	const lo = Math.max(0, Math.min(...all) - 2),
		hi = Math.min(127, Math.max(...all) + 2);
	// Fold the keyboard to natural keys and any accidentals used in this bar.
	const used = new Set(all),
		naturals = [0, 2, 4, 5, 7, 9, 11];
	return sequence(hi - lo + 1, (i) => hi - i).filter(
		(k) => naturals.includes(k % 12) || used.has(k),
	);
}
function editor() {
	const t = track();
	$("voice").textContent = t.voice + " · D Dorian";
	$("part-title").textContent = t.name;
	document.querySelector(".editor").style.setProperty("--track", t.color);
	document.querySelector(".bars").innerHTML = sequence(
		4,
		(i) =>
			`<button aria-label="Edit bar ${i + 1}" aria-pressed="${i === barIndex}">Bar ${i + 1}</button>`,
	).join("");
	document
		.querySelectorAll(".bars button")
		.forEach((btn, i) => (btn.onclick = () => chooseTrack(active, i)));
	const start = barIndex * S.bar;
	const notes = t.notes.filter(
		(n) => n.pos < start + S.bar && n.pos + n.len > start,
	);
	keys = pitchRows(notes);
	$("beat-head").innerHTML = sequence(
		4,
		(i) => `<span>${barIndex + 1}.${i + 1}</span>`,
	).join("");
	$("keys").innerHTML = keys
		.map(
			(k) =>
				`<span class="${S.pitchName(k).includes("♯") ? "black" : ""}">${S.pitchName(k)}</span>`,
		)
		.join("");
	const roll = $("roll");
	roll.replaceChildren();
	for (const n of notes) {
		const btn = document.createElement("button"),
			from = Math.max(n.pos, start),
			to = Math.min(n.pos + n.len, start + S.bar);
		btn.className = "note";
		btn.style.left = ((from - start) / S.bar) * 100 + "%";
		btn.style.width = `calc(${((to - from) / S.bar) * 100}% - 2px)`;
		btn.style.top = `calc(var(--row) * ${keys.indexOf(n.key)} + 2px)`;
		btn.setAttribute(
			"aria-label",
			`${S.pitchName(n.key)}, bar ${Math.floor(n.pos / S.bar) + 1}, step ${(n.pos % S.bar) / S.step + 1}`,
		);
		btn.setAttribute("aria-pressed", String(n === selected));
		btn.title = btn.getAttribute("aria-label");
		btn.onclick = (event) => {
			event.stopPropagation();
			selected = n;
			editor();
			audition(n);
			const focus = roll.querySelector('[aria-pressed="true"]');
			if (focus) focus.focus({ preventScroll: true });
		};
		roll.append(btn);
	}
	const cursor = document.createElement("i");
	cursor.id = "roll-cursor";
	cursor.className = "roll-cursor";
	roll.append(cursor);
	const enabled = Boolean(selected);
	$("selection").textContent = enabled
		? S.pitchName(selected.key)
		: "No note selected";
	[...$("fields").querySelectorAll("input,select"), $("remove")].forEach(
		(el) => (el.disabled = !enabled),
	);
	$("pitch").innerHTML = options(
		sequence(128, (i) => [i, S.pitchName(i)]),
		selected?.key,
	);
	$("start").innerHTML = options(
		sequence(16, (i) => [i, i + 1]),
		selected ? Math.floor((selected.pos % S.bar) / S.step) : 0,
	);
	const available = selected
		? Math.floor((S.length - selected.pos) / S.step)
		: 16;
	$("duration").innerHTML = options(
		sequence(available, (i) => [i + 1, i + 1 + " / 16"]),
		(selected?.len ?? S.step) / S.step,
	);
	$("velocity").value = selected?.vol ?? "";
	$("undo").disabled = !undoStack.length;
	moveCursor(currentTick());
}
function render() {
	$("tempo").value = project.bpm;
	overview();
	editor();
}
function add(pos, key) {
	const existing = track().notes.find((n) => n.pos === pos && n.key === key);
	if (existing) {
		selected = existing;
		editor();
		audition(existing);
		return;
	}
	snapshot();
	selected = {
		pos,
		len: Math.min(2 * S.step, S.length - pos),
		key,
		vol: 78,
		pan: 0,
	};
	track().notes.push(selected);
	restartIfPlaying();
	render();
	audition(selected);
	announce("Added " + S.pitchName(key) + ".");
}
$("roll").onclick = (event) => {
	const bounds = $("roll").getBoundingClientRect();
	const s = Math.min(
		15,
		Math.max(
			0,
			Math.floor(((event.clientX - bounds.left) / bounds.width) * 16),
		),
	);
	const key =
		keys[
			Math.min(
				keys.length - 1,
				Math.floor(
					((event.clientY - bounds.top) / bounds.height) *
						keys.length,
				),
			)
		];
	add(barIndex * S.bar + s * S.step, key);
};
$("add").onclick = () => {
	const key = selected?.key ?? keys[Math.floor(keys.length / 2)];
	const pos = sequence(16, (i) => barIndex * S.bar + i * S.step).find(
		(p) =>
			!track().notes.some(
				(n) => n.key === key && p >= n.pos && p < n.pos + n.len,
			),
	);
	if (pos === undefined) {
		announce(
			"This pitch fills the bar. Choose a different pitch in the grid.",
		);
		return;
	}
	add(pos, key);
};
$("remove").onclick = () => {
	if (!selected) return;
	snapshot();
	track().notes = track().notes.filter((n) => n !== selected);
	selected = null;
	restartIfPlaying();
	render();
	announce("Removed note.");
};
function updateNote(id, apply) {
	$(id).onchange = () => {
		if (!selected) return;
		const input = $(id);
		if (!input.checkValidity() || input.value === "") {
			editor();
			return;
		}
		snapshot();
		apply(Number(input.value));
		S.validate(project);
		restartIfPlaying();
		render();
		audition(selected);
		announce("Updated " + S.pitchName(selected.key) + ".");
	};
}
updateNote("pitch", (value) => (selected.key = value));
updateNote("start", (value) => {
	selected.pos = Math.floor(selected.pos / S.bar) * S.bar + value * S.step;
	selected.len = Math.min(selected.len, S.length - selected.pos);
});
updateNote("duration", (value) => (selected.len = value * S.step));
updateNote("velocity", (value) => (selected.vol = value));
$("tempo").onchange = () => {
	const input = $("tempo");
	if (!input.checkValidity() || input.value === "") {
		input.value = project.bpm;
		return;
	}
	snapshot();
	const tick = currentTick();
	project.bpm = Number(input.value);
	if (run) begin(tick);
	render();
};
$("undo").onclick = () => {
	if (!undoStack.length) return;
	const s = JSON.parse(undoStack.pop());
	project.tracks = s.tracks;
	project.bpm = s.bpm;
	active = s.active;
	barIndex = s.barIndex;
	selected = track().notes[s.selectedIndex] ?? null;
	restartIfPlaying();
	render();
	announce("Undid the last change.");
};
function download(data, type, name) {
	const url = URL.createObjectURL(new Blob([data], { type })),
		a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 1500);
	announce("Exported " + name + ".");
}
$("mmp").onclick = () =>
	download(S.mmp(project), "application/xml", "low-tide-relay.mmp");
$("commands").onclick = () =>
	download(
		S.requests(project)
			.map((r) => JSON.stringify(r))
			.join("\n") + "\n",
		"application/x-ndjson",
		"low-tide-relay.jsonl",
	);
$("render").onclick = async () => {
	const button = $("render");
	button.disabled = true;
	button.textContent = "Rendering…";
	try {
		download(
			synth.wave(await synth.render(project)),
			"audio/wav",
			"low-tide-relay.wav",
		);
	} catch {
		announce("This browser could not render the audio.");
	} finally {
		button.disabled = false;
		button.textContent = "Render WAV";
	}
};
render();
