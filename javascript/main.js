// Main JavaScript file - Core functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initAccordions();
    initGalleryLightbox();
    initFormValidation();
    initSearchFunctionality();
    initMap();
    initAnimations();
    initSmoothScrolling();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Accordion functionality for menu categories
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.parentElement;
            const content = this.nextElementSibling;
            
            // Toggle active class
            accordion.classList.toggle('active');
            
            // Toggle content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// Search functionality for menu items
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const menuItems = document.querySelectorAll('.menu-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            menuItems.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('search-match');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('search-match');
                }
            });
        });
    }
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}