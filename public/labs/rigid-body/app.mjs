import { advance, alignment, basis, diagnostics, drift, launch, rotate, STEP, unit } from './physics.mjs';
import { defaultCamera, drawScene, witnessRadius } from './scene.mjs';

const get = id => document.getElementById(id);
const scene = get('scene'), chart = get('chart');
const sceneCtx = scene.getContext('2d'), chartCtx = chart.getContext('2d');
const spin = get('spin'), nudge = get('nudge');
const sampleStride = 8;
const chartWindow = 8;
let axis = 1, models, samples, ticks = 0, running = false, carry = 0, last = null;
let camera = defaultCamera(), drag = null, frame = 0;

function updateLaunchLabels() {
  get('spin-value').textContent = spin.value + ' rad/s';
  get('nudge-value').textContent = nudge.value + '%';
  spin.setAttribute('aria-valuetext', spin.value + ' radians per second');
  nudge.setAttribute('aria-valuetext', nudge.value + ' percent of spin');
}

function newModel(index) {
  const state = launch(index, Number(spin.value), Number(nudge.value) / 100);
  const initial = diagnostics(state);
  return { axis: index, state, initial, direction: unit(initial.momentum),
    peakEnergy: 0, peakMomentum: 0, trail: [] };
}

function sample() {
  samples.push({ time: ticks * STEP, values: models.map(m => alignment(m.state, m.axis, m.direction)) });
  if (samples.length > chartWindow / (STEP * sampleStride) + 1) samples.shift();
  for (const m of models) {
    const marker = rotate(m.state.slice(3), basis[m.axis]).map(x => x * witnessRadius);
    m.trail.push(marker);
    if (m.trail.length > 1.5 / (STEP * sampleStride) + 1) m.trail.shift();
  }
}

function reset() {
  ticks = 0; last = null; carry = 0; running = false;
  samples = []; models = [0, 1, 2].map(newModel);
  sample();
  setTransport();
  render();
}

function step() {
  ticks++;
  for (const m of models) {
    m.state = advance(m.state);
    const change = drift(diagnostics(m.state), m.initial);
    m.peakEnergy = Math.max(m.peakEnergy, change.energy);
    m.peakMomentum = Math.max(m.peakMomentum, change.momentum);
  }
  if (ticks % sampleStride === 0) sample();
}

function setTransport() {
  get('play-label').textContent = running ? 'Pause' : ticks ? 'Resume' : 'Release rotor';
  get('play').classList.toggle('playing', running);
  get('state').textContent = running ? 'Running' : ticks ? 'Paused' : 'Ready';
}

function fit(canvas, ctx) {
  const { width, height } = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
  const w = Math.max(1, Math.round(width * pixelRatio)), h = Math.max(1, Math.round(height * pixelRatio));
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  ctx.setTransform(w / Math.max(1, width), 0, 0, h / Math.max(1, height), 0, 0);
  return [width, height];
}

function drawChart() {
  const [w, h] = fit(chart, chartCtx);
  chartCtx.clearRect(0, 0, w, h);
  const left = 23, right = w - 9, top = 8, bottom = h - 20;
  const now = ticks * STEP, start = Math.max(0, now - chartWindow);
  const xp = t => left + (t - start) / chartWindow * (right - left);
  const yp = value => top + (1 - value) / 2 * (bottom - top);
  chartCtx.font = '11px ui-monospace, monospace';
  chartCtx.fillStyle = '#53636c'; chartCtx.textAlign = 'left';
  chartCtx.lineWidth = 1;
  for (const value of [-1, 0, 1]) {
    chartCtx.fillText(value > 0 ? '+1' : String(value), 0, yp(value) + 4);
    chartCtx.strokeStyle = value === 0 ? '#a8b5b7' : '#c9d1cf';
    chartCtx.beginPath(); chartCtx.moveTo(left, yp(value)); chartCtx.lineTo(right, yp(value)); chartCtx.stroke();
  }
  for (const t of [start, start + 4, start + 8]) {
    chartCtx.textAlign = t === start ? 'left' : t === start + 8 ? 'right' : 'center';
    chartCtx.fillText(t.toFixed(1) + ' s', xp(t), h - 2);
  }
  const colors = ['#46639b', '#a84b18', '#3a7768'];
  const pattern = [[6, 4], [], [2, 4]];
  const instantaneous = models.map(m => alignment(m.state, m.axis, m.direction));
  for (const index of [0, 2, 1]) {
    chartCtx.strokeStyle = colors[index];
    chartCtx.lineWidth = index === axis ? 2.8 : 1.7;
    chartCtx.setLineDash(pattern[index]);
    chartCtx.beginPath();
    samples.forEach(({ time, values }, i) => {
      const x = Math.max(left, xp(time));
      if (i === 0) chartCtx.moveTo(x, yp(values[index]));
      else chartCtx.lineTo(x, yp(values[index]));
    });
    chartCtx.lineTo(xp(now), yp(instantaneous[index]));
    chartCtx.stroke(); chartCtx.setLineDash([]);
    chartCtx.beginPath(); chartCtx.arc(xp(now), yp(instantaneous[index]), 2.6, 0, Math.PI * 2);
    chartCtx.fillStyle = colors[index]; chartCtx.fill();
  }
}

const signed = n => (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(3);
const relative = n => n ? n.toExponential(2) : '0';
function render() {
  if (!models) return;
  const [width, height] = fit(scene, sceneCtx);
  const selected = models[axis];
  drawScene(sceneCtx, width, height, selected, camera);
  drawChart();
  get('clock').textContent = (ticks * STEP).toFixed(3) + ' s';
  get('energy').textContent = relative(selected.peakEnergy);
  get('momentum').textContent = relative(selected.peakMomentum);
  models.forEach(m => { get('value-' + m.axis).textContent = signed(alignment(m.state, m.axis, m.direction)); });
}

function animate(time) {
  frame = 0;
  if (!running) return;
  if (last !== null) carry += Math.min((time - last) / 1000, 0.1);
  last = time;
  while (carry >= STEP) { step(); carry -= STEP; }
  render();
  frame = requestAnimationFrame(animate);
}

function toggleRunning() {
  running = !running;
  last = null;
  if (frame) cancelAnimationFrame(frame);
  frame = running ? requestAnimationFrame(animate) : 0;
  setTransport();
}

get('play').addEventListener('click', toggleRunning);
get('step').addEventListener('click', () => {
  if (running) toggleRunning();
  step(); setTransport(); render();
});
get('reset').addEventListener('click', reset);
document.querySelectorAll('input[name=axis]').forEach(input => input.addEventListener('change', () => {
  axis = Number(input.value); render();
}));
for (const slider of [spin, nudge]) slider.addEventListener('input', () => {
  updateLaunchLabels();
  reset();
});

function orbit(yaw, pitch) {
  camera.yaw += yaw;
  camera.pitch = Math.max(-1.28, Math.min(1.28, camera.pitch + pitch));
  render();
}
const home = () => { camera = defaultCamera(); render(); };
get('view-reset').addEventListener('click', home);
const moves = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, 0.1], ArrowDown: [0, -0.1] };
for (const control of document.querySelectorAll('[data-orbit]')) {
  control.addEventListener('click', () => orbit(...moves[control.dataset.orbit]));
}
scene.addEventListener('keydown', event => {
  if (event.key === 'Home') home();
  else if (moves[event.key]) orbit(...moves[event.key]);
  else return;
  event.preventDefault();
});
scene.addEventListener('pointerdown', event => {
  if (drag || event.button !== 0) return;
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
  scene.setPointerCapture(event.pointerId);
});
scene.addEventListener('pointermove', event => {
  if (drag?.id !== event.pointerId) return;
  orbit((drag.x - event.clientX) * 0.009, (event.clientY - drag.y) * 0.009);
  drag.x = event.clientX; drag.y = event.clientY;
});
scene.addEventListener('lostpointercapture', () => { drag = null; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden && running) toggleRunning();
});
const sizeObserver = new ResizeObserver(render);
sizeObserver.observe(scene); sizeObserver.observe(chart);
updateLaunchLabels();
reset();
