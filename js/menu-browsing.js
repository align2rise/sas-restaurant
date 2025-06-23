document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart (shared with customer-portal.js in a real app)
    const cart = {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0
    };

    // DOM Elements
    const btnFilters = document.querySelectorAll('.btn-filter');
    const searchInput = document.querySelector('.search-box input');
    const menuItems = document.querySelectorAll('.menu-item');
    const cartCount = document.querySelector('.cart-count');

    // Filter by Category
    btnFilters.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            btnFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter items
            menuItems.forEach(item => {
                const tags = item.getAttribute('data-tags');
                
                if (category === 'all' || 
                    (category === 'popular' && tags.includes('popular')) ||
                    (category === 'vegetarian' && tags.includes('vegetarian')) ||
                    (category === 'spicy' && tags.includes('spicy'))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search Functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        menuItems.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('.description').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Add to Cart
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemId = menuItem.getAttribute('data-id');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
            const itemImage = menuItem.querySelector('.item-image img').src;
            
            // Check for customization
            let options = '';
            if (menuItem.querySelector('.customize')) {
                const sizeSelect = menuItem.querySelector('.size-option');
                options = `Size: ${sizeSelect.options[sizeSelect.selectedIndex].text}`;
            }

            // Add to cart
            addToCart({
                id: itemId,
                name: itemName,
                price: itemPrice,
                image: itemImage,
                options: options,
                quantity: 1
            });

            // Update UI
            updateCartCount();
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--success-color)';
            setTimeout(() => {
                this.textContent = 'Add +';
                this.style.backgroundColor = 'var(--primary-color)';
            }, 1000);
        });
    });

    // Add to Cart Function
    function addToCart(item) {
        const existingItem = cart.items.find(cartItem => 
            cartItem.id === item.id && cartItem.options === item.options
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push(item);
        }
    }

    // Update Cart Count
    function updateCartCount() {
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Animation
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }

    // In a real app, you would also include:
    // - Cart sidebar functionality (from customer-portal.js)
    // - Checkout process
    // - Favorite items system
});