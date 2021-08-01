const startBtn = document.getElementById("startBtn");

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log(stream);
}

startBtn.addEventListener("click", handleStart);