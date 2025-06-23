document.addEventListener('DOMContentLoaded', function() {
    // Image Upload Functionality
    const logoUpload = document.querySelector('.logo-upload');
    const coverUpload = document.querySelector('.cover-upload');
    const logoInput = document.getElementById('logoUpload');
    const coverInput = document.getElementById('coverUpload');
    
    function handleImageUpload(uploadBox, input, previewClass) {
        const placeholder = uploadBox.querySelector('.upload-placeholder');
        const preview = uploadBox.querySelector('.image-preview');
        const removeBtn = uploadBox.querySelector('.remove-image');
        
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                    preview.style.display = 'block';
                    placeholder.style.display = 'none';
                }
                
                reader.readAsDataURL(file);
            }
        });
        
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            input.value = '';
            preview.innerHTML = '';
            preview.style.display = 'none';
            placeholder.style.display = 'flex';
        });
    }
    
    if (logoUpload && logoInput) {
        handleImageUpload(logoUpload, logoInput, 'logo-preview');
    }
    
    if (coverUpload && coverInput) {
        handleImageUpload(coverUpload, coverInput, 'cover-preview');
    }
    
    // Map Modal Functionality
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMap');
    const closeModalBtn = document.querySelector('.close-modal');
    const confirmLocationBtn = document.getElementById('confirmLocation');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const modalLatitude = document.getElementById('modalLatitude');
    const modalLongitude = document.getElementById('modalLongitude');
    const mapPreview = document.getElementById('mapPreview');
    
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function() {
            mapModal.classList.add('active');
            // Here you would initialize the map with a library like Leaflet or Google Maps
            // For demo purposes, we'll just simulate it
            simulateMap();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            mapModal.classList.remove('active');
        });
    }
    
    if (confirmLocationBtn) {
        confirmLocationBtn.addEventListener('click', function() {
            // Set the values in the form
            latitudeInput.value = modalLatitude.value;
            longitudeInput.value = modalLongitude.value;
            
            // Update the preview (in a real app, you'd show a map thumbnail)
            mapPreview.innerHTML = `
                <div class="map-image">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary-color); font-size: 30px;"></i>
                    <p>Location set: ${modalLatitude.value}, ${modalLongitude.value}</p>
                </div>
                <button type="button" id="openMap" class="map-button">
                    <i class="fas fa-edit"></i> Change Location
                </button>
            `;
            
            // Reattach event listener to the new button
            document.getElementById('openMap').addEventListener('click', function() {
                mapModal.classList.add('active');
                simulateMap();
            });
            
            mapModal.classList.remove('active');
        });
    }
    
    function simulateMap() {
        // In a real implementation, you would use Leaflet or Google Maps API
        // This is just a simulation for the demo
        const locationMap = document.getElementById('locationMap');
        locationMap.innerHTML = `
            <div style="width: 100%; height: 100%; background: #e0e0e0; display: flex; align-items: center; justify-content: center; position: relative;">
                <i class="fas fa-map" style="font-size: 50px; color: #999;"></i>
                <div class="map-marker" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: red; font-size: 30px;">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div style="position: absolute; bottom: 10px; right: 10px; background: white; padding: 5px 10px; border-radius: 3px; font-size: 12px;">
                    Drag marker to set location
                </div>
            </div>
        `;
        
        // Set some random coordinates for demo
        const lat = (Math.random() * 180 - 90).toFixed(6);
        const lng = (Math.random() * 360 - 180).toFixed(6);
        modalLatitude.value = lat;
        modalLongitude.value = lng;
    }
    
    // Form Validation
    const form = document.getElementById('addRestaurantForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                
                if (!field.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                    
                    // Additional validation for specific fields
                    if (field.type === 'email' && !validateEmail(field.value)) {
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                    
                    if (field.id === 'contactNumber' && !validatePhone(field.value)) {
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                    
                    if (field.id === 'website' && field.value && !validateUrl(field.value)) {
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Form is valid, submit data
                alert('Restaurant added successfully!');
                // In a real app, you would send the data to the server here
                // form.submit();
            } else {
                // Scroll to the first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }
    
    // Validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\+\-\(\)]{10,}$/;
        return re.test(phone);
    }
    
    function validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    // QR Code Regeneration
    const qrDesign = document.getElementById('qrDesign');
    const qrColor = document.getElementById('qrColor');
    const qrContent = document.getElementById('qrContent');
    const qrPreview = document.querySelector('.qr-code img');
    const regenerateBtn = document.querySelector('.qr-actions .btn-secondary');
    
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            // In a real app, this would regenerate the QR code with new settings
            const color = qrColor.value.substring(1); // Remove #
            const design = qrDesign.value;
            const content = qrContent.value;
            
            // Simulate QR code regeneration
            qrPreview.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://sasrestaurants.com/menu/123&color=${color}`;
            
            // Show feedback
            const feedback = document.createElement('div');
            feedback.className = 'qr-feedback';
            feedback.textContent = 'QR Code regenerated with new settings';
            document.querySelector('.qr-preview').appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 3000);
        });
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
                window.location.href = 'restaurants.html';
            }
        });
    }
});