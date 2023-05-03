const video_element: HTMLVideoElement = document.createElement("video");
const train_button:HTMLButtonElement = document.createElement("button");
const input_button:HTMLInputElement = document.createElement("input");
const button_array:HTMLElement = document.createElement("div");
const video_button:HTMLButtonElement = document.createElement("button")
const canvas:HTMLCanvasElement = document.createElement("canvas");
canvas.width=300;
canvas.height=300;
const c:CanvasRenderingContext2D = canvas.getContext('2d')!;

const graph:HTMLCanvasElement = document.createElement("canvas");
graph.width=300;
graph.height=300;
const g:CanvasRenderingContext2D = graph.getContext('2d')!;

train_button.innerHTML = "TRAIN"
video_button.innerHTML = "Start Camera"
input_button.placeholder = "Enter A Name";
window.addEventListener("load",()=>{
  document.body.append(
    input_button,
    train_button,
    button_array,
    video_button,
    canvas,
    graph 
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
function set_matrix_values_to_image(res:number=100, c:CanvasRenderingContext2D, matrix:Float32Array[]){
  const {data} = c.getImageData(0,0,c.canvas.width, c.canvas.height);
  let index=  0;
  for(let i=0;i<data.length-4; i+=data.length/res){
    const calc = (data[i]+data[i+1]+data[i+2])/3
    for(let i=0;i<matrix.length;i++){
      matrix[i][index] = calc/255;
    }
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

function draw_bar(c:CanvasRenderingContext2D, pos:number, size:number, color:string){
  c.beginPath();
  c.fillStyle = color;
  c.rect(pos, 0, 2, -size);
  c.fill();
  c.closePath();
}

function draw_bar_graph(c:CanvasRenderingContext2D,plot:Float32Array){
  for(let i=0;i<plot.length;i++){
    draw_bar(c, i*3, plot[i], "red");
  }
}

const resolution = 100;
const image_matrix = new Float32Array(resolution);
const red_image_matrix = new Float32Array(resolution);
const green_image_matrix = new Float32Array(resolution);
const blue_image_matrix = new Float32Array(resolution);
g.translate(0, g.canvas.height)
function animate(){
  g.clearRect(- g.canvas.width, -g.canvas.height,g.canvas.width, g.canvas.height);
  set_video_to_canvas(video_element, c);
  set_matrix_values_to_image(100,c, [image_matrix, red_image_matrix, green_image_matrix, blue_image_matrix])
  draw_bar_graph(g, image_matrix.map(val=>val*255));
  requestAnimationFrame(animate)
}
