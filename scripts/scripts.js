const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
//saves items added
const savedItems = localStorage.getItem('savedItem');
        if(savedItems) {
            listContainer.innerHTML = savedItems;
            
        }




function addNewItem() {
    if(inputBox.value === '') {
        alert("Please enter an item");
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
        console.log(listContainer)
       
        //save to storage
    
       
        
    }
    inputBox.value = '';
    inputBox.focus();
  localStorage.setItem('savedItem', listContainer.innerHTML)
        
} 




    

function editItem(li) {
    let textSpan = li.querySelector('.span-text');
    let oldText = textSpan.textContent;
    
    let newText = prompt('Edit item:', oldText);
    if(newText !== null && newText.trim() !== '') {
        textSpan.textContent = newText.trim();
    }
localStorage.setItem('savedItem', listContainer.innerHTML)
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
        return; 
    }
    
    if(e.target.tagName === 'LI' || e.target.classList.contains('span-text')) {
        
        let li = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        
        li.classList.toggle('checked');
    }
});
