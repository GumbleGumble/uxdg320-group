// Emotion Storage Logic
// This script handles storing and retrieving emotion data across pages

// Determine which page we're on, and call the appropriate function
document.addEventListener("DOMContentLoaded", function () { // Wait for DOM to load
  const currentPath = window.location.pathname; // Get the current page path, set as variable for if statements
  if (currentPath.includes("/sub-categories/")) {
    setupEmotionSelection();
  } else if (currentPath.includes("/single-emotion.html")) {
    displaySelectedEmotion();
  } else if (currentPath.includes("/journal.html")) {
    setupJournalPage();
  }
});

// - Sets up emotion selection on sub-category pages -
function setupEmotionSelection() {
  document.querySelectorAll(".tile").forEach((tile) => { // Loop through all tiles
    tile.addEventListener("click", function () { // Add click handler to each tile
      // Store emotion data
      const emotionData = {
        name: this.querySelector(".label").textContent,
        definition: this.getAttribute("data-definition"),
        imageSrc: this.querySelector("img").src,
        dialog: this.getAttribute("data-dialog"),
        journalPrompt: this.getAttribute("data-journal-prompt") || `How does feeling this feeling affect you?`
      };
      sessionStorage.setItem("selectedEmotion", JSON.stringify(emotionData)); // Save all that to session storage as a JSON string
    });
  });
}

// - Displays the selected emotion on the single-emotion page -
function displaySelectedEmotion() {
  const emotionData = JSON.parse(sessionStorage.getItem("selectedEmotion")); // Get the emotion data from session storage, parse it from JSON
  if (!emotionData) return; // Keep defaults if no emotion selected to prevent errors
  // - Update page elements -
  document.getElementById("emotion-label").textContent = emotionData.name;
  document.getElementById("definition-text").textContent = emotionData.definition;
  document.getElementById("prompt-text").textContent = emotionData.dialog;

  // - Update emotion image -
  const emotionImg = document.getElementById("emotion-img");
  if (emotionImg) {
    emotionImg.src = emotionData.imageSrc;
    emotionImg.alt = emotionData.name; // Uses emotion name as alt text
    // TODO: This is very lazy alt text, need to come up more descriptive system or manually write alt text for each emotion
  }
  document.title = `MoodShop - ${emotionData.name}`; // Update page title
}

// - Sets up the journal page with the selected emotion -
function setupJournalPage() {
  const emotionData = JSON.parse(sessionStorage.getItem("selectedEmotion")); // Get the emotion data from session storage, parse it from JSON
  if (!emotionData) return; // Keep defaults if no emotion selected to prevent errors
  const journalTextarea = document.querySelector("textarea");
  if (journalTextarea) {
    journalTextarea.placeholder = emotionData.journalPrompt; // Update journal prompt
  }

  // Set current date for journal entry from today's date
  const dateInput = document.getElementById("journal-date");
  if (dateInput) {
    const today = new Date(); // Create new date object (is current date by default)
    dateInput.value = today.toISOString().split("T")[0]; // Converts raw date to YYYY-MM-DD format as expected by HTML date input
  }

  // TODO: Add save to local storage functionality for journal entries
  // TODO: Add load from local storage functionality for journal entries + update archive list logic
}
