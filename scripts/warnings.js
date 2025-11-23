export function showWarning(message, duration = 3000) {
    const warningMessage = document.getElementById('warning-message');
    warningMessage.classList.remove('hidden');
    warningMessage.querySelector('p').textContent = message;
    
    setTimeout(function() {
        warningMessage.classList.add('hidden');
    }, duration);
}