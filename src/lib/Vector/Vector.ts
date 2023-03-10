export type Vector = [number, number, number];
export function make(x: number, y: number, z: number): Vector {
  return [x, y, z] as Vector;
}
export function magnitude(a: Vector): number {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
export function add(a: Vector, b: Vector) {
  a[0] = a[0] + b[0];
  a[1] = a[1] + b[1];
  a[2] = a[2] + b[2];
}
export function getAdd(a: Vector, b: Vector): Vector {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
export function subtract(a: Vector, b: Vector) {
  a[0] = a[0] - b[0];
  a[1] = a[1] - b[1];
  a[2] = a[2] - b[2];
}
export const sub = subtract;
export function getSubtract(a: Vector, b: Vector): Vector {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
export const getSub = getSubtract;
export function scalar(a: Vector, b: number) {
  a[0] *= b;
  a[1] *= b;
  a[2] *= b;
}
export function getScalar(a: Vector, b: number): Vector {
  return [a[0] * b, a[1] * b, a[2] * b];
}
export function multiply(a: Vector, b: Vector) {
  a[0] = a[0] * b[0];
  a[1] = a[1] * b[1];
  a[2] = a[2] * b[2];
}
export function getMultiply(a: Vector, b: Vector): Vector {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}
export function distance(a: Vector, b: Vector) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}
export function normalize(a: Vector) {
  let mag = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  if (mag > 0) {
    mag = 1 / mag;
  }
  a[0] *= mag;
  a[1] *= mag;
  a[2] *= mag;
}
export function getNormalize(a: Vector): Vector {
  let mag = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  if (mag > 0) {
    mag = 1 / mag;
  }
  return [a[0] * mag, a[1] * mag, a[2] * mag];
}
export function setMag(a: Vector, b: number) {
  let mag = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  if (mag > 0) {
    mag = b / mag;
  }
  a[0] *= mag;
  a[1] *= mag;
  a[2] *= mag;
}
export function getSetMag(a: Vector, b: number): Vector {
  let mag = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  if (mag > 0) {
    mag = b / mag;
  }
  return [a[0] * mag, a[1] * mag, a[2] * mag];
}
export function rotateX(a: Vector, b: number) {
  let sin = Math.sin(b);
  let cos = Math.cos(b);
  let y = a[1];
  let z = a[2];
  a[1] = y * cos - z * sin;
  a[2] = y * sin + z * cos;
}
export function getRotateX(a: Vector, b: number): Vector {
  let sin = Math.sin(b);
  let cos = Math.cos(b);
  let y = a[1];
  let z = a[2];
  return [a[0], y * cos - z * sin, y * sin + z * cos];
}
export function rotateXAlong(a: Vector, b: Vector, c: number) {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  //translate to correct position
  a[0] = r[0] + b[0];
  a[1] = r[1] + b[1];
  a[2] = r[2] + b[2];
}
export function getRotateXAlong(a: Vector, b: Vector, c: number): Vector {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  //translate to correct position
  return [r[0] + b[0], r[1] + b[1], r[2] + b[2]];
}
export function rotateY(a: Vector, b: number) {
  let sin = Math.sin(b);
  let cos = Math.cos(b);
  let x = a[0];
  let z = a[2];
  a[0] = z * sin + x * cos;
  a[2] = z * cos - x * sin;
}
export function getRotateY(a: Vector, b: number): Vector {
  let sin = Math.sin(b);
  let cos = Math.cos(b);
  let x = a[0];
  let z = a[2];
  return [z * sin + x * cos, a[1], z * cos - x * sin];
}
export function rotateYAlong(a: Vector, b: Vector, c: number) {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  a[0] = r[0] + b[0];
  a[1] = r[1] + b[1];
  a[2] = r[2] + b[2];
}
export function getRotateYAlong(a: Vector, b: Vector, c: number): Vector {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  return [r[0] + b[0], r[1] + b[1], r[2] + b[2]];
}
export function rotateZ(a: Vector, b: number) {
  let sin = Math.sin(b);
  let cos = Math.cos(b);
  let x = a[0];
  let y = a[1];
  a[0] = x * cos - y * sin;
  a[1] = x * sin + y * cos;
}
export function getRotateZ(a: Vector, b: number): Vector {
  let sin = Math.sin(b);
  let cos = Math.cos(b);
  let x = a[0];
  let y = a[1];
  return [x * cos - y * sin, x * sin + y * cos, a[2]];
}
export function rotateZAlong(a: Vector, b: Vector, c: number) {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];
  a[0] = r[0] + b[0];
  a[1] = r[1] + b[1];
  a[2] = r[2] + b[2];
}
export function getRotateZAlong(a: Vector, b: Vector, c: number): Vector {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  return [r[0] + b[0], r[1] + b[1], r[2] + b[2]];
}
// export function rotate(a: Vector, b: number) {}
// export function getRotate(a: Vector, b: number) {}
// export function rotateAlong(a: Vector, b: Vector, c: number) {}
// export function getRotateAlong(a: Vector, b: Vector, c: number) {}
export function getCenter(a: Vector, b: Vector): Vector {
  return [(b[0] - a[0]) / 2, (b[1] - a[1]) / 2, (b[2] - a[2]) / 2];
}
export function getSmallestComponent(a: Vector) {
  return Math.min(Math.min(a[0], a[1]), a[2]);
}
export function getLargestComponent(a: Vector): number {
  return Math.max(Math.max(a[0], a[1]), a[2]);
}
export function random(a: Vector, b: number) {
  b = b === undefined ? 1.0 : b;
  let r = (Math.random() - 0.5) * 2 * Math.PI;
  let z = (Math.random() - 0.5) * 2 - 1.0;
  let zScale = Math.sqrt(1 - z * z) * b;
  a[0] = Math.cos(r) * zScale;
  a[1] = Math.sin(r) * zScale;
  a[2] = z * zScale;
}
export function getRandom(a: number) {
  a = a === undefined ? 1.0 : a;
  let r = (Math.random() - 0.5) * 2 * Math.PI;
  let z = (Math.random() - 0.5) * 2 - 1.0;
  let zScale = Math.sqrt(1 - z * z) * a;
  return [Math.cos(r) * zScale, Math.sin(r) * zScale, z * zScale];
}

export function ceil(a: Vector) {
  a[0] = Math.ceil(a[0]);
  a[1] = Math.ceil(a[1]);
  a[2] = Math.ceil(a[2]);
}
export function getCeil(a: Vector): Vector {
  return [Math.ceil(a[0]), Math.ceil(a[1]), Math.ceil(a[2])];
}
export function floor(a: Vector) {
  a[0] = Math.floor(a[0]);
  a[1] = Math.floor(a[1]);
  a[2] = Math.floor(a[2]);
}
export function getFloor(a: Vector): Vector {
  return [Math.floor(a[0]), Math.floor(a[1]), Math.floor(a[2])];
}
export function toObject(a: Vector): { x: number; y: number; z: number } {
  return {
    x: a[0],
    y: a[1],
    z: a[2],
  };
}
export function fromObject(a: { x: number; y: number; z: number }): Vector {
  return [a.x, a.y, a.z];
}
export function toString(a: Vector): string {
  return `<${a[0]} ${a[0]} ${a[2]}>`;
}
export function negate(a: Vector) {
  a[0] = -a[0];
  a[1] = -a[1];
  a[2] = -a[2];
}
export function getNegative(a: Vector): Vector {
  return [-a[0], -a[1], -a[2]];
}
export function invert(a: Vector) {
  a[0] = 1 / a[0];
  a[1] = 1 / a[1];
  a[2] = 1 / a[2];
}
export function getInvert(a: Vector): Vector {
  return [1 / a[0], 1 / a[1], 1 / a[2]];
}
export function dot(a: Vector, b: Vector): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
export function cross(a: Vector, b: Vector): Vector {
  let ax = a[0],
    ay = a[1],
    az = a[2];
  let bx = b[0],
    by = b[1],
    bz = b[2];
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

export function angle(a: Vector, b: Vector): number {
  const mag =
    Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) *
    Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]);
  const cos = mag && (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / mag;
  return Math.acos(Math.min(Math.max(cos, -1), 1));
}
