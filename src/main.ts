function lerp(a:number,b:number, t:number){
    return(
        a + (b-a)*t
    )
}

class Matrix {
  public components: Float32Array;
  constructor(public size: number = 3) {
    this.components = new Float32Array(size);
  }
}
class MatrixMath extends Matrix {
  public static add(a: Matrix, b: Matrix) {}
}
class Canvas {
  public canvas: HTMLCanvasElement = document.createElement("canvas");
  public size: Matrix = new Matrix(2);
  public c: CanvasRenderingContext2D = this.canvas.getContext("2d")!;

  constructor(parent: HTMLElement = document.body) {
    parent.append(this.canvas);
    this.size.components[0] = 300;
    this.size.components[1] = 300;
    this.canvas.width = 300
    this.canvas.height= 300;
  }
  public drawImage(image: HTMLVideoElement | HTMLImageElement) {
    this.c.drawImage(
      image,
      0,
      0,
      this.size.components[0],
      this.size.components[1]
    );
  }
  public getImage(){
    return(this.c.getImageData(0,0,this.size.components[0], this.size.components[1]))
  }
}

class Camera {
  public video: HTMLVideoElement = document.createElement("video");
  constructor() {
    navigator.mediaDevices
      .getUserMedia({ video: {
        width:300,
        height:300
      } })
      .then((stream: MediaStream) => {
        this.video.srcObject = stream;
        this.video.play();
      });
  }
  public getVideo() {
    return this.video;
  }
}

class Group {
  public values: any[] = [];
  constructor(public name: string = "", data: any) {
    this.values.push(data);
  }
  public addValue() {}
}
class Classifier {
  constructor() {}
  public gatherData() {}
  public classify() {}
  public train() {}
}

class Visualizer {
  public canvas: Canvas = new Canvas();
  constructor() {}
}
const canvas = new Canvas(document.querySelector('#canvas-card') as HTMLElement);
const cam = new Camera();
function animate() {
  canvas.drawImage(cam.getVideo());
  console.log(canvas.getImage().data.length)
  requestAnimationFrame(animate);
}
animate();
