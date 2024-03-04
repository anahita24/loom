let video = document.querySelector("video");
let recordBtnContainer = document.querySelector("record-btn-cont");
let recordBtn = document.querySelector("record-btn");

let captureBtnContainer = document.querySelector("capture-btn-cont");
let captureBtn = document.querySelector("capture-btn");
let recordFlag = false


let recorder;

let constraints ={
    video: true,
    audio: true,
}

navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
   video.srcObject = stream;
   recorder = new MediaRecorder(stream);
});

recordBtnContainer.addEventListener("click", ()=>{
    if(!recorder) return;
    recordFlag = !recordFlag;
})