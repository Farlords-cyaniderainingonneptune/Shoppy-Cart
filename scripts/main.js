import { StorageManager } from './localStorage.js';
import { updateItemCounter } from './itemCounter.js';
import { BudgetManager } from './budgetManager.js';
import { ItemCRUD } from './itemCRUD.js';
import { Modal } from './modal.js';
import { showWarning } from './warnings.js';

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const budgetAmount = document.getElementById('budget-amount');

const savedItems = StorageManager.loadItems();
if(savedItems) {
    listContainer.innerHTML = savedItems;
}

function addNewItem() {
    if(inputBox.value === '') {
        showWarning('Please enter an item');
        inputBox.focus();
    } else {
        Modal.open(inputBox.value);
        inputBox.value = '';
    }
}

window.addNewItem = addNewItem;

window.closeModal = function() {
    Modal.close();
};

window.confirmAddItem = function() {
    Modal.confirmAddItem(inputBox, listContainer);
};

inputBox.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        addNewItem();
    }
});

document.getElementById('price-input').addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        Modal.confirmAddItem(inputBox, listContainer);
    }
});

listContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('edit-icon')) {
        let li = e.target.closest('li');
        ItemCRUD.editItem(li);
        return;
    }
    
    if(e.target.classList.contains('delete-icon')) {
        let li = e.target.closest('li');
        ItemCRUD.deleteItem(li, listContainer);
        return;
    }
    
    if(e.target.tagName === 'LI' || e.target.classList.contains('span-text') || e.target.className === 'item-price') {
        let li = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        ItemCRUD.toggleCheckItem(li, listContainer);
    }
});

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
    StorageManager.saveBudget(budgetAmount.textContent);
    BudgetManager.updateBudgetDisplay(listContainer);
});

const savedBudget = StorageManager.loadBudget();
if(savedBudget) {
    budgetAmount.textContent = savedBudget;
}

StorageManager.restorePricesOnLoad(listContainer);
updateItemCounter(listContainer);
BudgetManager.updateEstimatedTotal(listContainer);
BudgetManager.updateBudgetDisplay(listContainer);