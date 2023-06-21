// Function to handle exporting
function exportRecording() {
  // Example: Define recording options
  const recordingOptions = {
    audio: true,
    video: true,
  };

  // Example: Define recording duration (in milliseconds)
  const recordingDuration = 10000; // 10 seconds

  // Request access to media devices
  navigator.mediaDevices.getUserMedia(recordingOptions)
    .then(stream => {
      // Create a MediaRecorder instance to record the stream
      const mediaRecorder = new MediaRecorder(stream);
      const recordedChunks = [];

      // Event handler for data available
      mediaRecorder.addEventListener('dataavailable', event => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      });

      // Event handler for stop event
      mediaRecorder.addEventListener('stop', () => {
        const recordedBlob = new Blob(recordedChunks, { type: 'video/mp4' });

        // Create a download link and simulate a click to initiate the download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(recordedBlob);
        downloadLink.download = 'recording.mp4';
        downloadLink.click();

        // Example: Send a response to the background script indicating successful export
        chrome.runtime.sendMessage({ message: 'exportSuccess' });
      });

      // Start recording
      mediaRecorder.start();

      // Stop recording after the specified duration
      setTimeout(() => {
        mediaRecorder.stop();
      }, recordingDuration);
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
      // Example: Send a response to the background script indicating export failure
      chrome.runtime.sendMessage({ message: 'exportError' });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'exportRecording') {
    exportRecording();
  }
});
