// Select DOM elements
const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");

// Global variables for tracking drag events
let isDragging = false,
  startY,
  startHeight;

// Select form and form fields
const bookingForm = document.getElementById("UserBookingForm");
const fullNameInput = document.getElementById("bName");
const phoneNumberInput = document.getElementById("bNumber");
const daysInput = document.getElementById("bDays");
const dateInput = document.getElementById("bDate");
const hoursInput = document.getElementById("bhours");
const addressInput = document.getElementById("bAdd");

// Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
const showBottomSheet = () => {
  bottomSheet.classList.add("show");
  document.body.style.overflowY = "hidden";
  document.body.classList.add("bodyfix");
  updateSheetHeight(50);
};

const updateSheetHeight = (height) => {
  sheetContent.style.height = `${height}vh`; //updates the height of the sheet content
  // Toggles the fullscreen class to bottomSheet if the height is equal to 100
  bottomSheet.classList.toggle("fullscreen", height === 100);
};

// Hide the bottom sheet and show body vertical scrollbar
const hideBottomSheet = () => {
  bottomSheet.classList.remove("show");
  document.body.style.overflowY = "auto";
  document.body.classList.remove("bodyfix");
};

// Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
const dragStart = (e) => {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(sheetContent.style.height);
  bottomSheet.classList.add("dragging");
};

// Calculates the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
  if (!isDragging) return;
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  const newHeight = startHeight + (delta / window.innerHeight) * 100;
  updateSheetHeight(newHeight);
};

// Determines whether to hide, set to fullscreen, or set to default
// height based on the current height of the sheet content
const dragStop = () => {
  isDragging = false;
  bottomSheet.classList.remove("dragging");
  const sheetHeight = parseInt(sheetContent.style.height);
  sheetHeight < 25
    ? hideBottomSheet()
    : sheetHeight > 75
    ? updateSheetHeight(100)
    : updateSheetHeight(50);
};

dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

sheetOverlay.addEventListener("click", hideBottomSheet);

//function for message 
function checkAndDisplayError(inputField, errorMessage) {
  var errorDiv = inputField.nextElementSibling; // Assuming the error-message div is the next sibling

  if (!inputField.value.trim()) {
    inputField.classList.add('fieldEmpty'); // Add class to empty field
    errorDiv.textContent = errorMessage; // Display error message
  } else {
    inputField.classList.remove('fieldEmpty'); // Remove class if field is not empty
    errorDiv.textContent = ''; // Clear error message if field is not empty
  }
}

//Function Form data Display
function displayFormData(formData) {
  // Create a template literal with the form values
  var htmlContent = `
    <div>
      <p><strong>Full Name:</strong> ${formData.fullName}</p>
      <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
      <p><strong>Number of Days:</strong> ${formData.days}</p>
      <p><strong>Number of Hours:</strong> ${formData.hours}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
    </div>
  `;

  // Get the element with the class bottom__drawer__details
  var detailsContainer = document.querySelector('.bottom__drawer__details');

  // Append the HTML content to the container
  detailsContainer.innerHTML = htmlContent;
}

// Add event listener to form submission
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the form from submitting normally

  // Check if form fields are not empty
  if (
    fullNameInput.value &&
    phoneNumberInput.value &&
    daysInput.value &&
    hoursInput.value &&
    dateInput.value &&
    addressInput.value
  ) {

    //form Data Save By javascript valuse get for the display of form value
    var formData = {
      fullName: fullNameInput.value,
      phoneNumber: phoneNumberInput.value,
      days: daysInput.value,
      hours: hoursInput.value,
      address: addressInput.value,
    };

   // console.log(formData);

    displayFormData(formData); // dispaly the form value 
    showBottomSheet(); // Show the bottom sheet if fields are not empty
  } else {
    // Display an error message or handle the empty fields as needed
    //alert("Please fill in all the required fields.");
    // Iterate through each input field and add class and error message as needed
  checkAndDisplayError(fullNameInput, 'Full Name is required');
  checkAndDisplayError(phoneNumberInput, 'Phone Number is required');
  checkAndDisplayError(daysInput, 'Number of Days is required');
  checkAndDisplayError(hoursInput, 'Number of Hours is required');
  checkAndDisplayError(dateInput, 'Service start date is required');
  checkAndDisplayError(addressInput, 'Address is required');
  }
});
