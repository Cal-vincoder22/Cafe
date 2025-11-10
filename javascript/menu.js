// Menu Search and Filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    initMenuSearch();
    initCategoryFilter();
});

function initMenuSearch() {
    const searchInput = document.querySelector('.search-input');
    const menuCards = document.querySelectorAll('.menu-card');
    const searchResults = document.querySelector('.search-results');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        let resultsCount = 0;

        // Clear previous highlights
        menuCards.forEach(card => {
            card.classList.remove('search-match', 'no-match');
            card.style.display = 'block';
        });

        if (searchTerm.length < 2) {
            if (searchResults) searchResults.innerHTML = '';
            return;
        }

        // Filter and highlight matching cards
        menuCards.forEach(card => {
            const searchData = card.getAttribute('data-search') || '';
            const cardText = card.textContent.toLowerCase();
            const matchesSearch = searchData.includes(searchTerm) || cardText.includes(searchTerm);

            if (matchesSearch) {
                card.classList.add('search-match');
                card.style.display = 'block';
                resultsCount++;
            } else {
                card.classList.add('no-match');
                card.style.display = 'none';
            }
        });

        // Update search results counter
        if (searchResults) {
            if (resultsCount === 0 && searchTerm.length >= 2) {
                searchResults.innerHTML = `<p class="no-results">No items found for "${searchTerm}". Try different keywords.</p>`;
            } else if (resultsCount > 0) {
                searchResults.innerHTML = `<p class="results-found">Found ${resultsCount} item${resultsCount !== 1 ? 's' : ''} matching "${searchTerm}"</p>`;
            } else {
                searchResults.innerHTML = '';
            }
        }
    });

    // Clear search on escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
        }
    });
}

function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuCards = document.querySelectorAll('.menu-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            menuCards.forEach(card => {
                const cardCategories = card.getAttribute('data-categories') || '';
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    card.parentElement.parentElement.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide sections based on whether they have visible items
            menuSections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category');
                const visibleItems = section.querySelectorAll('.menu-card[style="display: block"]');
                
                if (category === 'all' || sectionCategory === category || visibleItems.length > 0) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            // Clear any active search
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = '';
                const searchResults = document.querySelector('.search-results');
                if (searchResults) searchResults.innerHTML = '';
            }
        });
    });
}

// Price filter functionality (optional enhancement)
function initPriceFilter() {
    const priceRanges = [
        { min: 0, max: 30, label: 'Under R30' },
        { min: 30, max: 50, label: 'R30 - R50' },
        { min: 50, max: 100, label: 'R50 - R100' },
        { min: 100, max: 1000, label: 'Over R100' }
    ];

    // This could be added to the category buttons for advanced filtering
}