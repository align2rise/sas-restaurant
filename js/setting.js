// Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons/panes
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Update range value display
    const rangeSlider = document.getElementById('deliveryRadius');
    if (rangeSlider) {
        const rangeValue = document.querySelector('.range-value');
        rangeValue.textContent = rangeSlider.value + ' miles';
        
        rangeSlider.addEventListener('input', function() {
            rangeValue.textContent = this.value + ' miles';
        });
    }
});