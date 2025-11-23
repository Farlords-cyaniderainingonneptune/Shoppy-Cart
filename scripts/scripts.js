const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const warningMessage = document.getElementById('warning-message');
const savedItems = localStorage.getItem('savedItem');
if(savedItems) {
    listContainer.innerHTML = savedItems;
}

let currentItemName = '';

function updateItemCounter() {
    const allItems = listContainer.querySelectorAll('li');
    const totalItems = allItems.length;
    const boughtItems = listContainer.querySelectorAll('li.checked').length;
    const unboughtItems = totalItems - boughtItems;
    
    
    let counter = document.getElementById('item-counter');
    let budgetSection = document.getElementById('budget-section');
    
    if (totalItems > 0) {
        if (!counter) {
            counter = document.createElement('p');
            counter.id = 'item-counter';
            counter.className = 'item-counter';
            document.getElementById('shopping-list').appendChild(counter);
        }
        counter.innerHTML = `Total Bought items = ${boughtItems}<br>Total Unbought items = ${unboughtItems}`;
        
        budgetSection.classList.remove('hidden');
    } else {
        if (counter) {
            counter.remove();
        }
        budgetSection.classList.add('hidden');
    }
}

function updateBudgetDisplay() {
    const remainingAmountSpan = document.getElementById('remaining-amount');
    
    if(!remainingAmountSpan) return;
    
    const budget = parseFloat(document.getElementById('budget-amount').textContent) || 0;
    const allItems = listContainer.querySelectorAll('li');
    let spentAmount = 0;
    
    allItems.forEach(item => {
        if(item.classList.contains('checked')) {
            const price = parseFloat(item.getAttribute('data-price')) || 0;
            spentAmount += price;
        }
    });
    
    const remainingBudget = budget - spentAmount;
    
    remainingAmountSpan.textContent = remainingBudget.toFixed(2);
    
    if(remainingBudget < 0) {
        remainingAmountSpan.style.color = '#ef4444';
    } else {
        remainingAmountSpan.style.color = '#333';
    }
}

function addNewItem() {
    if(inputBox.value === '') {
        
        warningMessage.classList.remove('hidden');
        warningMessage.querySelector('p').textContent = 'Please enter an item';
        
        setTimeout(function() {
            warningMessage.classList.add('hidden');
        }, 3000);
        
        inputBox.focus();
    } else {
        warningMessage.classList.add('hidden');
        
        currentItemName = inputBox.value;
        document.getElementById('modal-title').textContent = `Add Details for "${currentItemName}"`;
        document.getElementById('price-modal').classList.remove('hidden');
        
        document.getElementById('quantity-input').focus();
        
        inputBox.value = '';
    }
}

function closeModal() {
    document.getElementById('price-modal').classList.add('hidden');
    
    document.getElementById('quantity-input').value = '1';
    document.getElementById('price-input').value = '';
    
}

function confirmAddItem() {
    const quantity = parseFloat(document.getElementById('quantity-input').value) || 1;
    const pricePerItem = parseFloat(document.getElementById('price-input').value) || 0;
    
    if(!currentItemName) {
        closeModal();
        currentItemName = '';
        return;
    }
    
    
    const totalPrice = (quantity * pricePerItem).toFixed(2);
    
    
    const budget = parseFloat(document.getElementById('budget-amount').textContent) || 0;
    const currentEstimatedTotal = parseFloat(document.getElementById('estimated-total').textContent) || 0;
    const newEstimatedTotal = currentEstimatedTotal + parseFloat(totalPrice);
    

    if(budget > 0 && newEstimatedTotal > budget) {
        
        const itemName = currentItemName;
        closeModal();
        currentItemName = '';
        

        warningMessage.classList.remove('hidden');
        warningMessage.querySelector('p').textContent = `Cannot add "${itemName}"! This will exceed your budget by #${(newEstimatedTotal - budget).toFixed(2)}`;
        
        setTimeout(function() {
            warningMessage.classList.add('hidden');
        }, 4000);
        
        inputBox.focus();
        return;
    }
    
    const itemName = currentItemName;
    
    closeModal();
    
    currentItemName = '';
    
    let li = document.createElement("li");
    
    li.setAttribute('data-price', totalPrice);
    li.setAttribute('data-item-name', itemName);
    
    let span = document.createElement('span');
    span.className = 'span-text';
    
    let itemText = document.createTextNode(itemName);
    span.appendChild(itemText);
    
    span.appendChild(document.createTextNode(' '));
    
    let priceSpan = document.createElement('span');
    priceSpan.className = 'item-price';
    priceSpan.textContent = `#${totalPrice}`;
    span.appendChild(priceSpan);
    
    li.appendChild(span);

    let div = document.createElement('div');
    div.className = 'span-icons';
    div.innerHTML = `
        <img src="./assets/edit.png" alt="Edit" class="edit-icon">
        <img src="./assets/delete.png" alt="Delete" class="delete-icon">
    `;
    
    li.appendChild(div);
    listContainer.appendChild(li);
    
    localStorage.setItem('savedItem', listContainer.innerHTML);
    updateItemCounter();
    updateEstimatedTotal();
    updateBudgetDisplay();
    
    inputBox.focus();
}

function updateEstimatedTotal() {
    const allItems = listContainer.querySelectorAll('li');
    let total = 0;
    
    allItems.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price')) || 0;
        total += price;
    });
    
    document.getElementById('estimated-total').textContent = total.toFixed(2);
}

inputBox.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        addNewItem();
    }
});

document.getElementById('price-input').addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        confirmAddItem();
    }
});

function editItem(li) {
    let textSpan = li.querySelector('.span-text');
    let priceSpan = textSpan.querySelector('.item-price');
    
    let currentText = textSpan.childNodes[0].textContent.trim();
    
    let tempPrice = priceSpan.cloneNode(true);
    
    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.className = 'edit-input';
    
    textSpan.innerHTML = '';
    textSpan.appendChild(editInput);
    
    editInput.focus();
    editInput.select();
    
    editInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            saveEdit(editInput, textSpan, tempPrice, li);
        }
    });
    
    editInput.addEventListener('blur', function() {
        saveEdit(editInput, textSpan, tempPrice, li);
    });
}

function saveEdit(editInput, textSpan, priceSpan, li) {
    let newText = editInput.value.trim();
    
    if(newText === '') {
        newText = editInput.value || 'Item';
    }
    
    textSpan.innerHTML = '';
    
    textSpan.appendChild(document.createTextNode(newText));
    
    textSpan.appendChild(document.createTextNode(' '));
    
    textSpan.appendChild(priceSpan);
    
    li.setAttribute('data-item-name', newText);
    
    localStorage.setItem('savedItem', listContainer.innerHTML);
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
        localStorage.setItem('savedItem', listContainer.innerHTML);
        updateItemCounter();
        updateEstimatedTotal();
        updateBudgetDisplay();
        return;
    }
    
    if(e.target.tagName === 'LI' || e.target.classList.contains('span-text') || e.target.className === 'item-price') {
        let li = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        li.classList.toggle('checked');
        localStorage.setItem('savedItem', listContainer.innerHTML);
        updateItemCounter();
        updateBudgetDisplay();
    }
});

const budgetAmount = document.getElementById('budget-amount');

budgetAmount.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        budgetAmount.blur();
    }
    
    if(!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});

budgetAmount.addEventListener('input', function() {
    localStorage.setItem('budget', budgetAmount.textContent);
    updateBudgetDisplay(); 
});

const savedBudget = localStorage.getItem('budget');
if(savedBudget) {
    budgetAmount.textContent = savedBudget;
}

function restorePricesOnLoad() {
    const allItems = listContainer.querySelectorAll('li');
    allItems.forEach(item => {
        const priceSpan = item.querySelector('.item-price');
        if(priceSpan) {
            const priceText = priceSpan.textContent.replace('#', '').trim();
            item.setAttribute('data-price', priceText);
        }
        
        const textSpan = item.querySelector('.span-text');
        if(textSpan && textSpan.childNodes[0]) {
            const itemName = textSpan.childNodes[0].textContent.trim();
            item.setAttribute('data-item-name', itemName);
        }
    });
}

restorePricesOnLoad();
updateItemCounter();
updateEstimatedTotal();
updateBudgetDisplay();