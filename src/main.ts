import { getRotateY, Vector } from "./lib/Vector";
const a:Vector = [1,0,0]
const b:Vector = getRotateY(a,45*Math.PI/180)

console.log(b)