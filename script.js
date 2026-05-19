// Celeste Jewels - E-commerce Website JavaScript

// AOS helpers
function initAOS() {
    if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
}

function refreshAOS() {
    if (typeof AOS !== 'undefined' && AOS) {
        if (typeof AOS.refreshHard === 'function') {
            AOS.refreshHard();
        } else if (typeof AOS.refresh === 'function') {
            AOS.refresh();
        }
    }
}

// Refined Products Data with High-Quality Unsplash Images
const products = [
    // Women - Jewellery
    { id: 1, name: "Sapphire Diamond Necklace", category: "Women", subcategory: "Jewellery", price: 18500, image: "https://i.pinimg.com/736x/06/a6/f0/06a6f0cb0d611ae99869e565c1e9fa3d.jpg" },
    { id: 2, name: "Pearl Drop Earrings", category: "Women", subcategory: "Jewellery", price: 7500, image: "https://i.pinimg.com/1200x/10/bb/ad/10bbad5751b0d7378a324b93763a976d.jpg" },
    { id: 3, name: "Rose Gold Bracelet", category: "Women", subcategory: "Jewellery", price: 12000, image: "https://i.pinimg.com/736x/de/be/4b/debe4b5b7f47446dbd27f54a6fbd834c.jpg" },
    { id: 4, name: "Emerald Cut Ring", category: "Women", subcategory: "Jewellery", price: 15500, image: "https://i.pinimg.com/736x/3f/39/87/3f39875a3e58ac28d09ad8f4a7a01f45.jpg" },
    { id: 5, name: "Silver Tennis Bracelet", category: "Women", subcategory: "Jewellery", price: 10500, image: "https://i.pinimg.com/736x/e0/24/ff/e024ffcc2015f9184ec84330f1ed1864.jpg" },
    { id: 6, name: "Gold Hoop Earrings", category: "Women", subcategory: "Jewellery", price: 6800, image: "https://i.pinimg.com/1200x/44/c5/35/44c535259663d6ba2691880889fee209.jpg" },

    // Women - Watches
    { id: 7, name: "Rose Gold Elegance Watch", category: "Women", subcategory: "Watches", price: 24000, image: "https://i.pinimg.com/736x/40/cc/e8/40cce816ded0b2c8208983a1ef5d0fd8.jpg" },
    { id: 8, name: "Classic Silver Timepiece", category: "Women", subcategory: "Watches", price: 21500, image: "https://i.pinimg.com/1200x/e4/ee/c1/e4eec12b9d68d7a89d1567adad604ed8.jpg" },
    { id: 9, name: "Diamond Bezel Watch", category: "Women", subcategory: "Watches", price: 32000, image: "https://i.pinimg.com/736x/0b/ca/fb/0bcafb64fc34fe5e0b93340c72e321e1.jpg" },

    // Men - Jewellery
    { id: 10, name: "Silver Chain Necklace", category: "Men", subcategory: "Jewellery", price: 8500, image: "https://i.pinimg.com/736x/43/f3/9d/43f39d3af38e26b0305232c9a09d4f0a.jpg" },
    { id: 11, name: "Black Onyx Signet Ring", category: "Men", subcategory: "Jewellery", price: 11000, image: "https://i.pinimg.com/1200x/e6/1a/1d/e61a1dddbe019671e4395020fcfc9ce0.jpg" },
    { id: 12, name: "Leather & Steel Bracelet", category: "Men", subcategory: "Jewellery", price: 6500, image: "https://i.pinimg.com/1200x/c8/3a/83/c83a83397ad665d10bd57b25b2c6ec58.jpg" },
    
    // Men - Watches
    { id: 13, name: "Luxury Chronograph", category: "Men", subcategory: "Watches", price: 28000, image: "https://i.pinimg.com/1200x/34/64/e9/3464e9c18fac0377ef9d531266b3428a.jpg" },
    { id: 14, name: "Minimalist Leather Watch", category: "Men", subcategory: "Watches", price: 19500, image: "https://i.pinimg.com/736x/e4/b8/a6/e4b8a6f18e9c8e9491a0154e76f2df37.jpg" },
    { id: 15, name: "Automatic Steel Watch", category: "Men", subcategory: "Watches", price: 34000, image: "https://i.pinimg.com/1200x/70/b6/8c/70b68c2e8360c4900a820523f0cc5f1e.jpg" },
    { id: 16, name: "Sport Diver Watch", category: "Men", subcategory: "Watches", price: 26500, image: "https://i.pinimg.com/736x/95/5b/d7/955bd7f6f87d5062cff7b22af0ef1a8a.jpg" }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Page specific functions
    if (document.body.classList.contains('home-page')) {
        loadFeaturedProducts();
        loadFeaturedCategories();
    } else if (document.body.classList.contains('products-page')) {
        loadProducts();
        setupFilters();
        setupSearch();
    } else if (document.body.classList.contains('category-page')) {
        loadProducts();
        setupFilters();
        setupCategoryFilters();
    } else if (document.body.classList.contains('cart-page')) {
        loadCart();
    } else if (document.body.classList.contains('contact-page')) {
        setupContactForm();
    }

    // Initialize AOS after page-specific content is loaded
    initAOS();

    // Update cart count
    updateCartCount();

    // Navbar search
    const navbarSearchInput = document.getElementById('navbar-search');
    if (navbarSearchInput) {
        navbarSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
});

// Load Featured Products on Home Page
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (!featuredProductsContainer) return;

    // Pick a mix of top items
    const featuredIds = [1, 13, 7, 4, 15, 2];
    const featuredProducts = products.filter(p => featuredIds.includes(p.id));
    
    featuredProductsContainer.innerHTML = '';

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsContainer.appendChild(productCard);
    });

    refreshAOS();
}

// Load Featured Categories on Home Page
function loadFeaturedCategories() {
    const categories = [
        { name: "Women's Jewellery", link: "women", sub: "Jewellery", image: 'https://i.pinimg.com/736x/63/77/8c/63778ca6c6f38b4f733f06a14c3435ec.jpg', desc: 'Elegant rings, necklaces, and bracelets.' },
        { name: "Women's Watches", link: "women", sub: "Watches", image: 'https://i.pinimg.com/736x/71/de/52/71de521267d9ae34d9699033c1d7589f.jpg', desc: 'Timeless pieces for every occasion.' },
        { name: "Men's Watches", link: "men", sub: "Watches", image: 'https://i.pinimg.com/736x/bb/ef/7d/bbef7d3646f9e1f32c8fe5b7ef6a7069.jpg', desc: 'Luxury automatic watches.' }
    ];

    const featuredCategoriesContainer = document.getElementById('featured-categories');
    if (!featuredCategoriesContainer) return;

    featuredCategoriesContainer.innerHTML = '';

    categories.forEach((category, index) => {
        const delay = index * 100;
        const categoryCard = document.createElement('div');
        categoryCard.className = 'col-md-4 mb-4';
        categoryCard.innerHTML = `
            <div class="category-card" data-aos="fade-up" data-aos-delay="${delay}">
                <img src="${category.image}" alt="${category.name}">
                <div class="card-body">
                    <h5>${category.name}</h5>
                    <p>${category.desc}</p>
                    <a href="category.html?category=${category.link}&subcategory=${category.sub}" class="btn btn-primary">Explore</a>
                </div>
            </div>
        `;
        featuredCategoriesContainer.appendChild(categoryCard);
    });

    refreshAOS();
}

// Create Product Card
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.innerHTML = `
        <div class="product-card" data-aos="fade-up">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <h5>${product.name}</h5>
                <p class="text-muted small">${product.category} - ${product.subcategory}</p>
                <p class="price">Rs. ${product.price.toFixed(2)}</p>
                <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
    return col;
}

// Load Products on Products Page
function loadProducts(filteredProducts = products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    if(filteredProducts.length === 0) {
        productsContainer.innerHTML = '<div class="col-12 text-center py-5"><h4>No products found matching your criteria.</h4></div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });

    refreshAOS();
}

// Setup Filters
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const subcategoryFilter = document.getElementById('subcategory-filter');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }

    if (subcategoryFilter) {
        subcategoryFilter.addEventListener('change', filterProducts);
    }
}

// Filter Products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const subcategoryFilter = document.getElementById('subcategory-filter');
    const searchInput = document.getElementById('search-input');

    let filtered = products;

    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.subcategory.toLowerCase().includes(searchTerm)
        );
    }

    if (categoryFilter && categoryFilter.value) {
        filtered = filtered.filter(product => product.category.toLowerCase() === categoryFilter.value.toLowerCase());
    }

    if (subcategoryFilter && subcategoryFilter.value) {
        filtered = filtered.filter(product => product.subcategory.toLowerCase() === subcategoryFilter.value.toLowerCase());
    }

    loadProducts(filtered);
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        filterProducts();
    });

    // Check for URL search param
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchInput.value = searchParam;
        filterProducts();
    }
}

// Setup Category Filters logic for category.html
function setupCategoryFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    
    if (category || subcategory) {
        const categoryFilter = document.getElementById('category-filter');
        const subcategoryFilter = document.getElementById('subcategory-filter');

        let filtered = products;
        
        if (category) {
            if(categoryFilter) categoryFilter.value = category.charAt(0).toUpperCase() + category.slice(1);
            filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase());
        }
        
        if (subcategory) {
            if(subcategoryFilter) subcategoryFilter.value = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
            filtered = filtered.filter(product => product.subcategory.toLowerCase() === subcategory.toLowerCase());
        }

        if(categoryFilter || subcategoryFilter) {
            filterProducts();
        } else {
            loadProducts(filtered);
        }
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        // Animation effect when updated
        el.style.transform = 'scale(1.2)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
    });
}

// Load Cart on Cart Page
function loadCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');

    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; margin-right: 25px;">
                <div>
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-1">${item.category} - ${item.subcategory}</p>
                    <p class="mb-0 fw-bold" style="color: var(--primary-blue)">Rs. ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mt-3 mt-md-0">
                <div class="quantity-controls me-4">
                    <button onclick="updateQuantity(${index}, -1)"><i class="fas fa-minus" style="font-size: 0.8rem;"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)"><i class="fas fa-plus" style="font-size: 0.8rem;"></i></button>
                </div>
                <button class="btn btn-danger" onclick="removeFromCart(${index})"><i class="fas fa-trash-alt me-2"></i>Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `Rs. ${total.toFixed(2)}`;

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContainer) cartContainer.style.display = 'none';
        document.querySelector('.text-end').style.display = 'none';
    } else {
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartContainer) cartContainer.style.display = 'block';
        document.querySelector('.text-end').style.display = 'block';
    }
}

// Update Quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Setup Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        showNotification('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create custom toast notification
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.top = '80px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? '#81A6C6' : '#ff6b6b';
    toast.style.color = '#fff';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    toast.style.zIndex = '9999';
    toast.style.transform = 'translateX(150%)';
    toast.style.transition = 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 400);
    }, 3000);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if(this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});