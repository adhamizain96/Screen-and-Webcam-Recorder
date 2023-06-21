// Get DOM elements
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');
const countdownText = document.getElementById('countdownText');
const startAnnotationButton = document.getElementById('startAnnotationButton');
const stopAnnotationButton = document.getElementById('stopAnnotationButton');
const trimButton = document.getElementById('trimButton');
const shareButton = document.getElementById('shareButton');
const exportButton = document.getElementById('exportButton');
const settingsButton = document.getElementById('settingsButton');
const preferencesButton = document.getElementById('preferencesButton');
const privacyButton = document.getElementById('privacyButton');
const securityButton = document.getElementById('securityButton');

let countdownInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Toggle recording buttons' states
function toggleRecordingButtons() {
  startButton.disabled = !startButton.disabled;
  pauseButton.disabled = !pauseButton.disabled;
  stopButton.disabled = !stopButton.disabled;
}

// Start recording button click handler
startButton.addEventListener('click', () => {
  toggleRecordingButtons();
  startCountdown();
  startRecording();
});

// Pause recording button click handler
pauseButton.addEventListener('click', () => {
  toggleRecordingButtons();
  stopCountdown();
  pauseRecording();
});

// Stop recording button click handler
stopButton.addEventListener('click', () => {
  toggleRecordingButtons();
  stopCountdown();
  stopRecording();
});

// Start annotation button click handler
startAnnotationButton.addEventListener('click', () => {
  startAnnotationButton.disabled = true;
  stopAnnotationButton.disabled = false;
  startAnnotation();
});

// Stop annotation button click handler
stopAnnotationButton.addEventListener('click', () => {
  stopAnnotationButton.disabled = true;
  startAnnotationButton.disabled = false;
  stopAnnotation();
});

// Trim button click handler
trimButton.addEventListener('click', () => {
  trimAndEdit();
});

// Share button click handler
shareButton.addEventListener('click', () => {
  shareRecording();
});

// Export button click handler
exportButton.addEventListener('click', () => {
  exportRecording();
});

// Settings button click handler
settingsButton.addEventListener('click', () => {
  openSettings();
});

// Preferences button click handler
preferencesButton.addEventListener('click', () => {
  openPreferences();
});

// Privacy button click handler
privacyButton.addEventListener('click', () => {
  openPrivacySettings();
});

// Security button click handler
securityButton.addEventListener('click', () => {
  openSecuritySettings();
});

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
    countdownText.textContent = formattedTime;
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

// Placeholder functions for recording logic
function startRecording() {
  // Add your start recording logic here
  console.log('Recording started');
}

function pauseRecording() {
  // Add your pause recording logic here
  console.log('Recording paused');
}

function stopRecording() {
  // Add your stop recording logic here
  console.log('Recording stopped');
}

// Placeholder functions for annotation logic
function startAnnotation() {
  // Add your start annotation logic here
  console.log('Annotation started');
}

function stopAnnotation() {
  // Add your stop annotation logic here
  console.log('Annotation stopped');
}

// Placeholder function for trim and edit logic
function trimAndEdit() {
  // Add your trim and edit logic here
  console.log('Trimming and editing');
}

// Placeholder function for share logic
function shareRecording() {
  // Add your share logic here
  console.log('Sharing recording');
}

// Placeholder function for export logic
function exportRecording() {
  // Add your export logic here
  console.log('Exporting recording');
}

// Placeholder function for settings logic
function openSettings() {
  // Add your settings logic here
  console.log('Opening settings');
}

// Placeholder function for preferences logic
function openPreferences() {
  // Add your preferences logic here
  console.log('Opening preferences');
}

// Placeholder function for privacy logic
function openPrivacySettings() {
  // Add your privacy logic here
  console.log('Opening privacy settings');
}

// Placeholder function for security logic
function openSecuritySettings() {
  // Add your security logic here
  console.log('Opening security settings');
}
