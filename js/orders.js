document.addEventListener('DOMContentLoaded', function() {
    // Kitchen Status Toggle
    const kitchenToggle = document.querySelector('.btn-toggle');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.kitchen-status strong');
    
    if (kitchenToggle) {
        kitchenToggle.addEventListener('click', function() {
            if (statusText.textContent === 'OPEN') {
                if (confirm('Close the kitchen? New orders will not be accepted.')) {
                    statusText.textContent = 'CLOSED';
                    statusIndicator.classList.remove('active');
                    statusIndicator.style.background = 'var(--danger-color)';
                }
            } else {
                statusText.textContent = 'OPEN';
                statusIndicator.classList.add('active');
                statusIndicator.style.background = 'var(--success-color)';
            }
        });
    }

    // Order Status Management
    const acceptButtons = document.querySelectorAll('.btn-accept');
    const rejectButtons = document.querySelectorAll('.btn-reject');
    const readyButtons = document.querySelectorAll('.btn-ready');
    const completeButtons = document.querySelectorAll('.btn-complete');
    
    // Accept Order
    acceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.getAttribute('data-order-id');
            
            // In a real app, this would call an API to update status
            orderCard.classList.remove('new');
            orderCard.classList.add('preparing');
            
            // Move to Preparing column
            document.querySelector('.preparing-orders .order-cards').appendChild(orderCard);
            
            // Update UI
            const footer = orderCard.querySelector('.order-footer .actions');
            footer.innerHTML = `
                <button class="btn btn-sm btn-ready">
                    <i class="fas fa-check-circle"></i> Mark Ready
                </button>
            `;
            
            // Add event listener to new button
            footer.querySelector('.btn-ready').addEventListener('click', function() {
                markOrderReady(orderCard, orderId);
            });
            
            // Update stats
            updateOrderStats();
            addToActivityLog(`Order #${orderId} accepted and moved to preparing`, 'primary');
        });
    });
    
    // Reject Order
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.getAttribute('data-order-id');
            
            if (confirm(`Reject order #${orderId}?`)) {
                orderCard.remove();
                updateOrderStats();
                addToActivityLog(`Order #${orderId} rejected`, 'warning');
            }
        });
    });
    
    // Mark Order as Ready
    function markOrderReady(orderCard, orderId) {
        orderCard.classList.remove('preparing');
        orderCard.classList.add('ready');
        
        // Move to Ready column
        document.querySelector('.ready-orders .order-cards').appendChild(orderCard);
        
        // Update UI
        const footer = orderCard.querySelector('.order-footer .actions');
        footer.innerHTML = `
            <button class="btn btn-sm btn-complete">
                <i class="fas fa-truck"></i> Mark Delivered
            </button>
        `;
        
        // Add event listener to new button
        footer.querySelector('.btn-complete').addEventListener('click', function() {
            completeOrder(orderCard, orderId);
        });
        
        updateOrderStats();
        addToActivityLog(`Order #${orderId} is ready for pickup`, 'success');
    }
    
    // Complete Order
    function completeOrder(orderCard, orderId) {
        orderCard.remove();
        updateOrderStats();
        addToActivityLog(`Order #${orderId} marked as delivered`, 'success');
    }
    
    // Update Order Stats
    function updateOrderStats() {
        const newOrders = document.querySelectorAll('.new-orders .order-card').length;
        const preparingOrders = document.querySelectorAll('.preparing-orders .order-card').length;
        const readyOrders = document.querySelectorAll('.ready-orders .order-card').length;
        
        // Update badge counts
        document.querySelector('.new-orders .badge').textContent = newOrders;
        document.querySelector('.preparing-orders .badge').textContent = preparingOrders;
        document.querySelector('.ready-orders .badge').textContent = readyOrders;
    }
    
    // Add to Activity Log
    function addToActivityLog(message, type) {
        const logContainer = document.querySelector('.log-items');
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        
        let iconClass = '';
        if (type === 'success') iconClass = 'fas fa-check-circle';
        else if (type === 'warning') iconClass = 'fas fa-exclamation-circle';
        else if (type === 'primary') iconClass = 'fas fa-utensils';
        
        logItem.innerHTML = `
            <div class="log-icon ${type}">
                <i class="${iconClass}"></i>
            </div>
            <div class="log-content">
                <p>${message}</p>
                <small>Just now</small>
            </div>
        `;
        
        logContainer.insertBefore(logItem, logContainer.firstChild);
        
        // Limit log items
        if (logContainer.children.length > 10) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }
    
    // Simulate New Orders
    function simulateNewOrder() {
        if (statusText.textContent === 'CLOSED') return;
        
        if (Math.random() > 0.7) { // 30% chance of new order
            const newOrdersColumn = document.querySelector('.new-orders .order-cards');
            const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
            const customers = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'];
            const items = ['Pepperoni Pizza', 'Margherita Pizza', 'BBQ Chicken Pizza', 'Garlic Bread', 'Caesar Salad'];
            
            const newOrder = document.createElement('div');
            newOrder.className = 'order-card new';
            newOrder.setAttribute('data-order-id', orderId);
            newOrder.innerHTML = `
                <div class="order-header">
                    <span class="order-id">#${orderId}</span>
                    <span class="order-time">Just now</span>
                </div>
                <div class="order-customer">
                    <i class="fas fa-user"></i> ${customers[Math.floor(Math.random() * customers.length)]} (${Math.random() > 0.5 ? 'Table ' + Math.floor(1 + Math.random() * 15) : 'Takeaway'})
                </div>
                <div class="order-items">
                    <div class="item">
                        <span class="quantity">1x</span>
                        <span class="name">${items[Math.floor(Math.random() * items.length)]}</span>
                        ${Math.random() > 0.7 ? '<span class="notes"><i class="fas fa-sticky-note"></i> Extra cheese</span>' : ''}
                    </div>
                </div>
                <div class="order-footer">
                    <span class="total">$${(10 + Math.random() * 20).toFixed(2)}</span>
                    <div class="actions">
                        <button class="btn btn-sm btn-accept">
                            <i class="fas fa-check"></i> Accept
                        </button>
                        <button class="btn btn-sm btn-reject">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </div>
                </div>
            `;
            
            newOrdersColumn.insertBefore(newOrder, newOrdersColumn.firstChild);
            
            // Add event listeners
            newOrder.querySelector('.btn-accept').addEventListener('click', function() {
                const orderCard = this.closest('.order-card');
                const orderId = orderCard.getAttribute('data-order-id');
                orderCard.classList.remove('new');
                orderCard.classList.add('preparing');
                document.querySelector('.preparing-orders .order-cards').appendChild(orderCard);
                updateOrderStats();
                addToActivityLog(`Order #${orderId} accepted and moved to preparing`, 'primary');
            });
            
            newOrder.querySelector('.btn-reject').addEventListener('click', function() {
                const orderCard = this.closest('.order-card');
                const orderId = orderCard.getAttribute('data-order-id');
                if (confirm(`Reject order #${orderId}?`)) {
                    orderCard.remove();
                    updateOrderStats();
                    addToActivityLog(`Order #${orderId} rejected`, 'warning');
                }
            });
            
            updateOrderStats();
            addToActivityLog(`New order received #${orderId}`, 'primary');
        }
    }
    
    // Simulate new orders every 10-30 seconds
    setInterval(simulateNewOrder, 10000 + Math.random() * 20000);
    
    // Refresh button
    document.querySelector('.btn-refresh').addEventListener('click', function() {
        // In a real app, this would fetch latest data
        addToActivityLog('Kitchen activity log refreshed', 'primary');
    });
});