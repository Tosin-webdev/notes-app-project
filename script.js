
const notesContainer = document.querySelector('.notes-container');

document.querySelector('.btn').addEventListener('click', createNewNote);


notesContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "IMG") {
        deleteNote(e.target);
    }
});

function createNewNote() {
    const newNote = document.createElement('p');
    newNote.setAttribute('contenteditable', 'true');
    newNote.className = 'input-box';
    newNote.innerHTML = '<img src="images/delete.png" alt="">';
    notesContainer.appendChild(newNote);

    newNote.addEventListener('keyup', function() {
        updateDOM();
    });
}

function deleteNote(deleteButton) {
    const note = deleteButton.parentElement;
    notesContainer.removeChild(note);
    updateDOM();
}

function updateDOM() {
    const notes = document.querySelectorAll('.input-box');
    const notesData = Array.from(notes).map(note => note.textContent.trim());

    saveNotesToLocalStorage(notesData);
}

function loadNotesFromLocalStorage() {
    const notesData = JSON.parse(localStorage.getItem('notes'));
    if (notesData) {
        notesData.forEach(function(content) {
            createNewNoteWithContent(content);
        });
    }
}

function createNewNoteWithContent(content) {
    const newNote = document.createElement('p');
    newNote.setAttribute('contenteditable', 'true');
    newNote.className = 'input-box';
    newNote.innerHTML = '<img src="images/delete.png" alt="">' + content;
    notesContainer.appendChild(newNote);

    newNote.addEventListener('keyup', function() {
        updateDOM();
    });
}

function saveNotesToLocalStorage(notesData) {
    localStorage.setItem('notes', JSON.stringify(notesData));
}

// Load existing notes from local storage on page load
loadNotesFromLocalStorage();