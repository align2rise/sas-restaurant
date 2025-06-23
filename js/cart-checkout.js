document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quantityMinusBtns = document.querySelectorAll('.quantity-btn.minus');
    const quantityPlusBtns = document.querySelectorAll('.quantity-btn.plus');
    const removeBtns = document.querySelectorAll('.btn-remove');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const placeOrderBtn = document.querySelector('.btn-place-order');
    const confirmationModal = document.getElementById('confirmationModal');
    const btnDone = document.querySelector('.btn-done');

    // Quantity Controls
    quantityMinusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantityElement = this.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateItemPrice(this.closest('.order-item'));
                updateOrderSummary();
            }
        });
    });

    quantityPlusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantityElement = this.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            
            quantity++;
            quantityElement.textContent = quantity;
            updateItemPrice(this.closest('.order-item'));
            updateOrderSummary();
        });
    });

    // Remove Items
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            orderItem.remove();
            updateOrderSummary();
            
            // Show empty cart message if no items left
            if (document.querySelectorAll('.order-item').length === 0) {
                showEmptyCart();
            }
        });
    });

    // Update Item Price
    function updateItemPrice(orderItem) {
        const quantity = parseInt(orderItem.querySelector('.quantity').textContent);
        const priceText = orderItem.querySelector('.options').textContent;
        const unitPrice = parseFloat(priceText.match(/\$\d+\.\d{2}/)[0].replace('$', ''));
        const totalPrice = (quantity * unitPrice).toFixed(2);
        
        orderItem.querySelector('.item-price').textContent = `$${totalPrice}`;
    }

    // Update Order Summary
    function updateOrderSummary() {
        let subtotal = 0;
        
        document.querySelectorAll('.order-item').forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            subtotal += price;
        });
        
        const tax = subtotal * 0.08;
        const serviceFee = 1.50;
        const total = subtotal + tax + serviceFee;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }

    // Show Empty Cart
    function showEmptyCart() {
        const orderItems = document.querySelector('.order-items');
        orderItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <a href="menu-browsing.html" class="btn btn-primary">Browse Menu</a>
            </div>
        `;
        
        document.querySelector('.btn-place-order').style.display = 'none';
    }

    // Payment Method Selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Place Order
    placeOrderBtn.addEventListener('click', function() {
        // Validate form
        const tableNumber = document.querySelector('input[placeholder="Enter your table number"]').value;
        
        if (!tableNumber) {
            alert('Please enter your table number');
            return;
        }
        
        // In a real app, you would process payment here
        confirmationModal.classList.add('active');
    });

    // Close Modal
    btnDone.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
        window.location.href = 'order-status.html';
    });

    // Initialize
    updateOrderSummary();
});