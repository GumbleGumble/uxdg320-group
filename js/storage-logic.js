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
        dialog: this.getAttribute("data-dialog") || `How does feeling this feeling affect you?`,
        journalPrompt: this.getAttribute("data-journal-prompt") || `How does feeling this feeling affect you?`
      };
      sessionStorage.setItem("selectedEmotion", JSON.stringify(emotionData)); // Save all that to session storage as a JSON string
    });
  });
}

// - Displays the selected emotion on the single-emotion page -
function displaySelectedEmotion() {
  const emotionData = JSON.parse(sessionStorage.getItem("selectedEmotion")); // Get the emotion data from session storage, parse it from JSON
  if (!emotionData) {
    document.getElementById("emotion-label").textContent = "No emotion selected";
    document.getElementById("definition-text").textContent = "Please return to the category page and select an emotion.";
    return;
  }
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

// --- Journal Functionality --- 

// - Sets up the journal page: loads emotion prompt, sets date, adds save listener, displays archive -
function setupJournalPage() {
  const emotionData = JSON.parse(sessionStorage.getItem("selectedEmotion")); // Get current emotion from session storage
  const journalTextarea = document.getElementById("journal-text"); // Get the main text area
  const dateInput = document.getElementById("journal-date"); // Get the date input field
  const saveBtn = document.getElementById("save-journal-entry"); // Get the save button
  // Set placeholder text for the journal entry area
  // Only override HTML placeholder if there's a specific emotion prompt from sessionStorage
  if (journalTextarea && emotionData && emotionData.journalPrompt) { 
    journalTextarea.placeholder = emotionData.journalPrompt; 
  }
  // Set the date input to today's date in YYYY-MM-DD format
  if (dateInput) { 
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  if (saveBtn) { 
    saveBtn.addEventListener("click", saveJournalEntry); // Call saveJournalEntry when clicked
  }
  displayArchivedJournalEntries(); // Load and display any existing journal entries from archive
}

// - Saves the current journal entry to localStorage -
function saveJournalEntry() {
  const selectedEmotion = JSON.parse(sessionStorage.getItem("selectedEmotion")); // Get current emotion
  const journalDateStr = document.getElementById("journal-date").value; // Get date string (YYYY-MM-DD) from input
  const journalText = document.getElementById("journal-text").value; // Get text from text area

  // Prevent saving empty entries
  if (!journalText.trim()) {
    alert("Please write something in your journal entry before saving.");
    return;
  }
  const entryTimestampISO = new Date(`${journalDateStr}T${new Date().toTimeString().split(' ')[0]}`).toISOString();

  // Create the new journal entry object
  const newEntry = {
    id: Date.now().toString(), // Unique ID based on current timestamp (milliseconds since epoch)
    entryTimestamp: entryTimestampISO, // Store combined date and time as a single ISO string
    emotionName: selectedEmotion ? selectedEmotion.name : "General Entry", // Emotion name or 'General Entry'
    emotionId: selectedEmotion ? selectedEmotion.name : null, // Emotion ID (using name here as per previous logic)
    text: journalText, // The journal text itself
  };
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || []; // Retrieve existing entries or initialize empty array
  entries.push(newEntry); // Add the new entry to the array
  localStorage.setItem("journalEntries", JSON.stringify(entries)); // Save the updated array back to localStorage
  displayArchivedJournalEntries(); // Refresh the displayed list of archived entries
  document.getElementById("journal-text").value = ""; // Clear the textarea after saving
  alert("Journal entry saved!"); // Confirmation message
}

// - Displays archived journal entries in the .archive-list element -
function displayArchivedJournalEntries() {
  const archiveListDiv = document.querySelector(".archive-list"); // Get the container for archive list
  if (!archiveListDiv) return; // Exit if container not found
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || []; // Get entries or empty array
  archiveListDiv.innerHTML = ""; // Always clear the list first
  if (entries.length === 0) { // If no entries, display the default message
    archiveListDiv.innerHTML = '<div class="empty-archive-message">No journal entries yet.</div>';
  } else {
    // Sort entries by timestamp, newest first (ISO 8601 strings sort chronologically)
    entries.sort((a, b) => b.entryTimestamp.localeCompare(a.entryTimestamp));
    // Loop through each entry and create its HTML representation
    entries.forEach(entry => {
      const entryWrapper = document.createElement("div"); // Create a wrapper for the entry and delete button
      entryWrapper.classList.add('archive-entry-wrapper'); // Apply CSS class for wrapper styling
      const entryDiv = document.createElement("div"); // Div to display entry info
      entryDiv.classList.add('archive-entry-item'); // Apply CSS class for item styling
      // Create a Date object from the stored ISO timestamp
      const entryDateTime = new Date(entry.entryTimestamp);
      // Format date and time for display using browser's locale settings
      const displayDate = entryDateTime.toLocaleDateString('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' });
      const displayTime = entryDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      entryDiv.textContent = `${entry.emotionName} - ${displayDate} [${displayTime}]`; // Set text content
      entryDiv.setAttribute("data-entry-id", entry.id); // Store entry ID for loading
      entryDiv.addEventListener("click", () => loadJournalEntryForViewing(entry.id)); // Add click listener to load entry

      const deleteBtn = document.createElement("span"); // Create a span to act as delete button
      deleteBtn.classList.add('archive-entry-delete-btn'); // Apply CSS class for delete button styling
      deleteBtn.textContent = "❌"; // Use an emoji for the delete button
      deleteBtn.setAttribute("title", "Delete entry"); // Tooltip for accessibility
      deleteBtn.addEventListener("click", (event) => {
        deleteJournalEntry(entry.id);
      });
      entryWrapper.appendChild(entryDiv);
      entryWrapper.appendChild(deleteBtn);
      archiveListDiv.appendChild(entryWrapper); // Add the complete entry item to the list
    });
  }
}

// - Loads a specific journal entry into the main editor view -
function loadJournalEntryForViewing(entryId) {
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || []; // Get all entries
  const entryToLoad = entries.find(entry => entry.id === entryId); // Find the specific entry by its ID

  const journalDateInput = document.getElementById("journal-date"); // Get date input
  const journalTextInput = document.getElementById("journal-text"); // Get text area

  // If entry is found and editor elements exist, populate them
  if (entryToLoad && journalDateInput && journalTextInput) {
    journalDateInput.value = entryToLoad.entryTimestamp.split('T')[0]; // Extract YYYY-MM-DD for date input
    journalTextInput.value = entryToLoad.text; // Set text area to entry's text
    
    // Provide feedback that entry was loaded
    const loadedDate = new Date(entryToLoad.entryTimestamp);
    alert(`Loaded entry: ${entryToLoad.emotionName} from ${loadedDate.toLocaleDateString()}`);
  } else {
    alert("Error: Could not find the journal entry or journal editor elements are missing.");
  }
}

// - Deletes a specific journal entry from localStorage -
function deleteJournalEntry(entryId) {
  if (!confirm("Are you sure you want to delete this journal entry?")) { // Confirm before deleting
    return; // Do nothing if user cancels
  }

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || []; // Get all entries
  entries = entries.filter(entry => entry.id !== entryId); // Filter out the entry to be deleted
  localStorage.setItem("journalEntries", JSON.stringify(entries)); // Save the modified list

  displayArchivedJournalEntries(); // Refresh the displayed archive list
  alert("Journal entry deleted."); // Confirmation message
}