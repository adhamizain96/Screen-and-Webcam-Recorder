let countdownInterval;
let hours = 0; 
let minutes = 0;
let seconds = 0;

// Start the countdown timer
function startCountdown() {
  countdownInterval = setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    chrome.runtime.sendMessage({ message: 'updateCountdown', time: formattedTime });
  }, 1000);
}

// Stop the countdown timer
function stopCountdown() {
  clearInterval(countdownInterval);
}

// Function to pad zero to single digits
function padZero(number) {
  return number.toString().padStart(2, '0');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startCountdown') {
    startCountdown();
  } else if (request.message === 'stopCountdown') {
    stopCountdown();
  }
});
