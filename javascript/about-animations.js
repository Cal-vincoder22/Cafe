// About page specific animations
document.addEventListener('DOMContentLoaded', function() {
    initTeamCardAnimations();
    initMilestoneAnimations();
    initValueCardAnimations();
});

function initTeamCardAnimations() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initMilestoneAnimations() {
    const milestones = document.querySelectorAll('.milestone');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    milestones.forEach(milestone => observer.observe(milestone));
}

function initValueCardAnimations() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add CSS animation for milestones
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .milestone {
        opacity: 0;
    }
`;
document.head.appendChild(style);