let stream;
let chunks = [];
let mediaRecorder;
let isAnnotationActive = false;

// Function to handle the start of recording
function startRecording() {
  // Check if recording is already active
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    console.log('Recording is already active');
    return;
  }

  // Access screen and webcam media
  navigator.mediaDevices
    .getDisplayMedia({ video: true, audio: true })
    .then((mediaStream) => {
      stream = mediaStream;

      // Create a new MediaRecorder instance
      mediaRecorder = new MediaRecorder(stream);

      // Event handlers for handling data and stop events
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStop;

      // Start recording
      mediaRecorder.start();
    })
    .catch((error) => {
      console.error('Error accessing media devices:', error);
    });
}

// Function to handle the pause of recording
function pauseRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.pause();
    console.log('Recording paused');
  } else {
    console.log('No active recording to pause');
  }
}

// Function to handle the resumption of recording
function resumeRecording() {
  if (mediaRecorder && mediaRecorder.state === 'paused') {
    mediaRecorder.resume();
    console.log('Recording resumed');
  } else {
    console.log('No paused recording to resume');
  }
}

// Function to handle the stop of recording
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    console.log('Recording stopped');
  } else {
    console.log('No active recording to stop');
  }
}

// Function to handle the availability of recorded data
function handleDataAvailable(event) {
  if (event.data.size > 0) {
    chunks.push(event.data);
  }
}

// Function to handle the stop event of the MediaRecorder
function handleStop() {
  const blob = new Blob(chunks, { type: chunks[0].type });
  chunks = [];

  // Create an object URL for the recorded blob
  const videoUrl = URL.createObjectURL(blob);

  // Send message to the popup to display the recorded video
  chrome.runtime.sendMessage({ message: 'displayVideo', videoUrl });

  // Send message to update the recording buttons' states in the popup
  chrome.runtime.sendMessage({ message: 'updateButtons' });
}

// Function to handle the start of annotation
function startAnnotation() {
  isAnnotationActive = true;
  // Add your annotation logic here
}

// Function to handle the stop of annotation
function stopAnnotation() {
  isAnnotationActive = false;
  // Add your annotation logic here
}

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startRecording') {
    startRecording();
  } else if (request.message === 'pauseRecording') {
    pauseRecording();
  } else if (request.message === 'resumeRecording') {
    resumeRecording();
  } else if (request.message === 'stopRecording') {
    stopRecording();
  } else if (request.message === 'startAnnotation') {
    startAnnotation();
  } else if (request.message === 'stopAnnotation') {
    stopAnnotation();
  }
});

// Send a message to the popup to confirm that the content script is loaded
chrome.runtime.sendMessage({ message: 'contentScriptLoaded' });
