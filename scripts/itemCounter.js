// To display our total items, bought items, and unbought items

// Update counter showing bought and unbought items
export function updateItemCounter(listContainer) {
    const allItems = listContainer.querySelectorAll('li');
    const totalItems = allItems.length;
    const boughtItems = listContainer.querySelectorAll('li.checked').length;
    const unboughtItems = totalItems - boughtItems;
    
    let counter = document.getElementById('item-counter');
    let budgetSection = document.getElementById('budget-section');
    
    // Show counter and budget section if items exist
    if (totalItems > 0) {
        // Create counter if it doesn't exist
        if (!counter) {
            counter = document.createElement('p');
            counter.id = 'item-counter';
            counter.className = 'item-counter';
            document.getElementById('shopping-list').appendChild(counter);
        }
        
        // Update counter text
        counter.innerHTML = `Total Bought items = ${boughtItems}<br>Total Unbought items = ${unboughtItems}`;
        
        // Show budget section
        budgetSection.classList.remove('hidden');
    } else {
        // Remove counter and hide budget section if no items
        if (counter) {
            counter.remove();
        }
        budgetSection.classList.add('hidden');
    }
}