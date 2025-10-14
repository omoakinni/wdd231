// Products module - handles product data fetching, filtering, and display
import { getFromStorage, saveToStorage } from './storage.js';

let allProducts = [];
let filteredProducts = [];

// Fetch products from JSON file
export async function loadProducts(type = 'all') {
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const productsContainer = document.getElementById(
        type === 'featured' ? 'featured-products-container' : 'products-container'
    );
    
    if (loadingIndicator) loadingIndicator.style.display = 'block';
    if (errorMessage) errorMessage.classList.add('hidden');
    
    try {
        // Try to fetch from local JSON file
        const response = await fetch('./scripts/data/products.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        allProducts = products;
        
        // Save to localStorage for offline use
        saveToStorage('products', products);
        
        // Display products based on type
        if (type === 'featured') {
            displayFeaturedProducts(products);
        } else {
            displayAllProducts(products);
            filteredProducts = [...products];
        }
        
    } catch (error) {
        console.error('Error loading products:', error);
        
        // Fallback: try to load from localStorage
        const cachedProducts = getFromStorage('products');
        if (cachedProducts && cachedProducts.length > 0) {
            allProducts = cachedProducts;
            
            if (type === 'featured') {
                displayFeaturedProducts(cachedProducts);
            } else {
                displayAllProducts(cachedProducts);
                filteredProducts = [...cachedProducts];
            }
        } else {
            // Show error message
            if (errorMessage) {
                errorMessage.classList.remove('hidden');
            }
        }
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    }
}

// Display featured products on home page
function displayFeaturedProducts(products) {
    const container = document.getElementById('featured-products-container');
    if (!container) return;
    
    // Get first 6 products as featured
    const featuredProducts = products.slice(0, 6);
    
    const productsHTML = featuredProducts.map(product => createProductCard(product)).join('');
    container.innerHTML = productsHTML;
    
    // Add event listeners to product cards
    addProductCardEventListeners();
}

// Display all products on products page
function displayAllProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    const productsHTML = products.map(product => createProductCard(product)).join('');
    container.innerHTML = productsHTML;
    
    // Add event listeners to product cards
    addProductCardEventListeners();
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price}</p>
                <p class="product-material">Material: ${product.material}</p>
                <button class="btn btn-secondary view-details">View Details</button>
            </div>
        </div>
    `;
}

// Add event listeners to product cards
function addProductCardEventListeners() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details');
        viewDetailsBtn.addEventListener('click', () => {
            const productId = card.getAttribute('data-product-id');
            openProductModal(productId);
        });
    });
}

// Initialize product filters
export function initializeProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
}

// Filter products based on selected criteria
function filterProducts() {
    const categoryValue = document.getElementById('category-filter').value;
    const priceValue = document.getElementById('price-filter').value;
    
    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (categoryValue !== 'all' && product.category !== categoryValue) {
            return false;
        }
        
        // Price filter
        if (priceValue !== 'all') {
            const price = product.price;
            
            switch (priceValue) {
                case '0-100':
                    if (price > 100) return false;
                    break;
                case '100-300':
                    if (price < 100 || price > 300) return false;
                    break;
                case '300-500':
                    if (price < 300 || price > 500) return false;
                    break;
                case '500+':
                    if (price < 500) return false;
                    break;
            }
        }
        
        return true;
    });
    
    displayAllProducts(filteredProducts);
}

// Reset all filters
function resetFilters() {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    filteredProducts = [...allProducts];
    displayAllProducts(filteredProducts);
}

// Initialize product modal
export function initializeProductModal() {
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !closeModal) return;
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// Open product modal with details
function openProductModal(productId) {
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-product-details');
    
    if (!modal || !modalContent) return;
    
    const product = allProducts.find(p => p.id === parseInt(productId));
    
    if (!product) return;
    
    modalContent.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-details">
                <h2>${product.name}</h2>
                <p class="modal-product-category">${product.category}</p>
                <p class="modal-product-price">$${product.price}</p>
                <p class="modal-product-material"><strong>Material:</strong> ${product.material}</p>
                <p class="modal-product-dimensions"><strong>Dimensions:</strong> ${product.dimensions}</p>
                <p class="modal-product-description">${product.description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary close-modal-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for modal buttons
    const addToCartBtn = modalContent.querySelector('.add-to-cart');
    const closeModalBtn = modalContent.querySelector('.close-modal-btn');
    
    addToCartBtn.addEventListener('click', () => {
        addToCart(product.id);
        modal.classList.add('hidden');
    });
    
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Show modal
    modal.classList.remove('hidden');
}

// Add product to cart (localStorage)
function addToCart(productId) {
    const cart = getFromStorage('cart') || [];
    const product = allProducts.find(p => p.id === parseInt(productId));
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveToStorage('cart', cart);
    
    // Show confirmation message
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}