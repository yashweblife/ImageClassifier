import { distance, make, Vector } from "../Vector";

export class Canvas {
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public size: Vector = [400, 400, 0];
  public ctx: CanvasRenderingContext2D = this.dom.getContext("2d")!;
  public resolution: number = 10;
  public darkestPoint: Vector = [0, 0, 0];
  constructor(parent: HTMLElement = document.body) {
    parent.append(this.dom);
    this.setSize(400, 400);
  }
  public setSize = (x: number, y: number) => {
    this.dom.width = x;
    this.dom.height = y;
    this.size = make(x, y, 0);
  };
  public drawImage = (vid: HTMLVideoElement) => {
    this.ctx.drawImage(vid, 0, 0, this.size[0], this.size[1]);
  };
  public getImageData = () => {
    const frame: ImageData = this.ctx.getImageData(
      0,
      0,
      this.size[0],
      this.size[1]
    );
    const output: Vector[] = [];
    const data: Uint8ClampedArray = frame.data;
    for (let i = 0; i < data.length; i += 4) {
      let val: Vector = [data[i], data[i + 1], data[i + 2]];
      output.push(val);
    }
    return output;
  };
  public convertImageTo2D = (imageData: Vector[]) => {
    const output: Vector[][] = [];
    let dp: Vector = [255, 255, 255];
    let dist = 100;
    for (let i = 0; i < this.size[0]; i += this.resolution) {
      let line = [];
      for (let j = 0; j < this.size[1]; j += this.resolution) {
        let id = imageData[i * this.size[1] + j];
        line.push(id);
        let check = distance(id, dp);
        if (check < dist) {
          dist = check;
          dp = [id[0], id[1], id[2]];
          this.darkestPoint = [j, i, 0];
        }
      }
      output.push(line);
    }
    return output;
  };
  public draw2d = (data: Vector[][], colorFunction?: Function) => {
    this.ctx.clearRect(0, 0, this.size[0], this.size[1]);
    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[i].length; j += 1) {
        this.ctx.beginPath();
        this.ctx.rect(
          j * this.resolution,
          i * this.resolution,
          this.resolution,
          this.resolution
        );
        if (colorFunction !== undefined) {
          colorFunction(data[i][j]);
        }
        this.ctx.fillStyle = `rgb(${data[i][j][0]},${data[i][j][1]},${data[i][j][2]})`;
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
    this.ctx.beginPath();
    this.ctx.arc(
      this.darkestPoint[0],
      this.darkestPoint[1]  ,
      10,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
  };
}
