let alarmTime = null;
let alarmTimeout = null;

const currentTimeDisplay = document.getElementById('current-time');
const alarmStatus = document.getElementById('alarm-status');
const alarmSound = document.getElementById('alarm-audio');

const updateCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

const setAlarm = () => {
    const alarmInput = document.getElementById('alarm-time').value;
    if (!alarmInput) {
        alert('Please select a valid time for the alarm!');
        return;
    }
    
    const now = new Date();
    const alarmTimeValue = new Date(now.toDateString() + ' ' + alarmInput + ':00');

    if (alarmTimeValue <= now) {
        alert('The selected time is in the past. Please choose a future time.');
        return;
    }

    const timeToAlarm = alarmTimeValue.getTime() - now.getTime();
    alarmTime = alarmInput;
    
    alarmTimeout = setTimeout(() => {
        alarmSound.play();  // Play the alarm sound
        alert('Alarm ringing!');
        clearAlarm();
    }, timeToAlarm);

    alarmStatus.textContent = `Alarm set for ${alarmTime}`;
}

const clearAlarm = () => {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alarmTimeout = null;
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmStatus.textContent = '';
    }
    document.getElementById('alarm-time').value = '';
}

document.getElementById('set-alarm-btn').addEventListener('click', setAlarm);
document.getElementById('clear-alarm-btn').addEventListener('click', clearAlarm);

setInterval(updateCurrentTime, 1000);
