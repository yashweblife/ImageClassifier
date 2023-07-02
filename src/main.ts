class Camera {
    public mediaStream: (MediaStream | null) = null;
    public video: HTMLVideoElement = document.createElement("video")
    constructor() {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream: MediaStream) => {
            this.mediaStream = stream;
            this.video.srcObject = stream;
            this.video.play();
        })
    }
    public getVideo() {
        return (this.video)
    }
}
class Vector{
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
        return(this);
    }
}

class Classification{
    public name:string="";
    public data:Vector[]=[];
    constructor(){}
    public addData(){}
}
class Classifier{
    public classes:Classification[]=[]
    constructor(){}
    public addData(){}
}
class App {
    public time: number = 0;
    public classifier = new Classifier();
    constructor() { }
    public animate() { 

    }
}