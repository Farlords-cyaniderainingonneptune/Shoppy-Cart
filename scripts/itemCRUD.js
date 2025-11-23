import { StorageManager } from './localStorage.js';
import { updateItemCounter } from './itemCounter.js';
import { BudgetManager } from './budgetManager.js';

export const ItemCRUD = {
    createItem(itemName, totalPrice, listContainer) {
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
        
        StorageManager.saveItems(listContainer);
        updateItemCounter(listContainer);
        BudgetManager.updateEstimatedTotal(listContainer);
        BudgetManager.updateBudgetDisplay(listContainer);
    },

    editItem(li) {
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
                ItemCRUD.saveEdit(editInput, textSpan, tempPrice, li);
            }
        });
        
        editInput.addEventListener('blur', function() {
            ItemCRUD.saveEdit(editInput, textSpan, tempPrice, li);
        });
    },

    saveEdit(editInput, textSpan, priceSpan, li) {
        let newText = editInput.value.trim();
        
        if(newText === '') {
            newText = editInput.value || 'Item';
        }
        
        textSpan.innerHTML = '';
        
        textSpan.appendChild(document.createTextNode(newText));
        
        textSpan.appendChild(document.createTextNode(' '));
        
        textSpan.appendChild(priceSpan);
        
        li.setAttribute('data-item-name', newText);
        
        const listContainer = document.getElementById('list-container');
        StorageManager.saveItems(listContainer);
    },

    deleteItem(li, listContainer) {
        li.remove();
        StorageManager.saveItems(listContainer);
        updateItemCounter(listContainer);
        BudgetManager.updateEstimatedTotal(listContainer);
        BudgetManager.updateBudgetDisplay(listContainer);
    },

    toggleCheckItem(li, listContainer) {
        li.classList.toggle('checked');
        StorageManager.saveItems(listContainer);
        updateItemCounter(listContainer);
        BudgetManager.updateBudgetDisplay(listContainer);
    }
};