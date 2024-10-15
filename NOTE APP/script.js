const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from local storage on page load
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes') || '';
}

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// Display notes on page load
showNotes();

createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "images/delete.png";
    img.style.cursor = "pointer";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage(); // Update storage after adding a new note
});

notesContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage(); // Update storage after deleting a note
    }
});

notesContainer.addEventListener('input', function() {
    updateStorage(); // Update storage whenever the content changes
});

document.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
