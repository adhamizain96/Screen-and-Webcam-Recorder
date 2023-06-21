let isAnnotationActive = false;
let startPoint = null;
let endPoint = null;
let annotations = [];

// Function to handle the start of annotation
function startAnnotation() {
  isAnnotationActive = true;
  // Add your annotation logic here

  // Example: Add a CSS class to indicate active annotation mode
  document.body.classList.add('annotation-active');

  // Example: Attach event listeners to capture annotation events
  document.addEventListener('mousedown', handleAnnotationStart);
  document.addEventListener('mouseup', handleAnnotationEnd);
}

// Function to handle the stop of annotation
function stopAnnotation() {
  isAnnotationActive = false;
  // Add your annotation logic here

  // Example: Remove the CSS class indicating active annotation mode
  document.body.classList.remove('annotation-active');

  // Example: Remove event listeners used for annotation
  document.removeEventListener('mousedown', handleAnnotationStart);
  document.removeEventListener('mouseup', handleAnnotationEnd);
}

// Example event handler for starting annotation
function handleAnnotationStart(event) {
  // Example: Log the starting coordinates of the annotation
  console.log('Annotation started:', event.clientX, event.clientY);
  startPoint = { x: event.clientX, y: event.clientY };
}

// Example event handler for ending annotation
function handleAnnotationEnd(event) {
  // Example: Log the ending coordinates of the annotation
  console.log('Annotation ended:', event.clientX, event.clientY);
  endPoint = { x: event.clientX, y: event.clientY };

  // Example: Perform annotation actions with start and end points
  performAnnotationAction(startPoint, endPoint);
  startPoint = null;
  endPoint = null;
}

// Example function to perform annotation actions
function performAnnotationAction(startPoint, endPoint) {
  // Example: Create a rectangle element for the annotation area
  const annotationElement = document.createElement('div');
  annotationElement.classList.add('annotation');

  // Example: Calculate annotation dimensions and position
  const width = Math.abs(endPoint.x - startPoint.x);
  const height = Math.abs(endPoint.y - startPoint.y);
  const left = Math.min(startPoint.x, endPoint.x);
  const top = Math.min(startPoint.y, endPoint.y);

  // Example: Set the annotation element's dimensions and position
  annotationElement.style.width = width + 'px';
  annotationElement.style.height = height + 'px';
  annotationElement.style.left = left + 'px';
  annotationElement.style.top = top + 'px';

  // Example: Add the annotation element to the document body
  document.body.appendChild(annotationElement);

  // Example: Customize the styling of the annotation element
  annotationElement.style.border = '2px solid red';
  annotationElement.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';

  // Example: Save annotation data to an array
  const annotationData = {
    startPoint,
    endPoint,
    dimensions: { width, height },
    position: { left, top },
    timestamp: new Date().toISOString(),
  };
  annotations.push(annotationData);
  console.log('Annotation data:', annotationData);

  // Add your logic for performing the desired annotation actions
  // Customize the styling, save annotation data, or perform any other necessary operations
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startAnnotation') {
    startAnnotation();
  } else if (request.message === 'stopAnnotation') {
    stopAnnotation();
  }
});
