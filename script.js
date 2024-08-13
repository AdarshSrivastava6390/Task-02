// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const displayElement = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Format time in HH:MM:SS.mmm
function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Start/Stop button functionality
startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
    } else {
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
});

// Update the display with the current time
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    displayElement.textContent = formatTime(elapsedTime);
}

// Reset button functionality
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    displayElement.textContent = '00:00.000';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = '';
});

// Lap button functionality
lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsList.appendChild(li);
});
