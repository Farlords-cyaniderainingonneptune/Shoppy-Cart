// This will handle all localStorage operations for our shoppy cart app

export const StorageManager = {
    
    // Save all items from  the list container(ul) to localStorage
    saveItems(listContainer) {
        localStorage.setItem('savedItem', listContainer.innerHTML);
    },

    // Load saved items from localStorage
    loadItems() {
        return localStorage.getItem('savedItem');
    },

    // Save budget amount to localStorage
    saveBudget(budget) {
        localStorage.setItem('budget', budget);
    },

    // Load saved budget from localStorage
    loadBudget() {
        return localStorage.getItem('budget');
    },

    // Restore price and item name attributes from saved HTML
    restorePricesOnLoad(listContainer) {
        const allItems = listContainer.querySelectorAll('li');
        
        allItems.forEach(item => {
            // Extract price from price span
            const priceSpan = item.querySelector('.item-price');
            if(priceSpan) {
                const priceText = priceSpan.textContent.replace('#', '').trim();
                item.setAttribute('data-price', priceText);
            }
            
            // Extract item name from text span
            const textSpan = item.querySelector('.span-text');
            if(textSpan && textSpan.childNodes[0]) {
                const itemName = textSpan.childNodes[0].textContent.trim();
                item.setAttribute('data-item-name', itemName);
            }
        });
    }
};