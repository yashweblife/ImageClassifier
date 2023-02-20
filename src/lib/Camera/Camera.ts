export class Camera {
  public dom: HTMLVideoElement = document.createElement("video");
  public stream: MediaStream | null = null;
  public streamState: boolean = false;
  constructor(parent: HTMLElement = document.body) {
    parent.append(this.dom);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 10, height: 10 }, audio: false })
      .then((stream: MediaStream) => {
        this.dom.srcObject = stream;
        this.stream = stream;
        this.dom.play();
        this.streamState = true;
      });
  }
  public onPlay = (f:Function)=>{
    this.dom.addEventListener("play",()=>{
      f();
    },false)
  }
  public stop = () => {
    this.dom.pause();
    this.streamState = false;
  };
  public start = () => {
    this.dom.play();
    this.streamState = true;
  };
  public toggle = () => {
    if (this.streamState) {
      this.stop();
    } else {
      this.start();
    }
  };
}
