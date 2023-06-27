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

