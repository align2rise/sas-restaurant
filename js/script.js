document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle Functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        menuToggle.innerHTML = sidebar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && !sidebar.contains(e.target) && e.target !== menuToggle) {
            sidebar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Prevent closing when clicking inside sidebar
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Animate cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('[data-aos]');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animation styles
    const initAnimations = function() {
        const cards = document.querySelectorAll('[data-aos]');
        
        cards.forEach(card => {
            const delay = card.getAttribute('data-aos-delay') || 0;
            card.style.transition = `all 0.6s ease ${delay}ms`;
            card.style.opacity = '0';
            
            if (card.getAttribute('data-aos') === 'fade-up') {
                card.style.transform = 'translateY(20px)';
            } else if (card.getAttribute('data-aos') === 'fade-right') {
                card.style.transform = 'translateX(-20px)';
            } else if (card.getAttribute('data-aos') === 'fade-down') {
                card.style.transform = 'translateY(-20px)';
            }
        });
    };
    
    // Initialize and run animations
    initAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Simulate loading data
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('loaded');
        });
    }, 500);
    
    // Notification dropdown
    const notifications = document.querySelector('.notifications');
    const notificationDropdown = document.createElement('div');
    notificationDropdown.className = 'notification-dropdown';
    notificationDropdown.innerHTML = `
        <div class="dropdown-header">
            <h4>Notifications</h4>
            <small>3 New</small>
        </div>
        <div class="dropdown-list">
            <div class="dropdown-item">
                <i class="fas fa-bell"></i>
                <div class="item-content">
                    <p>New order received</p>
                    <small>2 minutes ago</small>
                </div>
            </div>
            <div class="dropdown-item">
                <i class="fas fa-exclamation-circle"></i>
                <div class="item-content">
                    <p>System update available</p>
                    <small>1 hour ago</small>
                </div>
            </div>
            <div class="dropdown-item">
                <i class="fas fa-user-plus"></i>
                <div class="item-content">
                    <p>New admin registered</p>
                    <small>3 hours ago</small>
                </div>
            </div>
        </div>
        <div class="dropdown-footer">
            <a href="#">View All Notifications</a>
        </div>
    `;
    
    notifications.appendChild(notificationDropdown);
    notificationDropdown.style.display = 'none';
    
    notifications.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', function() {
        notificationDropdown.style.display = 'none';
    });
    
    notificationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });


    // Accordion functionality
    document.addEventListener('DOMContentLoaded', function() {
        const submenuToggles = document.querySelectorAll('.submenu-toggle');
        
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Close other open submenus if needed
                document.querySelectorAll('.has-submenu').forEach(item => {
                    if (item !== parent && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
            });
        });
        
        // Menu toggle for mobile
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                document.querySelector('.sidebar').classList.toggle('collapsed');
            });
        }
    });
});