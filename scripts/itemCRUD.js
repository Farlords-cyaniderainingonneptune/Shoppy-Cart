// CRUD- Create, Read, Update, Delete operations for items

import { StorageManager } from './localStorage.js';
import { updateItemCounter } from './itemCounter.js';
import { BudgetManager } from './budgetManager.js';

export const ItemCRUD = {
    
    // Create new item and add to list
    createItem(itemName, totalPrice, listContainer) {
        let li = document.createElement("li");
        
        // Store price and name as data attributes
        li.setAttribute('data-price', totalPrice);
        li.setAttribute('data-item-name', itemName);
        
        // Create span for item text
        let span = document.createElement('span');
        span.className = 'span-text';
        
        // Add item name
        let itemText = document.createTextNode(itemName);
        span.appendChild(itemText);
        span.appendChild(document.createTextNode(' '));
        
        // Add price span
        let priceSpan = document.createElement('span');
        priceSpan.className = 'item-price';
        priceSpan.textContent = `#${totalPrice}`;
        span.appendChild(priceSpan);
        
        li.appendChild(span);

        // Add edit and delete icons
        let div = document.createElement('div');
        div.className = 'span-icons';
        div.innerHTML = `
            <img src="./assets/edit.png" alt="Edit" class="edit-icon">
            <img src="./assets/delete.png" alt="Delete" class="delete-icon">
        `;
        
        li.appendChild(div);
        listContainer.appendChild(li);
        
        // Save and update displays
        StorageManager.saveItems(listContainer);
        updateItemCounter(listContainer);
        BudgetManager.updateEstimatedTotal(listContainer);
        BudgetManager.updateBudgetDisplay(listContainer);
    },

    // Enable editing mode for item name
    editItem(li) {
        let textSpan = li.querySelector('.span-text');
        let priceSpan = textSpan.querySelector('.item-price');
        
        // Get current item name
        let currentText = textSpan.childNodes[0].textContent.trim();
        
        // Save price span to restore later
        let tempPrice = priceSpan.cloneNode(true);
        
        // Create input for editing
        let editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.className = 'edit-input';
        
        // Replace text with input
        textSpan.innerHTML = '';
        textSpan.appendChild(editInput);
        
        editInput.focus();
        editInput.select();
        
        // Save on Enter key
        editInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                ItemCRUD.saveEdit(editInput, textSpan, tempPrice, li);
            }
        });
        
        // Save on blur (losing focus)
        editInput.addEventListener('blur', function() {
            ItemCRUD.saveEdit(editInput, textSpan, tempPrice, li);
        });
    },

    // Save edited item name
    saveEdit(editInput, textSpan, priceSpan, li) {
        let newText = editInput.value.trim();
        
        // Use default if empty
        if(newText === '') {
            newText = editInput.value || 'Item';
        }
        
        // Rebuild span with new name and price
        textSpan.innerHTML = '';
        textSpan.appendChild(document.createTextNode(newText));
        textSpan.appendChild(document.createTextNode(' '));
        textSpan.appendChild(priceSpan);
        
        // Update data attribute
        li.setAttribute('data-item-name', newText);
        
        const listContainer = document.getElementById('list-container');
        StorageManager.saveItems(listContainer);
    },

    // Delete item from list
    deleteItem(li, listContainer) {
        li.remove();
        StorageManager.saveItems(listContainer);
        updateItemCounter(listContainer);
        BudgetManager.updateEstimatedTotal(listContainer);
        BudgetManager.updateBudgetDisplay(listContainer);
    },

    // Toggle checked/unchecked state
    toggleCheckItem(li, listContainer) {
        li.classList.toggle('checked');
        StorageManager.saveItems(listContainer);
        updateItemCounter(listContainer);
        BudgetManager.updateBudgetDisplay(listContainer);
    }
};