document.addEventListener('DOMContentLoaded', function() {
    // Load data from API (mock data in this example)
    const reportData = {
      sales: [12000, 19000, 15000, 18000, 22000, 25000, 30000],
      users: [500, 700, 600, 900, 1100, 1300, 1500],
      recentOrders: [
        { id: "ORD1001", customer: "John Doe", date: "2024-06-01", amount: "$125.99", status: "completed" },
        { id: "ORD1002", customer: "Jane Smith", date: "2024-06-02", amount: "$89.50", status: "shipped" },
        { id: "ORD1003", customer: "Robert Johnson", date: "2024-06-03", amount: "$210.00", status: "pending" },
        { id: "ORD1004", customer: "Emily Davis", date: "2024-06-04", amount: "$65.75", status: "completed" },
        { id: "ORD1005", customer: "Michael Brown", date: "2024-06-05", amount: "$154.30", status: "shipped" }
      ]
    };
  
    // Render Charts
    renderCharts(reportData);
    
    // Render Orders Table
    renderOrdersTable(reportData.recentOrders);
  });
  
  function renderCharts(data) {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Monthly Sales ($)',
          data: data.sales,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  
    // User Activity Chart
    const userCtx = document.getElementById('userChart').getContext('2d');
    new Chart(userCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'New Users',
          data: data.users,
          backgroundColor: '#2ecc71'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
  
  function renderOrdersTable(orders) {
    const tableBody = document.querySelector('#ordersTable tbody');
    tableBody.innerHTML = orders.map(order => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td>${order.amount}</td>
        <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        <td><button class="view-btn">View</button></td>
      </tr>
    `).join('');
  }