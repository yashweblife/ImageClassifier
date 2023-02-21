import { distance, getLargestComponent, make, Vector } from "../Vector";

export class Canvas {
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public size: Vector = [400, 400, 0];
  public ctx: CanvasRenderingContext2D = this.dom.getContext("2d", {
    willReadFrequently: true,
  })!;
  public resolution: number = 10;
  public darkestPoint: Vector = [0, 0, 0];
  public imageMatrix: Vector[][] = [];
  public greyScale: boolean = true;
  public boundingBox: number[][] = [
    [0, 0],
    [500, 500],
  ];
  constructor(parent: HTMLElement = document.body) {
    parent.append(this.dom);
    this.setSize(400, 400);
    this.setResolution(4);
    this.createImageMatrix();
  }
  /**
   * Set the size of the canvas
   * @param x
   * @param y
   */
  public setSize = (x: number, y: number) => {
    this.dom.width = x;
    this.dom.height = y;
    this.size = make(x, y, 0);
    this.createImageMatrix();
  };
  /**
   * Set the resolution of the image matrix
   * @param val
   */
  public setResolution = (val: number) => {
    this.resolution = val;
    this.createImageMatrix();
  };
  /**
   * Image matrix needs to be initialized at the start
   * The matrix stores vectors
   */
  public createImageMatrix = () => {
    this.imageMatrix = [];
    for (let i = 0; i < this.size[0]; i += this.resolution) {
      const line: Vector[] = [];
      for (let j = 0; j < this.size[1]; j += this.resolution) {
        line.push([0, 0, 0]);
      }
      this.imageMatrix.push(line);
    }
  };
  /**
   * Draw an image onto the canvas
   * @param vid
   */
  public drawImage = (vid: HTMLVideoElement) => {
    this.ctx.drawImage(vid, 0, 0, this.size[0], this.size[1]);
  };
  /**
   * Get the pixel values of the image
   * @returns Vector[] All the pixel values
   */
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
  public getImageAs2D = () => {
    const frame: ImageData = this.ctx.getImageData(
      0,
      0,
      this.size[0],
      this.size[1]
    );
    let boundX = 500;
    let boundY = 500;
    let boundMX = 0;
    let boundMY = 0;
    const data = frame.data;
    let x = 0;
    for (let i = 0; i < this.size[0]; i += this.resolution) {
      let y = 0;
      for (let j = 0; j < this.size[0]; j += this.resolution) {
        const index = (i * this.size[0] + j) * 4;
        let test: Vector = [data[index + 0], data[index + 1], data[index + 2]];
        if (this.greyScale === true) {
          let val = getLargestComponent(test);
          if (val < 60) {
            val = 0;
          } else {
            val = 255;
            if (x >= boundMX) {
              boundMX = x;
            }
            if (y >= boundMY) {
              boundMY = y;
            }
            if (x < boundX) {
              boundX = x;
            }
            if (y < boundY) {
              boundY = y;
            }
          }
          test[0] = val;
          test[1] = val;
          test[2] = val;
        }
        if (distance(this.imageMatrix[x][y], test) > 20) {
          this.imageMatrix[x][y] = test;
        }

        y++;
      }
      x++;
    }
    this.boundingBox[0] = [boundX, boundY];
    this.boundingBox[1] = [boundMX, boundMY];
  };

  public drawImageMatrix = () => {
    this.ctx.clearRect(0, 0, this.size[0], this.size[1]);
    for (let i = 0; i < this.imageMatrix.length; i++) {
      for (let j = 0; j < this.imageMatrix[i].length; j++) {
        this.ctx.beginPath();
        this.ctx.rect(
          j * this.resolution,
          i * this.resolution,
          this.resolution,
          this.resolution
        );
        this.ctx.closePath();
        this.ctx.fillStyle = `rgb(${this.imageMatrix[i][j][0]},${this.imageMatrix[i][j][1]},${this.imageMatrix[i][j][2]})`;
        this.ctx.fill();
      }
    }
    this.ctx.beginPath();
    this.ctx.rect(
      this.boundingBox[0][1] * this.resolution,
      this.boundingBox[0][0] * this.resolution,
      this.boundingBox[1][0] * (this.resolution/2),
      this.boundingBox[1][1] * (this.resolution/2),
    );
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
    this.ctx.closePath();
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
      this.darkestPoint[1],
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
