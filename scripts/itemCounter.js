export function updateItemCounter(listContainer) {
    const allItems = listContainer.querySelectorAll('li');
    const totalItems = allItems.length;
    const boughtItems = listContainer.querySelectorAll('li.checked').length;
    const unboughtItems = totalItems - boughtItems;
    
    let counter = document.getElementById('item-counter');
    let budgetSection = document.getElementById('budget-section');
    
    if (totalItems > 0) {
        if (!counter) {
            counter = document.createElement('p');
            counter.id = 'item-counter';
            counter.className = 'item-counter';
            document.getElementById('shopping-list').appendChild(counter);
        }
        counter.innerHTML = `Total Bought items = ${boughtItems}<br>Total Unbought items = ${unboughtItems}`;
        
        budgetSection.classList.remove('hidden');
    } else {
        if (counter) {
            counter.remove();
        }
        budgetSection.classList.add('hidden');
    }
}