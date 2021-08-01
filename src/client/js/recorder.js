const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 200, height: 100 }, audio: false });
    video.srcObject = stream;
    video.play();
}

startBtn.addEventListener("click", handleStart);