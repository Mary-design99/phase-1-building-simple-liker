//Defining text characters for the empty and full hearts.
const EMPTY_HEART = '♡'; // HTML entity for empty heart: &#x2661;
const FULL_HEART = '♥'; // HTML entity for full heart: &#x2665;

// Get references to DOM elements
// Selecting all heart glyphs
const heartGlyphs = document.querySelectorAll('.like-glyph');
// Selecting the modal and its message element
const errorModal = document.getElementById('modal');
const errorMessageElement = document.getElementById('modal-message');

document.body.innerHTML = `
  <div id="modal" class="hidden">
    <h2>Error!</h2>
    <p id="modal-message"></p>
  </div>
  <span class="like-glyph">&#x2661;</span>
  <span class="like-glyph">&#x2661;</span>
`;

/**
 * Displays the error modal with a given message and hides it after 3 seconds.
 * @param {string} message The error message to display.
 */
function showErrorMessage(message) {
  errorMessageElement.textContent = message; // Set the message in the paragraph inside the modal
  errorModal.classList.remove('hidden'); // Show the modal by removing the .hidden class

  setTimeout(() => {
    errorModal.classList.add('hidden'); // Hide the modal after 3 seconds by adding .hidden class
  }, 3000);
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
/**
 * Simulates a server call with a random success/failure.
 * @param {string} url - The URL to simulate calling.
 * @param {object} config - Configuration object (not used in this simulation).
 * @returns {Promise<string>} A promise that resolves with a success message
 * or rejects with an error message.
 */
function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2; // 20% chance of failure
      if (isRandomFailure) {
        reject('Random server error. Try again.');
      } else {
        resolve('Pretend remote server notified of action!');
      }
    }, 300); // 300ms delay
  });
}

// Add event listeners to all heart glyphs
heartGlyphs.forEach((heartGlyph) => {
  heartGlyph.addEventListener('click', () => {
    // Check if it's currently an empty heart
    const isCurrentlyEmpty = heartGlyph.textContent === EMPTY_HEART;

    if (isCurrentlyEmpty) {
      // It's an empty heart, simulate server call
      mimicServerCall()
        .then(() => {
          // Server returned success: Change to full heart and activate
          heartGlyph.textContent = FULL_HEART; // Change character to full heart
          heartGlyph.classList.add('activated-heart'); // Make it red
          console.log(`Heart activated successfully!`);
        })
        .catch((error) => {
          // Server returned failure: Display error modal
          showErrorMessage(error);
          console.error(`Error activating heart:`, error);
        });
    } else {
      // It's a full heart, change back to empty (no server call needed)
      heartGlyph.textContent = EMPTY_HEART; // Change character to empty heart
      heartGlyph.classList.remove('activated-heart'); // Remove red color
      console.log(`Heart deactivated.`);
    }
  });
});
