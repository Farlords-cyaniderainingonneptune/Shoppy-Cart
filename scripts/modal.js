// This will handle  price and quantity popup modal

import { ItemCRUD } from './itemCRUD.js';
import { showWarning } from './warnings.js';
import { BudgetManager } from './budgetManager.js';

// Store current item name while modal is open
let currentItemName = '';

export const Modal = {
    
    // Open modal for item
    open(itemName) {
        currentItemName = itemName;
        document.getElementById('modal-title').textContent = `Add Details for "${itemName}"`;
        document.getElementById('price-modal').classList.remove('hidden');
        document.getElementById('quantity-input').focus();
    },

    // Close modal and reset inputs
    close() {
        document.getElementById('price-modal').classList.add('hidden');
        document.getElementById('quantity-input').value = '1';
        document.getElementById('price-input').value = '';
    },

    // Confirm and add item with quantity and price
    confirmAddItem(inputBox, listContainer) {
        const quantity = parseFloat(document.getElementById('quantity-input').value) || 1;
        const pricePerItem = parseFloat(document.getElementById('price-input').value) || 0;
        
        // Exit if no item name
        if(!currentItemName) {
            Modal.close();
            currentItemName = '';
            return;
        }
        
        // Calculate total price
        const totalPrice = (quantity * pricePerItem).toFixed(2);
        
        // Check if budget would be exceeded
        const { budget, currentEstimatedTotal } = BudgetManager.checkBudgetExceeded();
        const newEstimatedTotal = currentEstimatedTotal + parseFloat(totalPrice);
        
        // Show warning and don't add if over budget
        if(budget > 0 && newEstimatedTotal > budget) {
            const itemName = currentItemName;
            Modal.close();
            currentItemName = '';
            
            const overBudget = (newEstimatedTotal - budget).toFixed(2);
            showWarning(`Cannot add "${itemName}"! This will exceed your budget by #${overBudget}`, 4000);
            
            inputBox.focus();
            return;
        }
        
        // Add item to list
        const itemName = currentItemName;
        Modal.close();
        currentItemName = '';
        
        ItemCRUD.createItem(itemName, totalPrice, listContainer);
        inputBox.focus();
    }
};