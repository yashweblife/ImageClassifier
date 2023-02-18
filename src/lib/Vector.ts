export type Vector = [number, number, number];
export function make(x: number, y: number, z: number): Vector {
  return [x, y, z] as Vector;
}
export function magnitude(a: Vector) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
export function add(a: Vector, b: Vector) {
  a[0] = a[0] + b[0];
  a[1] = a[1] + b[1];
  a[2] = a[2] + b[2];
}
export function getAdd(a: Vector, b: Vector) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
export function subtract(a: Vector, b: Vector) {
  a[0] = a[0] - b[0];
  a[1] = a[1] - b[1];
  a[2] = a[2] - b[2];
}
export const sub = subtract;
export function getSubtract(a: Vector, b: Vector) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
export const getSub = getSubtract;
export function scalar(a: Vector, b: number) {
  a[0] *= b;
  a[1] *= b;
  a[2] *= b;
}
export function getScalar(a: Vector, b: number) {
  return [a[0] * b, a[1] * b, a[2] * b];
}
export function multiply(a: Vector, b: Vector) {
  a[0] = a[0] * b[0];
  a[1] = a[1] * b[1];
  a[2] = a[2] * b[2];
}
export function getMultiply(a: Vector, b: Vector) {
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
export function rotateX(a:Vector,b:number){}
export function getRotateX(a:Vector, b:number){}
export function rotateXAlong(a:Vector,b:Vector,c:number){}
export function getRotateXAlong(a:Vector,b:Vector,c:number){}

export function rotateY(a:Vector,b:number){}
export function getRotateY(a:Vector, b:number){}
export function rotateYAlong(a:Vector,b:Vector,c:number){}
export function getRotateYAlong(a:Vector,b:Vector,c:number){}

export function rotateZ(a:Vector,b:number){}
export function getRotateZ(a:Vector, b:number){}
export function rotateZAlong(a:Vector,b:Vector,c:number){}
export function getRotateZAlong(a:Vector,b:Vector,c:number){}
