const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

//creating budget counter
let counterDisplay = getElementById("item-counter");
if (!counterDisplay){
    document.createElement('div')
    counterDisplay.id = 'item-counter';
    counterDisplay.style.cssText = 'padding: 15px; background: #f8f9fa; border-bottom: 2px solid #e0e0e0; text-align: center; font-weight: 600; color: #333;';
    listContainer.parentElement.insertBefore(counterDisplay, listContainer);
}
//update item counter
function updateCounter() {
    const totalItems = listContainer.querySelectorAll('li').length;
    const checkedItems = listContainer.querySelectorAll('li.checked').length;
    const uncheckedItems = totalItems - checkedItems;
    
    counterDisplay.textContent = `${totalItems} Total Items | ${uncheckedItems} To Buy | ${checkedItems} Bought`;
}
//saving item
const savedItems = localStorage.getItem('savedItem');
        if(savedItems) {
            listContainer.innerHTML = savedItems;
            
        }

updateCounter();

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
        console.log(listContainer)
       
        //save to storage
    
       
        
    }
    inputBox.value = '';
    inputBox.focus();
  localStorage.setItem('savedItem', listContainer.innerHTML)
    updateCounter();    
} 




    
        
        inputBox.value = '';
        inputBox.focus();
    }
}

function editItem(li) {
    let textSpan = li.querySelector('.span-text');
    let oldText = textSpan.textContent;
    
    let newText = prompt('Edit item:', oldText);
    if(newText !== null && newText.trim() !== '') {
        textSpan.textContent = newText.trim();
    }
localStorage.setItem('savedItem', listContainer.innerHTML)
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
inputBox.addEventListener('keyup', function(e){
    if (e.key === 'Enter'){
         addNewItem();
    }
       
});

listContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('edit-icon')) {
        let li = e.target.closest('li');
        editItem(li);
        return;
    }
    
    if(e.target.classList.contains('delete-icon')) {
        let li = e.target.closest('li');
        li.remove();
        updateCounter();
        return; 
        return;
    }

    if(e.target.tagName === 'LI' || e.target.classList.contains('span-text')) {
        let li = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        li.classList.toggle('checked');
        updateCounter();
    }
});
