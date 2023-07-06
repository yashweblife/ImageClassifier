class Camera {
    public mediaStream: (MediaStream | null) = null;
    public video: HTMLVideoElement = document.createElement("video")
    public canvas: HTMLCanvasElement = document.createElement("canvas");
    public c: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 300,
                height: 300
            }
        }).then((stream: MediaStream) => {
            this.mediaStream = stream;
            this.video.srcObject = stream;
            this.video.play();
        })
    }
    public getVideo() {
        this.c.drawImage(this.video, 0, 0, 300, 300);
        return (this.c.getImageData(0, 0, 300, 300));
    }
}
class Vector {
    public components: Float64Array;
    public length: number = 0;
    constructor(size: number = 3) {
        this.components = new Float64Array(size);
        this.length = size;
    }
    public set(value: Float64Array) {
        this.components = value;
        return (this);
    }
    public add(value: Vector) {
        for (let i = 0; i < this.length; i++) {
            this.components[i] += value.components[i];
        }
        return (this)
    }
    public sub(value: Vector) {
        for (let i = 0; i < this.length; i++) {
            this.components[i] -= value.components[i];
        }
        return (this)
    }
    public getMag() {
        let output = 0;
        for (let i = 0; i < this.length; i++) {
            output += this.components[i] * this.components[i];
        }
        output = Math.sqrt(output);
        return (output);
    }
    public normalize(scale: number = 1) {
        let magnitude = 0;
        for (let i = 0; i < this.length; i++) {
            magnitude = this.components[i] * this.components[i];
        }
        magnitude = Math.sqrt(magnitude);
        for (let i = 0; i < this.length; i++) {
            this.components[i] *= scale / magnitude;
        }
        return (this);
    }
    public clone() {
        const nVec = new Vector(this.length);
        for (let i = 0; i < this.length; i++) {
            nVec.components[i] = this.components[i];
        }
        return (nVec);
    }
}

class Classification {
    constructor(public name:string="", public data:Vector[][]){}
}
class Classifier {

}
class App {
    public time: number = 0;
    public classifier = new Classifier();
    public cam: Camera = new Camera();
    public currentImageData: Vector[] = new Array(216);
    constructor() {
        document.body.appendChild(this.cam.canvas)
        for (let i = 0; i < this.currentImageData.length; i++) {
            this.currentImageData[i] = new Vector(4);
        }
    }
    public makeSenseOfData({ data }: ImageData) {
        let x = 0;
        for (let i = 0; i < data.length - 4; i += Math.floor(data.length / this.currentImageData.length)) {
            if (x < this.currentImageData.length) {
                this.currentImageData[x].components[0] = data[i]
                this.currentImageData[x].components[1] = data[i + 1]
                this.currentImageData[x].components[2] = data[i + 2]
                this.currentImageData[x].components[3] = (data[i] + data[i + 1] + data[i + 2]) / 3
                x += 1
            }
        }
    }
    public addClass(name: string = "") {
        this.classifier.addClass(name, this.currentImageData.map((val: Vector) => val.clone()));
    }
    public animate() {
        this.makeSenseOfData(this.cam.getVideo());
    }
}
const a = new App();
function anim() {
    a.animate()
    requestAnimationFrame(anim)
}
anim()