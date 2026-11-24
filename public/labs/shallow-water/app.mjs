import { FRAME_SECONDS, runExperiment, meanDepthError } from './lib/experiment.mjs';
import { gaugeIndex, historyPlot, plotCoordinates, profilePlot, velocityMap } from './plots.mjs';

const byId = id => document.getElementById(id);
const release = byId('release'), upstream = byId('upstream'), downstream = byId('downstream');
const mesh = byId('mesh'), overlay = byId('overlay'), position = byId('position'), time = byId('time');
const play = byId('play'), step = byId('step'), restart = byId('restart');
const profile = byId('profile'), history = byId('history'), status = byId('status');
const presets = { standard: [2.4, 0.6], gentle: [1.6, 1.2], still: [1.5, 1.5] };
let exp, map, playing = false, frameId = 0, startMs = 0, startFrame = 0;

function render() {
  const f = exp.frames[Number(time.value)];
  const x = Number(position.value);
  const probe = gaugeIndex(x, exp.dx, f.h.length);
  byId('timeLabel').textContent = f.t.toFixed(1) + ' s';
  time.setAttribute('aria-valuetext', f.t.toFixed(1) + ' seconds');
  position.setAttribute('aria-valuetext', x.toFixed(1) + ' metres from gate');
  byId('positionLabel').textContent = (x > 0 ? '+' : '') + x.toFixed(1) + ' m';
  byId('gDepth').textContent = f.h[probe].toFixed(3) + ' m';
  byId('gSpeed').textContent = (f.q[probe] / f.h[probe]).toFixed(3) + ' m/s';
  const error = meanDepthError(f.h, exp.dx, f.t, exp.reference);
  byId('depthError').textContent = (1000 * error).toFixed(2) + ' mm';
  const drift = Math.abs(f.volumeDifference);
  byId('volumeDrift').textContent = (drift ? drift.toExponential(1) : '0') + ' m²';
  step.disabled = Number(time.value) === exp.frames.length - 1;
  document.querySelector('.legend').lastChild.textContent = overlay.checked ? ' Exact' : ' Exact off';
  profilePlot(profile, exp, f, x, overlay.checked);
  historyPlot(history, exp, map, f, x);
}

function setPlaying(value) {
  playing = value;
  cancelAnimationFrame(frameId);
  const label = value ? 'Pause' : 'Play';
  play.setAttribute('aria-label', label);
  play.querySelector('span').textContent = label;
  play.querySelector('b').classList.toggle('pausing', value);
  if (value) {
    if (Number(time.value) === exp.frames.length - 1) time.value = 0;
    startMs = performance.now();
    startFrame = Number(time.value);
    render();
    frameId = requestAnimationFrame(tick);
  }
}

function tick(now) {
  if (!playing) return;
  const next = Math.min(exp.frames.length - 1, startFrame + Math.floor((now - startMs) / (1000 * FRAME_SECONDS)));
  if (next !== Number(time.value)) {
    time.value = next;
    render();
  }
  if (next === exp.frames.length - 1) {
    setPlaying(false);
    status.textContent = 'Run complete, before the first wave reaches a wall.';
  } else frameId = requestAnimationFrame(tick);
}

function depthLabels() {
  for (const [input, label] of [[upstream, 'upLabel'], [downstream, 'downLabel']]) {
    byId(label).textContent = Number(input.value).toFixed(1) + ' m';
    input.setAttribute('aria-valuetext', Number(input.value).toFixed(1) + ' metres');
  }
}

function build() {
  setPlaying(false);
  depthLabels();
  exp = runExperiment({ cells: Number(mesh.value), leftDepth: Number(upstream.value), rightDepth: Number(downstream.value) });
  map = velocityMap(exp.frames);
  byId('keyMax').textContent = map.scale.toFixed(1) + ' m/s';
  time.max = exp.frames.length - 1;
  render();
}

release.addEventListener('change', () => {
  [upstream.value, downstream.value] = presets[release.value];
  build();
  status.textContent = 'Initial condition changed to ' + release.selectedOptions[0].textContent + '. Playback paused.';
});
for (const input of [upstream, downstream]) {
  input.addEventListener('input', depthLabels);
  input.addEventListener('change', () => {
    release.value = Object.keys(presets).find(k =>
      presets[k][0] === Number(upstream.value) && presets[k][1] === Number(downstream.value)) ?? 'custom';
    build();
    status.textContent = 'Release recomputed. Playback paused.';
  });
}
mesh.addEventListener('change', () => {
  build();
  status.textContent = 'Grid recomputed with ' + mesh.value + ' cells.';
});
overlay.addEventListener('change', render);
position.addEventListener('input', render);
time.addEventListener('input', () => { setPlaying(false); render(); });
play.addEventListener('click', () => {
  setPlaying(!playing);
  status.textContent = playing ? 'Playing.' : 'Paused.';
});
step.addEventListener('click', () => {
  setPlaying(false);
  time.stepUp();
  render();
  status.textContent = 'Stepped to ' + byId('timeLabel').textContent;
});
restart.addEventListener('click', () => {
  setPlaying(false);
  time.value = 0;
  render();
  status.textContent = 'Gate reset to release time.';
});
for (const canvas of [profile, history]) {
  canvas.addEventListener('click', event => {
    const p = plotCoordinates(canvas, event);
    if (!p) return;
    position.value = Math.round(p.position * 2) / 2;
    if (canvas === history) {
      setPlaying(false);
      time.value = Math.round(p.timeFraction * (exp.frames.length - 1));
    }
    render();
  });
}
document.addEventListener('visibilitychange', () => { if (document.hidden) setPlaying(false); });
build();
new ResizeObserver(render).observe(profile);
