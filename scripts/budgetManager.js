// Handles budget, estimated total, and remaining budget calculations

export const BudgetManager = {
    
    // Calculate and update estimated total of all items
    updateEstimatedTotal(listContainer) {
        const allItems = listContainer.querySelectorAll('li');
        let total = 0;
        
        // Sum up all item prices
        allItems.forEach(item => {
            const price = parseFloat(item.getAttribute('data-price')) || 0;
            total += price;
        });
        
        // Update display
        document.getElementById('estimated-total').textContent = total.toFixed(2);
    },

    // Calculate and update remaining budget
    updateBudgetDisplay(listContainer) {
        const remainingAmountSpan = document.getElementById('remaining-amount');
        
        // Exit if element doesn't exist
        if(!remainingAmountSpan) return;
        
        const budget = parseFloat(document.getElementById('budget-amount').textContent) || 0;
        const allItems = listContainer.querySelectorAll('li');
        let spentAmount = 0;
        
        // Calculate total spent (for only checked items)
        allItems.forEach(item => {
            if(item.classList.contains('checked')) {
                const price = parseFloat(item.getAttribute('data-price')) || 0;
                spentAmount += price;
            }
        });
        
        // Calculate remaining budget
        const remainingBudget = budget - spentAmount;
        remainingAmountSpan.textContent = remainingBudget.toFixed(2);
        
        // Change color to red if over budget i.e a warning that user is about to spend beyond their budget
        if(remainingBudget < 0) {
            remainingAmountSpan.style.color = '#ef4444';
        } else {
            remainingAmountSpan.style.color = '#333';
        }
    },

    // Get current budget and estimated total
    checkBudgetExceeded() {
        const budget = parseFloat(document.getElementById('budget-amount').textContent) || 0;
        const currentEstimatedTotal = parseFloat(document.getElementById('estimated-total').textContent) || 0;
        return { budget, currentEstimatedTotal };
    }
};