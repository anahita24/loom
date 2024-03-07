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

let timerID;
let counter=0;
let timer = document.querySelector(".timer");
function startTimer(){
  let totalSeconds = counter;
  function displayTimer(){
    let hours = Number.parseInt(totalSeconds /3600);
    totalSeconds = totalSeconds % 3600;
    let minutes = Number.parseInt(totalSeconds/ 60);
    let seconds = totalSeconds;

    hours = (hours < 10) ? `0${minutes}`: minutes;
    minutes = (minutes < 10) ? `0${minutes}`: minutes;
    seconds = (seconds < 10) ? `0${seconds}`: seconds;


    timer.innerText = `${hours}: ${minutes} : ${seconds}`;
    counter++;
  }
   timerID = setInterval(displayTimer,1000);
}

function stopTimer(){
  clearInterval(timerID);
  timer.innerText = "00:00:00";
}
