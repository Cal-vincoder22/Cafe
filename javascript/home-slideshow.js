// home-slideshow.js - Hero Section Slideshow
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
});

function initHeroSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const autoplayToggle = document.querySelector('.autoplay-toggle');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    let isAutoplay = true;

    // Initialize slideshow
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    // Next slide function
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Previous slide function
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Auto-play functionality
    function startAutoplay() {
        slideInterval = setInterval(nextSlide, slideDuration);
        autoplayToggle.classList.add('active');
        isAutoplay = true;
    }

    function stopAutoplay() {
        clearInterval(slideInterval);
        autoplayToggle.classList.remove('active');
        isAutoplay = false;
    }

    function toggleAutoplay() {
        if (isAutoplay) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    });

    autoplayToggle.addEventListener('click', toggleAutoplay);

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            if (isAutoplay) {
                stopAutoplay();
                startAutoplay();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            if (isAutoplay) {
                stopAutoplay();
                startAutoplay();
            }
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            if (isAutoplay) {
                stopAutoplay();
                startAutoplay();
            }
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoplay();
        }
    });

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', function() {
        if (autoplayToggle.classList.contains('active')) {
            startAutoplay();
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    heroSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
        
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    }

    // Start the slideshow
    startAutoplay();
    
    // Preload images for better performance
    function preloadImages() {
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                const image = new Image();
                image.src = src;
            }
        });
    }
    
    preloadImages();
}