// Menu Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeImageModal();
    initializeVideoPlayers();
    initializeMenuSearch();
    initializeCategoryFilter();
});

// Image Modal Functionality
function initializeImageModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-content">
        <div class="modal-caption"></div>
    `;
    document.body.appendChild(modal);
    
    const modalElement = document.querySelector('.image-modal');
    const modalImg = modalElement.querySelector('.modal-content');
    const modalCaption = modalElement.querySelector('.modal-caption');
    const closeBtn = modalElement.querySelector('.close-modal');
    
    // Add click events to all menu images
    const menuImages = document.querySelectorAll('.menu-card img');
    
    menuImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const imgSrc = this.src;
            const imgAlt = this.alt || 'Menu Item';
            
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            modalCaption.textContent = imgAlt;
            
            modalElement.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add escape key listener
            const escapeHandler = function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };
            
            document.addEventListener('keydown', escapeHandler);
            modalElement._escapeHandler = escapeHandler;
        });
    });
    
    // Close modal function
    function closeModal() {
        modalElement.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (modalElement._escapeHandler) {
            document.removeEventListener('keydown', modalElement._escapeHandler);
        }
    }
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            closeModal();
        }
    });
}

// Video Player Functionality
function initializeVideoPlayers() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.menu-video');
        const playBtn = wrapper.querySelector('.play-btn');
        const overlay = wrapper.querySelector('.video-overlay');
        
        if (video && playBtn) {
            // Ensure video is visible
            video.style.display = 'block';
            video.style.visibility = 'visible';
            video.style.opacity = '1';
            
            // Play button functionality
            playBtn.addEventListener('click', function() {
                video.play().then(() => {
                    wrapper.classList.add('video-playing');
                    video.setAttribute('controls', 'true');
                    overlay.style.opacity = '0';
                }).catch(error => {
                    console.error('Error playing video:', error);
                });
            });
            
            // Handle video events
            video.addEventListener('play', function() {
                wrapper.classList.add('video-playing');
                overlay.style.opacity = '0';
            });
            
            video.addEventListener('pause', function() {
                if (video.currentTime > 0 && !video.ended) {
                    overlay.style.opacity = '0.7';
                }
            });
            
            video.addEventListener('ended', function() {
                wrapper.classList.remove('video-playing');
                video.removeAttribute('controls');
                overlay.style.opacity = '1';
                video.currentTime = 0;
            });
            
            // Hide native controls initially
            video.removeAttribute('controls');
        }
    });
}

// Search Functionality
function initializeMenuSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const menuCards = document.querySelectorAll('.menu-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length === 0) {
                if (searchResults) searchResults.style.display = 'none';
                showAllItems();
                return;
            }
            
            const filteredItems = Array.from(menuCards).filter(card => {
                const searchData = card.getAttribute('data-search') || '';
                const itemName = card.querySelector('strong')?.textContent.toLowerCase() || '';
                const itemDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
                
                return searchData.includes(searchTerm) || 
                       itemName.includes(searchTerm) || 
                       itemDescription.includes(searchTerm);
            });
            
            displaySearchResults(filteredItems, searchTerm);
        });
    }
    
    function displaySearchResults(items, searchTerm) {
        if (!searchResults) return;
        
        if (items.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No items found matching "' + searchTerm + '"</div>';
            searchResults.style.display = 'block';
            
            // Hide all items
            menuCards.forEach(card => {
                card.style.display = 'none';
            });
        } else {
            searchResults.innerHTML = '';
            searchResults.style.display = 'block';
            
            // Show only matching items
            menuCards.forEach(card => {
                const isMatch = items.includes(card);
                card.style.display = isMatch ? 'block' : 'none';
            });
        }
    }
    
    function showAllItems() {
        menuCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// Category Filter Functionality
function initializeCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    const menuSections = document.querySelectorAll('.menu-section');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide menu sections
            menuSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // If "all" is selected, ensure all cards are visible
            if (category === 'all') {
                menuCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    });
}

// Emergency visibility fix
function forceVisibility() {
    // Force all menu content to be visible
    const menuElements = document.querySelectorAll('.menu-section, .menu-card, .video-section, .menu-video');
    menuElements.forEach(el => {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
    });
}

// Initialize on load
forceVisibility();