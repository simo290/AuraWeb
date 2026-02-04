const PASSWORD = 'Yasmine 2107';

// Function to get products from LocalStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Function to save products to LocalStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to get ad code from LocalStorage
function getAdCode() {
    return localStorage.getItem('adCode') || '';
}

// Function to save ad code to LocalStorage
function saveAdCode(adCode) {
    localStorage.setItem('adCode', adCode);
}

// Function to update product count in stats
function updateStats() {
    const products = getProducts();
    document.getElementById('product-count').textContent = products.length;
}

// Function to render product list in admin
function renderProductList() {
    const products = getProducts();
    const list = document.getElementById('product-list');
    if (!list) return;

    list.innerHTML = products.map(product => `
        <li class="flex justify-between items-center p-2 border-b">
            <span>${product.name} (ID: ${product.id})</span>
            <button onclick="deleteProduct(${product.id})" class="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
        </li>
    `).join('');
}

// Function to add a new product
function addProduct(name, imageUrl, affiliateUrl, description) {
    const products = getProducts();
    const newProduct = {
        id: Date.now(),  // Unique ID
        name,
        image_url: imageUrl,
        affiliate_url: affiliateUrl,
        description
    };
    products.push(newProduct);
    saveProducts(products);
    renderProductList();
    updateStats();
}

// Function to delete a product by ID
function deleteProduct(id) {
    const products = getProducts().filter(product => product.id !== id);
    saveProducts(products);
    renderProductList();
    updateStats();
}

// Function to update ad code
function updateAdCode(adCode) {
    saveAdCode(adCode);
    alert('Ad code updated!');
}

// Authentication logic
function checkPassword() {
    const input = document.getElementById('password-input').value;
    if (input === PASSWORD) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        renderProductList();
        updateStats();
    } else {
        alert('Incorrect password');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Login button
    document.getElementById('login-btn').addEventListener('click', checkPassword);

    // Add product form
    document.getElementById('add-product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const imageUrl = document.getElementById('product-image-url').value;
        const affiliateUrl = document.getElementById('product-affiliate-url').value;
        const description = document.getElementById('product-description').value;
        addProduct(name, imageUrl, affiliateUrl, description);
        e.target.reset();
    });

    // Ad code form
    document.getElementById('ad-code-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const adCode = document.getElementById('ad-code-input').value;
        updateAdCode(adCode);
        e.target.reset();
    });
});
