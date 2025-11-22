const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const warningMessage = document.getElementById('warning-message');

function addNewItem() {
    if(inputBox.value === '') {
        // Show warning message
        warningMessage.classList.remove('hidden');
        
        // Hide warning after 3 seconds
        setTimeout(function() {
            warningMessage.classList.add('hidden');
        }, 3000);
        
        inputBox.focus();
    } else {
        // Hide warning if it's showing
        warningMessage.classList.add('hidden');
        
        let li = document.createElement("li");
        let span = document.createElement('span');
        span.className = 'span-text';
        span.textContent = inputBox.value;
        li.appendChild(span);

        let div = document.createElement('div');
        div.className = 'span-icons';
        div.innerHTML = `
            <img src="./assets/edit.png" alt="Edit" class="edit-icon">
            <img src="./assets/delete.png" alt="Delete" class="delete-icon">
        `;
        
        li.appendChild(div);
        listContainer.appendChild(li);
        
        inputBox.value = '';
        inputBox.focus();
    }
}

function editItem(li) {
    let textSpan = li.querySelector('.span-text');
    let oldText = textSpan.textContent;
    
    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = oldText;
    editInput.className = 'edit-input';
    
    textSpan.replaceWith(editInput);
    editInput.focus();
    editInput.select();
    
    editInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            saveEdit(editInput, li);
        }
    });
    
    editInput.addEventListener('blur', function() {
        saveEdit(editInput, li);
    });
}

function saveEdit(editInput, li) {
    let newText = editInput.value.trim();
    
    let span = document.createElement('span');
    span.className = 'span-text';
    span.textContent = newText !== '' ? newText : editInput.value;
    
    editInput.replaceWith(span);
}

listContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('edit-icon')) {
        let li = e.target.closest('li');
        editItem(li);
        return;
    }
    
    if(e.target.classList.contains('delete-icon')) {
        let li = e.target.closest('li');
        li.remove();
        return;
    }
    
    if(e.target.tagName === 'LI' || e.target.classList.contains('span-text')) {
        let li = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        li.classList.toggle('checked');
    }
});