document.addEventListener('DOMContentLoaded', function() {
    const trackBtn = document.getElementById('trackBtn');
    const orderIdInput = document.getElementById('orderIdInput');
    const trackingResults = document.getElementById('trackingResults');
  
    trackBtn.addEventListener('click', function() {
      const orderId = orderIdInput.value.trim();
      if (!orderId) {
        alert('Please enter an order ID');
        return;
      }
      fetchOrderDetails(orderId);
    });
  
    // Load order from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = urlParams.get('orderId');
    if (orderIdFromUrl) {
      orderIdInput.value = orderIdFromUrl;
      fetchOrderDetails(orderIdFromUrl);
    }
  });
  
  async function fetchOrderDetails(orderId) {
    try {
      // In a real app, replace with your API endpoint
      const response = await fetch(`/api/tracking/${orderId}`);
      const order = await response.json();
  
      if (order.error) {
        showError(order.error);
        return;
      }
  
      renderTrackingDetails(order);
    } catch (error) {
      showError('Failed to fetch tracking information. Please try again.');
    }
  }
  
  function renderTrackingDetails(order) {
    const trackingResults = document.getElementById('trackingResults');
    
    // Calculate progress percentage (for the green progress bar)
    const progressPercent = Math.min(100, (order.currentStep / (order.totalSteps - 1)) * 100);
    
    // Generate HTML for tracking events
    const eventsHTML = order.events.map(event => `
      <div class="event">
        <div class="event-dot"></div>
        <div class="event-content">
          <div class="event-time">${event.time}</div>
          <div class="event-message">${event.message}</div>
        </div>
      </div>
    `).join('');
  
    // Generate HTML for progress steps
    const stepsHTML = Array.from({ length: order.totalSteps }, (_, i) => {
      const step = order.steps[i];
      const isActive = i <= order.currentStep;
      return `
        <div class="progress-step">
          <div class="step-indicator ${isActive ? 'active' : ''}"></div>
          <div class="step-label ${isActive ? 'active' : ''}">${step}</div>
        </div>
      `;
    }).join('');
  
    trackingResults.innerHTML = `
      <div class="tracking-active">
        <div class="tracking-header">
          <span class="order-id">Order #${order.id}</span>
          <span class="tracking-status">${order.status}</span>
        </div>
  
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <div class="progress-steps">
            ${stepsHTML}
          </div>
        </div>
  
        <div class="carrier-info">
          <p><strong>Carrier:</strong> ${order.carrier}</p>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
        </div>
  
        <div class="tracking-events">
          <h3>Shipping Updates</h3>
          ${eventsHTML}
        </div>
      </div>
    `;
  }
  
  function showError(message) {
    const trackingResults = document.getElementById('trackingResults');
    trackingResults.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }