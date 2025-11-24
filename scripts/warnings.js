// This displays warning messages to user

// Show warning message for specified duration
export function showWarning(message, duration = 3000) {
    const warningMessage = document.getElementById('warning-message');
    
    // Show warning
    warningMessage.classList.remove('hidden');
    warningMessage.querySelector('p').textContent = message;
    
    // Hide after duration
    setTimeout(function() {
        warningMessage.classList.add('hidden');
    }, duration);
}