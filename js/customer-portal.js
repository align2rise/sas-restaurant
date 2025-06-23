document.addEventListener('DOMContentLoaded', function() {
    // Cart State
    const cart = {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0
    };

    // DOM Elements
    const cartSidebar = document.querySelector('.cart-sidebar');
    const btnCart = document.querySelector('.btn-cart');
    const btnCloseCart = document.querySelector('.btn-close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const subtotalEl = document.querySelector('.subtotal');
    const taxEl = document.querySelector('.tax');
    const totalEl = document.querySelector('.total-amount');
    const btnCheckout = document.querySelector('.btn-checkout');
    const checkoutModal = document.getElementById('checkoutModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const btnCloseModal = document.querySelector('.btn-close-modal');
    const btnDone = document.querySelector('.btn-done');

    // Toggle Cart
    btnCart.addEventListener('click', function() {
        cartSidebar.classList.add('active');
    });

    btnCloseCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    // Add to Cart
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemId = menuItem.getAttribute('data-id');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
            const itemImage = menuItem.querySelector('.item-image img').src;
            
            // Check for customization (like size)
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
            updateCartUI();
            cartSidebar.classList.add('active');
        });
    });

    // Add to Cart Function
    function addToCart(item) {
        const existingItem = cart.items.find(cartItem => cartItem.id === item.id && cartItem.options === item.options);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push(item);
        }
        
        calculateTotals();
    }

    // Calculate Totals
    function calculateTotals() {
        cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.tax = cart.subtotal * 0.08; // 8% tax
        cart.total = cart.subtotal + cart.tax;
    }

    // Update Cart UI
    function updateCartUI() {
        // Update cart items
        cartItemsContainer.innerHTML = '';
        
        cart.items.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    ${item.options ? `<div class="cart-item-options">${item.options}</div>` : ''}
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}" data-options="${item.options}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}" data-options="${item.options}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}" data-options="${item.options}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });

        // Update totals
        subtotalEl.textContent = `$${cart.subtotal.toFixed(2)}`;
        taxEl.textContent = `$${cart.tax.toFixed(2)}`;
        totalEl.textContent = `$${cart.total.toFixed(2)}`;
        
        // Update cart count
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Handle Quantity Changes
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('minus') || e.target.parentElement.classList.contains('minus')) {
            const button = e.target.classList.contains('minus') ? e.target : e.target.parentElement;
            const itemId = button.getAttribute('data-id');
            const itemOptions = button.getAttribute('data-options');
            
            const item = cart.items.find(item => item.id === itemId && item.options === itemOptions);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.items = cart.items.filter(item => !(item.id === itemId && item.options === itemOptions));
            }
            
            calculateTotals();
            updateCartUI();
        }
        
        if (e.target.classList.contains('plus') || e.target.parentElement.classList.contains('plus')) {
            const button = e.target.classList.contains('plus') ? e.target : e.target.parentElement;
            const itemId = button.getAttribute('data-id');
            const itemOptions = button.getAttribute('data-options');
            
            const item = cart.items.find(item => item.id === itemId && item.options === itemOptions);
            item.quantity += 1;
            
            calculateTotals();
            updateCartUI();
        }
        
        if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.parentElement;
            const itemId = button.getAttribute('data-id');
            const itemOptions = button.getAttribute('data-options');
            
            cart.items = cart.items.filter(item => !(item.id === itemId && item.options === itemOptions));
            
            calculateTotals();
            updateCartUI();
        }
    });

    // Checkout Process
    btnCheckout.addEventListener('click', function() {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        checkoutModal.classList.add('active');
    });

    btnCloseModal.addEventListener('click', function() {
        checkoutModal.classList.remove('active');
    });

    // Form Submission
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would send this data to your backend
        checkoutModal.classList.remove('active');
        cartSidebar.classList.remove('active');
        
        // Show confirmation
        confirmationModal.classList.add('active');
        
        // Clear cart
        cart.items = [];
        calculateTotals();
        updateCartUI();
    });

    // Close Confirmation
    btnDone.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
    });

    // Favorite Items
    document.querySelectorAll('.btn-favorite').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    // Menu Category Navigation
    document.querySelectorAll('.menu-categories a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active tab
            document.querySelectorAll('.menu-categories li').forEach(li => {
                li.classList.remove('active');
            });
            this.parentNode.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});