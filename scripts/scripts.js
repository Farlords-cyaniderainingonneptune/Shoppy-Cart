const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');


function addNewItem() {
    if(inputBox.value === '') {
        alert("Please enter a list");
    } else {
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
    }
    inputBox.value = '';
    inputBox.focus();
}