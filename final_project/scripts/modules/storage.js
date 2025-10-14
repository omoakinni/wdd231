// Storage module - handles localStorage operations
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

export function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

export function initializeLocalStorage() {
    // Initialize default values if not present
    if (!getFromStorage('theme')) {
        saveToStorage('theme', 'light');
    }
    
    if (!getFromStorage('cart')) {
        saveToStorage('cart', []);
    }
    
    // Apply saved theme
    applyTheme(getFromStorage('theme'));
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}