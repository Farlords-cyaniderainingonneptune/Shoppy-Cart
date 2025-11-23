export const StorageManager = {
    saveItems(listContainer) {
        localStorage.setItem('savedItem', listContainer.innerHTML);
    },

    loadItems() {
        return localStorage.getItem('savedItem');
    },

    saveBudget(budget) {
        localStorage.setItem('budget', budget);
    },

    loadBudget() {
        return localStorage.getItem('budget');
    },

    restorePricesOnLoad(listContainer) {
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
};