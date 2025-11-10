// Gallery Lightbox functionality
function initGalleryLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img src="" alt="Lightbox Image">
            <div class="lightbox-caption"></div>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let images = [];

    // Add click events to all gallery images
    document.querySelectorAll('.gallery-image, .menu-card img, .card img').forEach((img, index) => {
        img.classList.add('gallery-image');
        img.setAttribute('data-index', index);
        
        img.addEventListener('click', function() {
            images = Array.from(document.querySelectorAll('.gallery-image'));
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            openLightbox(currentImageIndex);
        });
    });

    function openLightbox(index) {
        if (images.length === 0) return;
        
        const img = images[index];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        currentImageIndex = index;
        updateNavigation();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigate(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= images.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = images.length - 1;
        openLightbox(currentImageIndex);
    }

    function updateNavigation() {
        prevBtn.style.display = images.length > 1 ? 'block' : 'none';
        nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
    });
}