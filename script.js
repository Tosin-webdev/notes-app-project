// Get a reference to the container that holds the notes
const notesContainer = document.querySelector('.notes-container');

// Add an event listener to a button with the class 'btn' to create a new note
document.querySelector('.btn').addEventListener('click', createNewNote);

// Listen for clicks inside the notesContainer and check if the clicked element is an image
notesContainer.addEventListener('click', function (event) {
    if (event.target.tagName === "IMG") {
        // If it's an image, delete the corresponding note
        deleteNote(event.target);
    }
});

// Function to create a new note
function createNewNote() {
    // Create a new paragraph element that can be edited
    const newNote = document.createElement('p');
    newNote.setAttribute('contenteditable', 'true'); // Allow editing
    newNote.className = 'input-box'; // Apply a CSS class
    newNote.innerHTML = '<img src="images/delete.png" alt="">'; // Add a delete button
    notesContainer.appendChild(newNote); // Add the new note to the container

    // Listen for keyup events within the note to update the page
    newNote.addEventListener('keyup', function () {
        updateDOM(); // Call a function to update the page
    });
}

// Function to delete a note
function deleteNote(deleteButton) {
    // Find the parent of the delete button, which is the note itself, and remove it
    const note = deleteButton.parentElement;
    notesContainer.removeChild(note);
    // Update the page after deleting the note
    updateDOM();
}

// Function to update the page with the latest notes
function updateDOM() {
    // Find all the notes with the 'input-box' class
    const notes = document.querySelectorAll('.input-box');

    // Extract the text content from each note and store it in an array
    const notesData = Array.from(notes).map(note => note.textContent.trim());

    // Save the notes to the local storage
    saveNotesToLocalStorage(notesData);
}

// Function to load notes from local storage when the page loads
function loadNotesFromLocalStorage() {
    // Retrieve previously saved notes from local storage
    const notesData = JSON.parse(localStorage.getItem('notes'));

    if (notesData) {
        // If there are saved notes, create notes with their content
        notesData.forEach(function (content) {
            createNewNoteWithContent(content);
        });
    }
}

// Function to create a new note with specific content
function createNewNoteWithContent(content) {
    const newNote = document.createElement('p');
    newNote.setAttribute('contenteditable', 'true');
    newNote.className = 'input-box';
    newNote.innerHTML = '<img src="images/delete.png" alt="">' + content;
    notesContainer.appendChild(newNote);

    newNote.addEventListener('keyup', function () {
        updateDOM();
    });
}

// Function to save notes to local storage
function saveNotesToLocalStorage(notesData) {
    // Store the notes as a JSON string in local storage
    localStorage.setItem('notes', JSON.stringify(notesData));
}

// Load existing notes from local storage when the page loads
loadNotesFromLocalStorage();