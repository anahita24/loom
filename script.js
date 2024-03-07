let video = document.querySelector("video");
let recordBtnContainer = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");

let captureBtnContainer = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false
let chunks = [];

let recorder;

let constraints ={
    video: true,
    audio: true,
}

navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
   video.srcObject = stream;
   recorder = new MediaRecorder(stream);
   recorder.addEventListener("start", (e)=>{
    chunks = [];
   })
   recorder.addEventListener("dataavailable", (e)=>{
    chunks.push(e.data);
   })
   recorder.addEventListener("stop", ()=>{
    let blob = new Blob(chunks, { type: "video/mp4"});
    let videoURL = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = videoURL;
    a.download = "stream.mp4";
    a.click();
   })
});

recordBtnContainer.addEventListener("click", ()=>{
    if(!recorder) return;
    recordFlag = !recordFlag;

    if(recordFlag){
       recorder.start();
       recordBtn.classList.add("scale-record");
    }
    else {
      recorder.stop();
      recordBtn.classList.remove("scale-record");
    }
})


captureBtnContainer.addEventListener("click", (e) => {
  captureBtn.classList.add("scale-capture");
})

function startTimer(){

}

function stopTimer(){
  
}
