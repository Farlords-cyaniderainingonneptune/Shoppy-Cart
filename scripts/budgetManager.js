export const BudgetManager = {
    updateEstimatedTotal(listContainer) {
        const allItems = listContainer.querySelectorAll('li');
        let total = 0;
        
        allItems.forEach(item => {
            const price = parseFloat(item.getAttribute('data-price')) || 0;
            total += price;
        });
        
        document.getElementById('estimated-total').textContent = total.toFixed(2);
    },

    updateBudgetDisplay(listContainer) {
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
    },

    checkBudgetExceeded() {
        const budget = parseFloat(document.getElementById('budget-amount').textContent) || 0;
        const currentEstimatedTotal = parseFloat(document.getElementById('estimated-total').textContent) || 0;
        return { budget, currentEstimatedTotal };
    }
};