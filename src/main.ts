import { Camera } from "./lib/Camera";
import { Canvas } from "./lib/Canvas/Canvas";
import { floor, magnitude, setMag, Vector } from "./lib/Vector";
const cam = new Camera();
const canvas = new Canvas();

function setColor(data: Vector) {
  let mag = magnitude(data);
  if (mag > 200) {
    setMag(data, 0);
  } else if (mag > 100 && mag < 200) {
    setMag(data, 100);
  } else if (mag > 50 && mag < 100) {
    setMag(data, 200);
  } else {
    setMag(data, 255);
  }
  floor(data);
}
function maxRGB(data: Vector) {
  let maxColor = Math.max(Math.max(data[0], data[1]), data[2]);
  let threshold = 1;
  data[0] = maxColor - data[0] < threshold ? 255 : 0;
  data[1] = maxColor - data[1] < threshold ? 255 : 0;
  data[2] = maxColor - data[2] < threshold ? 255 : 0;
}
function minRGB(data: Vector) {
  let minColor = Math.min(Math.min(data[0], data[1]), data[2]);
  let threshold = 10;
  data[0] = data[0] - minColor < threshold ? 255 : 0;
  data[1] = data[1] - minColor < threshold ? 255 : 0;
  data[2] = data[2] - minColor < threshold ? 255 : 0;
}
function greyScale(data: Vector) {
  let maxColor = Math.max(Math.max(data[0], data[1]), data[2]);
  data[0] = maxColor;
  data[1] = maxColor;
  data[2] = maxColor;
}
canvas.setResolution(10)
  
function animate(){
  canvas.drawImage(cam.dom);
  canvas.getImageAs2D();
  canvas.drawImageMatrix();
  requestAnimationFrame(animate);
}

cam.onPlay(() => {
  animate();
});
const range = document.querySelector('#slider') as HTMLInputElement
const reverse = document.querySelector("#reverse") as HTMLButtonElement
range.addEventListener("input",()=>{
  canvas.setThreshold(Number(range.value))
})
reverse.addEventListener("click",()=>{
  canvas.toggleReverse()
})