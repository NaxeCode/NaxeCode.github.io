import { FLUME_LENGTH } from './lib/solver.mjs';

const half = FLUME_LENGTH / 2;
const heat = [[22, 62, 91], [30, 114, 132], [88, 182, 170], [240, 218, 139]];

export function velocityMap(frames) {
  const canvas = document.createElement('canvas');
  canvas.width = frames[0].h.length;
  canvas.height = frames.length;
  const ctx = canvas.getContext('2d');
  const pixels = ctx.createImageData(canvas.width, canvas.height);
  let peak = 0;
  for (const { h, q } of frames) {
    for (let i = 0; i < h.length; i++) peak = Math.max(peak, q[i] / h[i]);
  }
  // A nonzero scale also makes the uniform still-water control legible.
  const scale = Math.max(0.5, Math.ceil(peak * 10) / 10);
  for (let row = 0; row < frames.length; row++) {
    const { h, q } = frames[frames.length - 1 - row];
    for (let i = 0; i < h.length; i++) {
      const z = Math.min(1, Math.max(0, q[i] / h[i] / scale)) * (heat.length - 1);
      const low = Math.min(heat.length - 2, Math.floor(z));
      const frac = z - low;
      const offset = 4 * (row * h.length + i);
      for (let c = 0; c < 3; c++) pixels.data[offset + c] = heat[low][c] * (1 - frac) + heat[low + 1][c] * frac;
      pixels.data[offset + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  return { canvas, scale };
}

function layout(canvas) {
  const { width, height } = canvas.getBoundingClientRect();
  const left = width > 550 ? 50 : 42, right = width - (width > 550 ? 28 : 17);
  return { width, height, left, right, top: 23, bottom: height - 39 };
}

function context(canvas) {
  const box = layout(canvas);
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round(box.width * ratio), h = Math.round(box.height * ratio);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(w / box.width, 0, 0, h / box.height, 0, 0);
  ctx.clearRect(0, 0, box.width, box.height);
  ctx.font = '11px "Avenir Next", "Segoe UI", sans-serif';
  const X = pos => box.left + (pos + half) / FLUME_LENGTH * (box.right - box.left);
  return { ctx, box, X };
}

function line(ctx, x0, y0, x1, y1, color, width = 1, dash = []) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.setLineDash(dash);
  ctx.stroke();
  ctx.setLineDash([]);
}

function axes(ctx, box, X, Y, ticks, unit, step = 30) {
  const { left, right, top, bottom } = box;
  ctx.fillStyle = '#c1d7dd';
  ctx.textAlign = 'left';
  ctx.fillText(unit, left, top - 7);
  for (const num of ticks) {
    const y = Y(num);
    line(ctx, left, y, right, y, 'rgba(174,218,221,.18)');
    ctx.textAlign = 'right';
    ctx.fillText(String(Number(num.toFixed(1))), left - 7, y + 4);
  }
  for (let pos = -half; pos <= half; pos += step) {
    const x = X(pos);
    line(ctx, x, top, x, bottom, pos === 0 ? 'rgba(230,245,244,.42)' : 'rgba(174,218,221,.14)', 1, pos === 0 ? [3, 4] : []);
    ctx.textAlign = 'center';
    ctx.fillText(String(pos), x, bottom + 15);
  }
  ctx.fillText('Distance from gate (m)', (left + right) / 2, bottom + 32);
}

export function gaugeIndex(x, dx, cells) {
  return Math.min(cells - 1, Math.max(0, Math.floor((x + half) / dx)));
}

export function profilePlot(canvas, exp, frame, position, overlay) {
  const { ctx, box, X } = context(canvas);
  const { left, right, top, bottom } = box;
  const { dx, options, reference } = exp;
  const { h, t } = frame;
  const max = Math.ceil(options.leftDepth / 0.5) * 0.5 + 0.5;
  const Y = depth => bottom - depth / max * (bottom - top);
  const path = new Path2D();
  path.moveTo(left, Y(h[0]));
  for (let i = 0; i < h.length; i++) {
    path.lineTo(X(-half + i * dx), Y(h[i]));
    path.lineTo(X(-half + (i + 1) * dx), Y(h[i]));
  }
  const fill = new Path2D(path);
  fill.lineTo(right, bottom);
  fill.lineTo(left, bottom);
  fill.closePath();
  const water = ctx.createLinearGradient(0, Y(options.leftDepth), 0, bottom);
  water.addColorStop(0, '#43b5b8');
  water.addColorStop(0.62, '#1c8294');
  water.addColorStop(1, '#13576e');
  ctx.fillStyle = water;
  ctx.fill(fill);
  const ticks = [];
  for (let n = 0; n <= max; n += max > 2 ? 1 : 0.5) ticks.push(n);
  axes(ctx, box, X, Y, ticks, 'Depth (m)');
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#8ceadc';
  ctx.stroke(path);
  if (overlay) {
    const refPath = new Path2D();
    if (t > 0) {
      refPath.moveTo(left, Y(options.leftDepth));
      for (let i = 0; i <= 64; i++) {
        const pos = t * (reference.head + i / 64 * (reference.tail - reference.head));
        const [depth] = reference.sample(pos, t);
        refPath.lineTo(X(pos), Y(depth));
      }
      refPath.lineTo(X(t * reference.shock), Y(reference.middleDepth));
    } else {
      refPath.moveTo(left, Y(options.leftDepth));
      refPath.lineTo(X(0), Y(options.leftDepth));
    }
    refPath.lineTo(X(t * reference.shock), Y(options.rightDepth));
    refPath.lineTo(right, Y(options.rightDepth));
    ctx.strokeStyle = '#ffcb86';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([6, 5]);
    ctx.stroke(refPath);
    ctx.setLineDash([]);
    if (options.leftDepth > options.rightDepth && t >= 1.5 && box.width > 500) {
      const fanX = X((reference.head + reference.tail) * t / 2);
      const shockX = X(reference.shock * t);
      ctx.fillStyle = '#ffe3bd';
      ctx.textAlign = 'right';
      ctx.fillText('Rarefaction', fanX - 5, top + 12);
      ctx.textAlign = 'left';
      ctx.fillText('Shock', shockX + 5, top + 12);
      line(ctx, fanX, top + 10, fanX, Y(reference.sample((reference.head + reference.tail) * t / 2, t)[0]) - 4, '#d9b887', 1, [2, 4]);
      line(ctx, shockX, top + 10, shockX, Y(reference.middleDepth) - 4, '#d9b887', 1, [2, 4]);
    }
  }
  const index = gaugeIndex(position, dx, h.length);
  line(ctx, X(position), top, X(position), bottom, '#b8ddd6', 1, [1, 5]);
  ctx.beginPath();
  ctx.arc(X(position), Y(h[index]), 4, 0, Math.PI * 2);
  ctx.fillStyle = '#0c3448';
  ctx.fill();
  ctx.strokeStyle = '#e6fffb';
  ctx.lineWidth = 1.7;
  ctx.stroke();
}

export function historyPlot(canvas, exp, map, frame, position) {
  const { ctx, box, X } = context(canvas);
  const { left, right, top, bottom } = box;
  const end = exp.frames.at(-1).t;
  const Y = t => bottom - (bottom - top) * t / end;
  ctx.imageSmoothingEnabled = false;
  const rowHeight = (bottom - top) / (exp.frames.length - 1);
  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, right - left, bottom - top);
  ctx.clip();
  ctx.drawImage(map.canvas, left, top - rowHeight / 2, right - left, bottom - top + rowHeight);
  ctx.restore();
  const middle = Math.round(end / 2);
  axes(ctx, box, X, Y, [0, middle, end], 'Time (s)');
  line(ctx, left, Y(frame.t), right, Y(frame.t), '#effefa', 1, [7, 4]);
  line(ctx, X(position), top, X(position), bottom, '#c7eae5', 1, [2, 4]);
  ctx.beginPath();
  ctx.arc(X(position), Y(frame.t), 4, 0, Math.PI * 2);
  ctx.fillStyle = '#f1fffa';
  ctx.fill();
}

export function plotCoordinates(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const { left, right, top, bottom } = layout(canvas);
  const x = (event.clientX - rect.left - left) / (right - left);
  const y = (bottom - (event.clientY - rect.top)) / (bottom - top);
  if (x < 0 || x > 1 || y < 0 || y > 1) return null;
  return { position: x * FLUME_LENGTH - half, timeFraction: y };
}
