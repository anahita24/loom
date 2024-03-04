let video = document.querySelector("video");
let recordBtnContainer = document.querySelector("record-btn-cont");
let caotureBtnContainer = document.querySelector("capture-btn-cont");

let recorder;

let constraints ={
    video: true,
    audio: true,
}

navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
   video.srcObject = stream;
   recorder = new MediaRecorder(stream);
});