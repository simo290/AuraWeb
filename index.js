// Function to get products from LocalStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Function to get ad code from LocalStorage
function getAdCode() {
    return localStorage.getItem('adCode') || '';
}

// Function to render products into #product-grid
function renderProducts() {
    const products = getProducts();
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<p class="text-center text-gray-500">No products available yet. Check back later!</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card bg-gray-800 p-4 rounded-lg shadow-md">
            <img src="${product.image_url}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4">
            <h3 class="text-xl font-bold mb-2">${product.name}</h3>
            <p class="text-gray-300 mb-4">${product.description}</p>
            <a href="${product.affiliate_url}" target="_blank" class="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</a>
        </div>
    `).join('');
}

// Function to inject ad code into #ad-slot
function injectAd() {
    const adCode = getAdCode();
    const adSlot = document.getElementById('ad-slot');
    if (!adSlot) return;

    if (!adCode) {
        adSlot.innerHTML = '<p class="text-center text-gray-500">Ad slot placeholder</p>';
        return;
    }

    adSlot.innerHTML = adCode;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    injectAd();
});
