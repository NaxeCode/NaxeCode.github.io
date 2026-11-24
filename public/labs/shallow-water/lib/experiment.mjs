import { gateRelease, GRAVITY, FLUME_LENGTH } from './solver.mjs';
import { wetBedReference } from './reference.mjs';

export const FRAME_SECONDS = 0.1;
export const STANDARD = Object.freeze({ cells: 480, leftDepth: 2.4, rightDepth: 0.6 });

export function runExperiment(options) {
  const solver = gateRelease(options);
  const reference = wetBedReference(options.leftDepth, options.rightDepth, GRAVITY);
  const initialVolume = solver.volume();
  const safeTime = 0.82 * (FLUME_LENGTH / 2) / Math.max(-reference.head, reference.shock);
  const lastFrame = Math.floor(Math.min(10, safeTime) / FRAME_SECONDS);
  const frames = [];
  for (let i = 0; i <= lastFrame; i++) {
    const t = i * FRAME_SECONDS;
    solver.advanceTo(t);
    frames.push({
      t, h: solver.h.slice(), q: solver.q.slice(), steps: solver.steps,
      volumeDifference: solver.volume() - initialVolume
    });
  }
  return { frames, reference, options, dx: solver.dx, initialVolume };
}

export function meanDepthError(h, dx, t, reference) {
  let sum = 0;
  const leftEdge = -h.length * dx / 2;
  for (let i = 0; i < h.length; i++) {
    const x0 = leftEdge + i * dx;
    sum += Math.abs(h[i] - reference.meanDepth(x0, x0 + dx, t));
  }
  return sum / h.length;
}
