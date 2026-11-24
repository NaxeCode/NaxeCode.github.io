// First-order finite volumes for h (m) and q = hu (m²/s), per metre of width.
export const GRAVITY = 9.81;
export const FLUME_LENGTH = 120;
export const CFL = 0.45;

export class Flume {
  constructor({ cells, initial, length = FLUME_LENGTH, cfl = CFL, boundary = 'wall' }) {
    if (!Number.isInteger(cells) || cells < 4 || cells > 8192) {
      throw new RangeError('Use 4 to 8192 cells.');
    }
    if (!(length > 0 && Number.isFinite(length) && cfl > 0 && cfl <= 0.5)) {
      throw new RangeError('Use a finite positive length and a CFL number in (0, 0.5].');
    }
    if (!['wall', 'periodic'].includes(boundary)) throw new RangeError('Unknown boundary condition.');
    this.cells = cells;
    this.dx = length / cells;
    this.length = length;
    this.cfl = cfl;
    this.boundary = boundary;
    this.h = new Float64Array(cells);
    this.q = new Float64Array(cells);
    this.nextH = new Float64Array(cells);
    this.nextQ = new Float64Array(cells);
    this.speed = new Float64Array(cells);
    this.pressureFlux = new Float64Array(cells);
    this.faceH = new Float64Array(cells + 1);
    this.faceQ = new Float64Array(cells + 1);
    this.time = 0;
    this.steps = 0;
    this.maxCourant = 0;
    for (let i = 0; i < cells; i++) {
      const [h, q] = initial(this.center(i), this.dx);
      if (!(h > 0 && Number.isFinite(h) && Number.isFinite(q))) {
        throw new RangeError('Initial water depth must be positive and discharge finite.');
      }
      this.h[i] = h;
      this.q[i] = q;
    }
  }

  center(i) {
    return (i + 0.5) * this.dx - this.length / 2;
  }

  // The same face flux enters adjacent cells with opposite signs.
  setFace(face, left, right) {
    const a = Math.max(this.speed[left], this.speed[right]);
    this.faceH[face] = 0.5 * (this.q[left] + this.q[right] - a * (this.h[right] - this.h[left]));
    this.faceQ[face] = 0.5 * (this.pressureFlux[left] + this.pressureFlux[right]
      - a * (this.q[right] - this.q[left]));
  }

  step(timeLimit = Infinity) {
    if (!(timeLimit > 0)) throw new RangeError('The next step must advance time.');
    const { h, q, cells } = this;
    let maxSpeed = 0;
    for (let i = 0; i < cells; i++) {
      const u = q[i] / h[i];
      this.speed[i] = Math.abs(u) + Math.sqrt(GRAVITY * h[i]);
      this.pressureFlux[i] = q[i] * u + 0.5 * GRAVITY * h[i] * h[i];
      maxSpeed = Math.max(maxSpeed, this.speed[i]);
    }
    const dt = Math.min(timeLimit, this.cfl * this.dx / maxSpeed);
    const ratio = dt / this.dx;
    for (let i = 1; i < cells; i++) this.setFace(i, i - 1, i);
    const last = cells - 1;
    if (this.boundary === 'periodic') {
      this.setFace(0, last, 0);
      this.faceH[cells] = this.faceH[0];
      this.faceQ[cells] = this.faceQ[0];
    } else {
      // Mirror discharge at each wall; the two mass fluxes vanish exactly.
      this.faceH[0] = this.faceH[cells] = 0;
      this.faceQ[0] = this.pressureFlux[0] - this.speed[0] * q[0];
      this.faceQ[cells] = this.pressureFlux[last] + this.speed[last] * q[last];
    }
    for (let i = 0; i < cells; i++) {
      this.nextH[i] = h[i] - ratio * (this.faceH[i + 1] - this.faceH[i]);
      this.nextQ[i] = q[i] - ratio * (this.faceQ[i + 1] - this.faceQ[i]);
      if (!(this.nextH[i] > 0 && Number.isFinite(this.nextH[i]) && Number.isFinite(this.nextQ[i]))) {
        throw new RangeError('The wet-bed model produced an invalid state.');
      }
    }
    [this.h, this.nextH] = [this.nextH, h];
    [this.q, this.nextQ] = [this.nextQ, q];
    this.time += dt;
    this.steps++;
    this.maxCourant = Math.max(this.maxCourant, ratio * maxSpeed);
    return dt;
  }

  advanceTo(target) {
    if (!Number.isFinite(target) || target < this.time) throw new RangeError('Invalid target time.');
    while (this.time < target) this.step(target - this.time);
  }

  volume() {
    return this.h.reduce((sum, h) => sum + h, 0) * this.dx;
  }
}

export function gateRelease({ cells, leftDepth, rightDepth }) {
  if (!Number.isInteger(cells) || cells % 2) throw new RangeError('Align the gate with an even mesh.');
  if (!(leftDepth >= rightDepth && rightDepth > 0)) throw new RangeError('Use a wet downstream bed below or level with the reservoir.');
  return new Flume({ cells, initial: x => [x < 0 ? leftDepth : rightDepth, 0] });
}
