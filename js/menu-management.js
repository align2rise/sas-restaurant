document.addEventListener('DOMContentLoaded', function() {
    // Category Tab Switching
    const categoryTabs = document.querySelectorAll('.category-tabs li a');
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.parentNode.classList.remove('active'));
            
            // Add active class to current tab
            this.parentNode.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter menu items
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Favorite Button Toggle
    const favoriteButtons = document.querySelectorAll('.item-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Add New Item Modal
    const addItemBtn = document.getElementById('addMenuItem');
    const addItemModal = document.getElementById('addItemModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.modal-footer .btn-cancel');
    
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            addItemModal.classList.add('active');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            addItemModal.classList.remove('active');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            addItemModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addItemModal) {
            addItemModal.classList.remove('active');
        }
    });
    
    // Image Upload Preview
    const itemImageInput = document.getElementById('itemImage');
    const imagePreview = document.querySelector('.image-preview');
    
    if (itemImageInput) {
        itemImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                    imagePreview.style.display = 'block';
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Delete Item Confirmation
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this item?')) {
                this.closest('.menu-item-card').remove();
            }
        });
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            menuItems.forEach(item => {
                const itemName = item.querySelector('h3').textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});