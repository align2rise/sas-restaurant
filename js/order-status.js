document.addEventListener('DOMContentLoaded', function() {
    const orderId = new URLSearchParams(window.location.search).get('orderId');
    
    if (orderId) {
        fetchOrderStatus(orderId);
    }
});

async function fetchOrderStatus(orderId) {
    try {
        const response = await fetch(`/api/orders/${orderId}`);
        const order = await response.json();
        
        document.querySelector('h2').textContent = `Order #${order.id}`;
        document.querySelector('.status').textContent = order.status;
        document.querySelector('.status').className = `status ${order.status.toLowerCase()}`;
        
        // Update progress tracker
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index < order.progressStep) {
                step.classList.add('completed');
            } else if (index === order.progressStep) {
                step.classList.add('active');
            }
        });
        
    } catch (error) {
        alert('Failed to fetch order details.');
    }
}