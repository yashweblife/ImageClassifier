// import "./styles/style.css";
/**
 * Camera
 */
class Camera {
    public mediaStream: (MediaStream | null) = null;
    public video: HTMLVideoElement = document.createElement("video")
    public isVideoReady: boolean = false;
    public image: HTMLImageElement;
    public canvas: HTMLCanvasElement = document.createElement("canvas");
    public c: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.image = document.querySelector("#example") as HTMLImageElement;
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 300,
                height: 300
            }
        }).then((stream: MediaStream) => {
            this.mediaStream = stream;
            this.video.srcObject = stream;
            this.video.play();
            this.isVideoReady = true;
        })
            .catch((err: any) => {
                console.log(err);
            })
    }
    public getVideo() {
        if (this.isVideoReady) {
            this.c.drawImage(this.video, 0, 0, 300, 300);
        } else {
            this.c.drawImage(this.image, 0, 0, 300, 300);
        }
        return (this.c.getImageData(0, 0, 300, 300));
    }
}

/**
 * Vector
 */
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
    public mul(value: number) {
        for (let i = 0; i < this.length; i++) {
            this.components[i] *= value;
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
    public distance(vec: Vector) {
        let output = 0;
        for (let i = 0; i < this.length; i++) {
            output += (this.components[i] - vec.components[i]) ** 2
        }
        return (Math.sqrt(output));
    }
}

/**
 * Vector Math
 */
class VectorMath {
    constructor() { }
    public static add(v1: Vector, v2: Vector) {
        const output = new Vector(v1.length);
        for (let i = 0; i < v1.length; i++) {
            output.components[i] = v1.components[i] + v2.components[i];
        }
        return (output);
    }
    public static getAverage(vec: Vector[]) {
        const output = new Vector(vec[0].length);
        for (let i = 0; i < vec.length; i++) {
            output.add(vec[i]);
        }
        output.mul(1 / vec.length);
        return (output)
    }
    public static sib(vec1: Vector, vec2: Vector) {
        const output = new Vector(vec1.length);
        for (let i = 0; i < output.length; i++) {
            output.components[i] = vec1.components[i] - vec2.components[i];
        }
        return (output)
    }
    public static normalize(vec: Vector, scale: number = 1) {
        let magnitude = 0;
        let output = new Vector(vec.length);
        for (let i = 0; i < this.length; i++) {
            magnitude = vec.components[i] * vec.components[i];
        }
        magnitude = Math.sqrt(magnitude);
        for (let i = 0; i < this.length; i++) {
            output.components[i] = vec.components[i] * scale / magnitude;
        }
        return (vec);
    }
}

/**
 * Classification
 */
class Classification {
    public averageVector: Vector[] = [];
    constructor(public name: string = "", public data: Vector[][]) {
    }
    public normalize() {
        for (let i = 0; i < this.data.length; i++) {

        }
    }
    public getAverage() {
        for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i]);
        }
    }
    public addData(val: Vector[]) {
        this.data.push(val);
    }
}
/**
 * Classifier
 */
class Classifier {
    public classifications: Classification[] = []
    constructor() { }
    classify(val: Vector) {
        let checkDist = Infinity;
        let output = undefined;
        for (let i = 0; i < this.classifications.length; i++) {
            const { name, averageVector } = this.classifications[i];
            for (let i = 0; i < averageVector.length; i++) {

            }
        }
    }
    addClass(name: string = "", val: Vector[]) {
        if (this.classifications.length > 0) {
            for (let i = 0; i < this.classifications.length; i++) {
                if (this.classifications[i].name == name) {
                    this.classifications[i].addData(val)
                    return;
                }
            }
            this.classifications.push(new Classification(name, [val]));
        } else {
            this.classifications.push(new Classification(name, [val]));
        }
        for (let i = 0; i < this.classifications.length; i++) {
            this.classifications[i].getAverage();
        }
    }
}
/**
 * App
 */
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
        this.classifier.addClass(name, [...this.currentImageData]);
    }
    public animate() {
        this.makeSenseOfData(this.cam.getVideo());
    }
}

const a = new App();
const trainButton = document.querySelector("#train") as HTMLButtonElement
const nameInput = document.querySelector("#name") as HTMLInputElement
trainButton.addEventListener("click", () => {
    a.addClass(nameInput.value);
})
function anim() {
    a.animate()
    requestAnimationFrame(anim)
}
anim()