import { ItemCRUD } from './itemCRUD.js';
import { showWarning } from './warnings.js';
import { BudgetManager } from './budgetManager.js';

let currentItemName = '';

export const Modal = {
    open(itemName) {
        currentItemName = itemName;
        document.getElementById('modal-title').textContent = `Add Details for "${itemName}"`;
        document.getElementById('price-modal').classList.remove('hidden');
        document.getElementById('quantity-input').focus();
    },

    close() {
        document.getElementById('price-modal').classList.add('hidden');
        document.getElementById('quantity-input').value = '1';
        document.getElementById('price-input').value = '';
    },

    confirmAddItem(inputBox, listContainer) {
        const quantity = parseFloat(document.getElementById('quantity-input').value) || 1;
        const pricePerItem = parseFloat(document.getElementById('price-input').value) || 0;
        
        if(!currentItemName) {
            Modal.close();
            currentItemName = '';
            return;
        }
        
        const totalPrice = (quantity * pricePerItem).toFixed(2);
        
        const { budget, currentEstimatedTotal } = BudgetManager.checkBudgetExceeded();
        const newEstimatedTotal = currentEstimatedTotal + parseFloat(totalPrice);
        
        if(budget > 0 && newEstimatedTotal > budget) {
            const itemName = currentItemName;
            Modal.close();
            currentItemName = '';
            
            showWarning(`Cannot add "${itemName}"! This will exceed your budget by #${(newEstimatedTotal - budget).toFixed(2)}`, 4000);
            
            inputBox.focus();
            return;
        }
        
        const itemName = currentItemName;
        
        Modal.close();
        
        currentItemName = '';
        
        ItemCRUD.createItem(itemName, totalPrice, listContainer);
        
        inputBox.focus();
    }
};