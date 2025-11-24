// This is the main application file(more like the powerhouse) that coordinates all the modules

import { StorageManager } from './localStorage.js';
import { updateItemCounter } from './itemCounter.js';
import { BudgetManager } from './budgetManager.js';
import { ItemCRUD } from './itemCRUD.js';
import { Modal } from './modal.js';
import { showWarning } from './warnings.js';

// Get DOM elements
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const budgetAmount = document.getElementById('budget-amount');

// Load saved items on page load
const savedItems = StorageManager.loadItems();
if(savedItems) {
    listContainer.innerHTML = savedItems;
}

// Add new item function
function addNewItem() {
    if(inputBox.value === '') {
        showWarning('Please enter an item');
        inputBox.focus();
    } else {
        Modal.open(inputBox.value);
        inputBox.value = '';
    }
}

// Make functions available globally for onclick
window.addNewItem = addNewItem;
window.closeModal = function() {
    Modal.close();
};
window.confirmAddItem = function() {
    Modal.confirmAddItem(inputBox, listContainer);
};

// Listen for Enter key in main input
inputBox.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        addNewItem();
    }
});

// Listen for Enter key in price input
document.getElementById('price-input').addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        Modal.confirmAddItem(inputBox, listContainer);
    }
});

// Handle item clicks (edit, delete, check/uncheck)
listContainer.addEventListener('click', function(e) {
    // Edit icon clicked
    if(e.target.classList.contains('edit-icon')) {
        let li = e.target.closest('li');
        ItemCRUD.editItem(li);
        return;
    }
    
    // Delete icon clicked
    if(e.target.classList.contains('delete-icon')) {
        let li = e.target.closest('li');
        ItemCRUD.deleteItem(li, listContainer);
        return;
    }
    
    // Item clicked (toggle check)
    if(e.target.tagName === 'LI' || e.target.classList.contains('span-text') || e.target.className === 'item-price') {
        let li = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        ItemCRUD.toggleCheckItem(li, listContainer);
    }
});

// Handle budget input
budgetAmount.addEventListener('keydown', function(e) {
    // Prevent Enter from creating new line
    if(e.key === 'Enter') {
        e.preventDefault();
        budgetAmount.blur();
    }
    
    // Only allow numbers and navigation keys
    if(!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});

// Save budget on input change
budgetAmount.addEventListener('input', function() {
    StorageManager.saveBudget(budgetAmount.textContent);
    BudgetManager.updateBudgetDisplay(listContainer);
});

// Load saved budget on page load
const savedBudget = StorageManager.loadBudget();
if(savedBudget) {
    budgetAmount.textContent = savedBudget;
}

// Initialize app on page load
StorageManager.restorePricesOnLoad(listContainer);
updateItemCounter(listContainer);
BudgetManager.updateEstimatedTotal(listContainer);
BudgetManager.updateBudgetDisplay(listContainer);