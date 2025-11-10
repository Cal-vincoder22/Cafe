// video-player.js - Enhanced video functionality for menu page
document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayers();
    initVideoInteractions();
});

function initVideoPlayers() {
    const videos = document.querySelectorAll('.menu-video');
    const playButtons = document.querySelectorAll('.play-btn');
    
    // Initialize all videos
    videos.forEach(video => {
        // Add loading attribute for better performance
        video.setAttribute('loading', 'lazy');
        
        // Add event listeners for video state changes
        video.addEventListener('loadstart', function() {
            this.parentElement.classList.add('video-loading');
        });
        
        video.addEventListener('canplay', function() {
            this.parentElement.classList.remove('video-loading');
        });
        
        video.addEventListener('play', function() {
            // Hide overlay when video starts playing
            const overlay = this.parentElement.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            }
            
            // Pause other videos when one starts playing
            videos.forEach(otherVideo => {
                if (otherVideo !== this && !otherVideo.paused) {
                    otherVideo.pause();
                    const otherOverlay = otherVideo.parentElement.querySelector('.video-overlay');
                    if (otherOverlay) {
                        otherOverlay.style.opacity = '1';
                        otherOverlay.style.pointerEvents = 'auto';
                    }
                }
            });
        });
        
        video.addEventListener('pause', function() {
            // Show overlay when video is paused
            const overlay = this.parentElement.querySelector('.video-overlay');
            if (overlay && this.currentTime > 0) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            }
        });
    });
    
    // Initialize play buttons
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoWrapper = this.closest('.video-wrapper');
            const video = videoWrapper.querySelector('.menu-video');
            
            if (video) {
                video.play().catch(error => {
                    console.log('Video play failed:', error);
                    // Show custom play button if autoplay is blocked
                    video.controls = true;
                });
            }
        });
    });
}

function initVideoInteractions() {
    // Add intersection observer for lazy loading videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load();
                videoObserver.unobserve(video);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all videos for lazy loading
    document.querySelectorAll('.menu-video').forEach(video => {
        videoObserver.observe(video);
    });
    
    // Add keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            const focusedVideo = document.querySelector('.menu-video:focus');
            if (focusedVideo) {
                e.preventDefault();
                if (focusedVideo.paused) {
                    focusedVideo.play();
                } else {
                    focusedVideo.pause();
                }
            }
        }
    });
}

// Video utility functions
function pauseAllVideos() {
    document.querySelectorAll('.menu-video').forEach(video => {
        video.pause();
    });
}

function muteAllVideos() {
    document.querySelectorAll('.menu-video').forEach(video => {
        video.muted = true;
    });
}

function unmuteAllVideos() {
    document.querySelectorAll('.menu-video').forEach(video => {
        video.muted = false;
    });
}