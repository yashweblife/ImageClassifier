const video_element: HTMLVideoElement = document.createElement("video");
const train_button:HTMLButtonElement = document.createElement("button");
const input_button:HTMLInputElement = document.createElement("input");
const button_array:HTMLElement = document.createElement("div");
const video_button:HTMLButtonElement = document.createElement("button")
const canvas:HTMLCanvasElement = document.createElement("canvas");
canvas.width=300;
canvas.height=300;
const c:CanvasRenderingContext2D = canvas.getContext('2d')!;

train_button.innerHTML = "TRAIN"
video_button.innerHTML = "Start Camera"
input_button.placeholder = "Enter A Name";
window.addEventListener("load",()=>{
  document.body.append(
    input_button,
    train_button,
    button_array,
    video_button,
    canvas
  )
})
video_button.addEventListener("click",()=>{
  // document.body.append(video_element);
  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: 300,
        height: 300,
      },
      audio: false,
    })
    .then((stream: MediaStream) => {
      video_element.srcObject = stream;
      video_element.play();
      animate();
    });
})

function set_video_to_canvas(video:HTMLVideoElement, c:CanvasRenderingContext2D){
  c.drawImage(video, 0,0, c.canvas.width, c.canvas.height);
}
function set_image_matrix_values(res:number=100, c:CanvasRenderingContext2D, matrix:Float32Array){
  const {data} = c.getImageData(0,0,c.canvas.width, c.canvas.height);
  let index=  0;
  for(let i=0;i<data.length-4; i+=data.length/res){
    const calc = (data[i]+data[i+1]+data[i+2])/3
    matrix[index] = calc/255;
    index+=1;
  }
}
function get_image_matrix_average(matrix:Float32Array){
  let output = 0;
  for(let i=0;i<matrix.length;i++){
    output += matrix[i]
  }
  output/=matrix.length;
  return(output);
}
function get_image_matrix_clone(matrix:Float32Array){
  const output:Float32Array = new Float32Array(matrix.length);
  for(let i=0;i<matrix.length;i++){
    output[i] = matrix[i]
  }
  return(output);
}

const resolution = 100;
const image_matrix = new Float32Array(resolution);

function animate(){
  set_video_to_canvas(video_element, c);
  set_image_matrix_values(100,c, image_matrix)
  requestAnimationFrame(animate)
}
