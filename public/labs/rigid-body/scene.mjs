import { basis, cross, dot, parts, rotate, unit } from './physics.mjs';

const scale = (p, k) => p.map(x => x * k);
const subtract = (a, b) => a.map((x, i) => x - b[i]);
const pigment = [[72, 113, 166], [72, 113, 166], [81, 129, 181]];
export const witnessRadius = 0.104;
export const defaultCamera = () => ({ yaw: 0.48, pitch: 0.26 });

// A pinhole camera. Distances, stock, datum and marker are all in meters.
function cameraFrame(view, width, height) {
  const eye = scale([Math.sin(view.yaw) * Math.cos(view.pitch), Math.sin(view.pitch),
    Math.cos(view.yaw) * Math.cos(view.pitch)], 0.54);
  const forward = unit(scale(eye, -1));
  const right = unit(cross(forward, [0, 1, 0]));
  const up = cross(right, forward);
  const focal = Math.min(width * 2.02, height * 1.72);
  return { eye, project(p) {
    const ray = subtract(p, eye);
    const depth = dot(ray, forward);
    return [width / 2 + focal * dot(ray, right) / depth, height * 0.52 - focal * dot(ray, up) / depth];
  } };
}

function line(ctx, points, color, width = 1) {
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    if (i === 0) ctx.moveTo(...points[i]);
    else ctx.lineTo(...points[i]);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function polygon(ctx, points, color, border) {
  ctx.beginPath();
  points.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawFloor(ctx, project) {
  const floor = -0.118;
  // Finite turntable graduations give the orbit a stationary depth cue.
  for (const radius of [0.05, 0.10, 0.15]) {
    const points = Array.from({ length: 121 }, (_, i) => {
      const a = i * Math.PI / 60;
      return project([radius * Math.cos(a), floor, radius * Math.sin(a)]);
    });
    line(ctx, points, '#ccd4d7');
  }
  for (let i = 0; i < 72; i++) {
    const a = i * Math.PI / 36;
    const major = i % 6 === 0;
    const tick = r => project([r * Math.cos(a), floor, r * Math.sin(a)]);
    line(ctx, [tick(0.15), tick(major ? 0.141 : 0.146)], major ? '#98a9b1' : '#bcc8cd');
  }
}

function drawStock(ctx, state, eye, project) {
  const q = state.slice(3);
  const eyeBody = rotate([q[0], -q[1], -q[2], -q[3]], eye);
  const toPixel = p => project(rotate(q, p));
  // The three solids occupy disjoint y slabs. Draw the farthest slab on
  // each side of the eye first; a slab containing the eye's y is last.
  const slabs = parts.map((part, index) => ({
    ...part, index, distance: Math.max(0, Math.abs(eyeBody[1] - part.centerY) - part.size[1] / 2),
  })).sort((a, b) => b.distance - a.distance);
  const light = unit([-0.38, 0.78, 0.64]);
  for (const { size, centerY, index } of slabs) {
    const h = size.map(x => x / 2);
    const center = [0, centerY, 0];
    for (let face = 0; face < 3; face++) {
      const side = Math.sign(eyeBody[face] - center[face]);
      if (Math.abs(eyeBody[face] - center[face]) <= h[face]) continue;
      const u = (face + 1) % 3, v = (face + 2) % 3;
      const corner = (a, b) => {
        const p = [...center];
        p[face] += side * h[face]; p[u] += a * h[u]; p[v] += b * h[v];
        return toPixel(p);
      };
      const patch = (a, b, c, d, color, border) =>
        polygon(ctx, [corner(a, b), corner(c, b), corner(c, d), corner(a, d)], color, border);
      const normal = rotate(q, scale(basis[face], side));
      const shade = 0.73 + 0.36 * Math.max(0, dot(normal, light));
      const paint = rgb => 'rgb(' + rgb.map(k => Math.min(255, Math.round(k * shade))).join(',') + ')';
      patch(-1, -1, 1, 1, paint(pigment[index]), '#344963');
      // Painted inspection marks sit exactly in the visible surface plane.
      if (index === 2) {
        if (face === 0) {
          patch(-0.96, -0.96, 0.96, 0.96, paint(side > 0 ? [250, 188, 73] : [42, 64, 93]));
        } else {
          const stripe = (start, end, color) => face === 2
            ? patch(start, -0.98, end, 0.98, paint(color))
            : patch(-0.98, start, 0.98, end, paint(color));
          stripe(0.71, 1, [247, 185, 77]);
          stripe(0.58, 0.62, [230, 234, 221]);
          stripe(-0.98, -0.89, [48, 72, 101]);
        }
      }
      if (index === 1 && face === 2) {
        patch(-0.16, -0.83, 0.16, 0.82, paint([41, 75, 111]));
      }
      if (index === 0 && face === 2) {
        patch(-0.83, -0.20, 0.83, 0.20, paint([186, 206, 215]));
      }
    }
  }
}

export function drawScene(ctx, width, height, model, view) {
  ctx.clearRect(0, 0, width, height);
  const { eye, project } = cameraFrame(view, width, height);
  drawFloor(ctx, project);
  const L = model.direction;
  const base = project(scale(L, -0.112));
  const tip = project(scale(L, 0.123));
  ctx.setLineDash([5, 5]);
  line(ctx, [base, tip], '#47706e', 1.5);
  ctx.setLineDash([]);
  const dir = unit(subtract(tip, base));
  const perp = [-dir[1], dir[0]];
  const wing = s => tip.map((x, i) => x - 10 * dir[i] + s * 4 * perp[i]);
  polygon(ctx, [tip, wing(1), wing(-1)], '#407572');
  if (model.trail.length > 1) {
    ctx.lineCap = 'round';
    for (let i = 1; i < model.trail.length; i++) {
      line(ctx, [project(model.trail[i-1]), project(model.trail[i])],
        'rgba(181, 86, 24,' + (0.1 + 0.65 * i / model.trail.length) + ')', 2);
    }
    ctx.lineCap = 'butt';
  }
  drawStock(ctx, model.state, eye, project);
  const origin = project([0, 0, 0]);
  const marker = project(scale(rotate(model.state.slice(3), basis[model.axis]), witnessRadius));
  line(ctx, [origin, marker], 'rgba(165,75,18,0.68)', 1.6);
  ctx.fillStyle = '#bc571e'; ctx.strokeStyle = '#fff9e9'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(...marker, 5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
}
