// SI units. Axes are fixed to the body. The finished rotor is mirror-symmetric
// in x and z, which makes its inertia tensor diagonal about the center of mass.
export const DENSITY = 2700;
const stock = [
  { name: 'Foot', size: [0.050, 0.018, 0.022] },
  { name: 'Spine', size: [0.024, 0.065, 0.018] },
  { name: 'Head', size: [0.180, 0.026, 0.022] },
];
let bottom = 0;
export const parts = stock.map(part => {
  const [x, y, z] = part.size;
  const centerY = bottom + y / 2;
  bottom += y;
  return { ...part, centerY, mass: DENSITY * x * y * z };
});
export const mass = parts.reduce((sum, part) => sum + part.mass, 0);
export const centerOfMassY = parts.reduce((sum, part) => sum + part.mass * part.centerY, 0) / mass;
for (const part of parts) part.centerY -= centerOfMassY;
export const inertia = [0, 1, 2].map(axis => parts.reduce((total, { size, centerY, mass }) => {
  const transverse = size[(axis + 1) % 3] ** 2 + size[(axis + 2) % 3] ** 2;
  const offset = axis === 1 ? 0 : centerY ** 2;
  return total + mass * (transverse / 12 + offset);
}, 0));

export const basis = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
export const STEP = 1 / 240;
export const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
export const unit = a => a.map(v => v / Math.hypot(...a));
export const cross = ([a, b, c], [d, e, f]) => [b * f - c * e, c * d - a * f, a * e - b * d];

export function rotate([s, x, y, z], v) {
  const u = [x, y, z];
  const first = cross(u, v);
  const second = cross(u, first);
  return v.map((a, i) => a + 2 * (s * first[i] + second[i]));
}

// State = [angular velocity in body coordinates, unit quaternion (w,x,y,z)].
// Orient each chosen positive axis vertically in the initial world frame.
export function launch(axis, spin, nudgeFraction) {
  const w = [0, 0, 0];
  w[axis] = spin;
  w[(axis + 1) % 3] = spin * nudgeFraction;
  const h = Math.SQRT1_2;
  const orientations = [[h, 0, 0, h], [1, 0, 0, 0], [h, -h, 0, 0]];
  return [...w, ...orientations[axis]];
}

function derivative([a, b, c, s, x, y, z], [i, j, k]) {
  return [
    (j - k) * b * c / i, (k - i) * c * a / j, (i - j) * a * b / k,
    -(x * a + y * b + z * c) / 2,
    (s * a + y * c - z * b) / 2,
    (s * b + z * a - x * c) / 2,
    (s * c + x * b - y * a) / 2,
  ];
}

const offset = (state, slope, h) => state.map((v, i) => v + slope[i] * h);
export function advance(state, dt = STEP, moments = inertia) {
  const a = derivative(state, moments);
  const b = derivative(offset(state, a, dt / 2), moments);
  const c = derivative(offset(state, b, dt / 2), moments);
  const d = derivative(offset(state, c, dt), moments);
  const next = state.map((v, i) => v + dt * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
  return [...next.slice(0, 3), ...unit(next.slice(3))];
}

export function diagnostics(state, moments = inertia) {
  const w = state.slice(0, 3);
  const bodyMomentum = w.map((v, i) => moments[i] * v);
  return { energy: dot(w, bodyMomentum) / 2, momentum: rotate(state.slice(3), bodyMomentum) };
}

export function drift(sample, initial) {
  return {
    energy: Math.abs(sample.energy - initial.energy) / initial.energy,
    momentum: Math.hypot(...sample.momentum.map((v, i) => v - initial.momentum[i])) / Math.hypot(...initial.momentum),
  };
}

export function alignment(state, axis, initialDirection) {
  return Math.max(-1, Math.min(1, dot(rotate(state.slice(3), basis[axis]), initialDirection)));
}
