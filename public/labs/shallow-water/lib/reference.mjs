// Infinite-channel analytical wet-bed release from rest. No time marching or
// numerical fluxes. The caller supplies g in m/s² and the gate is at x = 0.
export function wetBedReference(left, right, g) {
  if (![left, right, g].every(Number.isFinite) || !(left >= right && right > 0 && g > 0)) {
    throw new RangeError('The reference requires a level bed, positive depths and a higher or equal left state.');
  }
  const cLeft = Math.sqrt(g * left);
  const leftVelocity = h => 2 * (cLeft - Math.sqrt(g * h));
  const shockFactor = h => Math.sqrt(0.5 * g * (1 / right + 1 / h));
  let low = right, high = left;
  // Match the rarefaction invariant to the shock jump relation.
  for (let i = 0; i < 64; i++) {
    const h = (low + high) / 2;
    if (leftVelocity(h) > (h - right) * shockFactor(h)) low = h;
    else high = h;
  }
  const middleDepth = (low + high) / 2;
  const velocity = leftVelocity(middleDepth);
  const head = -cLeft;
  const tail = velocity - Math.sqrt(g * middleDepth);
  const shock = middleDepth * shockFactor(middleDepth);

  function sample(x, t) {
    if (t === 0) return [x < 0 ? left : right, 0];
    const xi = x / t;
    if (xi < head) return [left, 0];
    if (xi < tail) {
      const c = (2 * cLeft - xi) / 3;
      const h = c * c / g;
      return [h, h * (2 / 3) * (cLeft + xi)];
    }
    if (xi < shock) return [middleDepth, middleDepth * velocity];
    return [right, 0];
  }

  function meanDepth(x0, x1, t) {
    if (!(x1 > x0 && t >= 0)) throw new RangeError('Invalid reference cell or time.');
    if (t === 0) {
      const upstreamLength = Math.max(0, Math.min(x1, 0) - x0);
      return right + (left - right) * upstreamLength / (x1 - x0);
    }
    // Integrate the constant regions and the quadratic fan separately.
    const extent = (a, b) => Math.max(0, Math.min(x1, b) - Math.max(x0, a));
    let area = left * extent(-Infinity, head * t)
      + middleDepth * extent(tail * t, shock * t) + right * extent(shock * t, Infinity);
    const a = Math.max(x0, head * t), b = Math.min(x1, tail * t);
    if (b > a) {
      const ca = (2 * cLeft - a / t) / 3, cb = (2 * cLeft - b / t) / 3;
      area += (b - a) * (ca * ca + ca * cb + cb * cb) / (3 * g);
    }
    return area / (x1 - x0);
  }
  return { head, tail, shock, middleDepth, velocity, sample, meanDepth };
}
