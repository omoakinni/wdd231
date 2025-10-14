// Main JavaScript file - imports modules and initializes the application
import { initializeNavigation } from './modules/navigation.js';
import { loadProducts, initializeProductFilters, initializeProductModal } from './modules/products.js';
import { initializeContactForm } from './modules/forms.js';
import { initializeLocalStorage } from './modules/storage.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation (hamburger menu)
    initializeNavigation();
    
    // Initialize local storage for user preferences
    initializeLocalStorage();
    
    // Check current page and initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Home page - load featured products
        loadProducts('featured');
    } else if (currentPage === 'products.html') {
        // Products page - load all products and initialize filters
        loadProducts('all');
        initializeProductFilters();
        initializeProductModal();
    } else if (currentPage === 'contact.html') {
        // Contact page - initialize form handling
        initializeContactForm();
    }
    
    console.log('AIE Interiors website initialized successfully');
});