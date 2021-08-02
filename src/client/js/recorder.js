const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
    startBtn.innerText = "Start Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        console.log("Recording finished.")
        console.log(e.data);
    };
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 10000);
}

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 200, height: 100 }, audio: false });
    video.srcObject = stream;
    video.play();
}

init();

startBtn.addEventListener("click", handleStart);