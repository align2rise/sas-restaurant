document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Functionality
    const tabs = document.querySelectorAll('.nav-tabs li a');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.parentNode.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab and pane
            this.parentNode.classList.add('active');
            const paneId = this.getAttribute('data-tab');
            document.getElementById(paneId).classList.add('active');
        });
    });
    
    // Restaurant Status Toggle
    const statusBtn = document.querySelector('.btn-danger');
    if (statusBtn) {
        statusBtn.addEventListener('click', function() {
            const statusBadge = document.querySelector('.restaurant-status .badge');
            const hoursText = document.querySelector('.restaurant-status .hours');
            
            if (statusBtn.innerHTML.includes('Close')) {
                if (confirm('Are you sure you want to close this restaurant? New orders will not be accepted.')) {
                    statusBadge.classList.remove('open');
                    statusBadge.classList.add('closed');
                    statusBadge.textContent = 'Closed';
                    statusBtn.innerHTML = '<i class="fas fa-power-off"></i> Open Restaurant';
                    hoursText.textContent = 'Opens at 10:00 AM';
                }
            } else {
                statusBadge.classList.remove('closed');
                statusBadge.classList.add('open');
                statusBadge.textContent = 'Open';
                statusBtn.innerHTML = '<i class="fas fa-power-off"></i> Close Restaurant';
                hoursText.textContent = 'Closes at 11:00 PM';
            }
        });
    }
    
    // Order Status Update Simulation
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(order => {
        const statusElement = order.querySelector('.order-status');
        const actionsBtn = order.querySelector('.btn-sm');
        
        if (statusElement.classList.contains('preparing')) {
            actionsBtn.addEventListener('click', function() {
                if (confirm('Mark this order as ready for pickup?')) {
                    statusElement.classList.remove('preparing');
                    statusElement.classList.add('ready');
                    statusElement.textContent = 'Ready';
                }
            });
        } else if (statusElement.classList.contains('ready')) {
            actionsBtn.addEventListener('click', function() {
                if (confirm('Mark this order as delivered?')) {
                    statusElement.classList.remove('ready');
                    statusElement.classList.add('delivered');
                    statusElement.textContent = 'Delivered';
                }
            });
        }
    });
    
    // Simulate real-time order updates
    function simulateNewOrder() {
        const ordersList = document.querySelector('.orders-list');
        if (ordersList && Math.random() > 0.7) { // 30% chance of new order
            const newOrder = document.createElement('div');
            newOrder.className = 'order-item new-order';
            newOrder.innerHTML = `
                <div class="order-id">#ORD-${Math.floor(1000 + Math.random() * 9000)}</div>
                <div class="order-customer">New Customer</div>
                <div class="order-items">${Math.floor(1 + Math.random() * 5)} items</div>
                <div class="order-amount">$${(10 + Math.random() * 50).toFixed(2)}</div>
                <div class="order-status new">New</div>
                <div class="order-time">Just now</div>
                <div class="order-actions">
                    <button class="btn btn-sm btn-primary">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            `;
            
            ordersList.insertBefore(newOrder, ordersList.firstChild);
            
            // Highlight the new order
            newOrder.style.animation = 'highlightOrder 2s';
            
            // Remove highlight after animation
            setTimeout(() => {
                newOrder.style.animation = '';
                newOrder.classList.remove('new-order');
            }, 2000);
            
            // Add click handler for the new order
            const newStatus = newOrder.querySelector('.order-status');
            const newBtn = newOrder.querySelector('.btn-sm');
            
            newBtn.addEventListener('click', function() {
                if (confirm('Accept this new order?')) {
                    newStatus.classList.remove('new');
                    newStatus.classList.add('preparing');
                    newStatus.textContent = 'Preparing';
                }
            });
        }
    }
    
    // Check for new orders every 10 seconds
    setInterval(simulateNewOrder, 10000);
    
    // Update stats periodically
    function updateStats() {
        const stats = document.querySelectorAll('.stat-info p');
        if (stats.length > 0) {
            // Today's Orders
            const orders = parseInt(stats[0].textContent);
            stats[0].textContent = orders + Math.floor(Math.random() * 3);
            
            // Today's Revenue
            const revenue = parseFloat(stats[1].textContent.substring(1));
            stats[1].textContent = '$' + (revenue + (Math.random() * 50)).toFixed(2);
            
            // Active Customers
            const customers = parseInt(stats[2].textContent);
            stats[2].textContent = customers + Math.floor(Math.random() * 3) - 1;
        }
    }
    
    // Update stats every 30 seconds
    setInterval(updateStats, 30000);
});