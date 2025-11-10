// Interactive Maps functionality
function initMap() {
    // Initialize main location map
    const mainMapElement = document.getElementById('mainMap');
    if (mainMapElement) {
        initMainLocationMap();
    }
    
    // Initialize multiple locations if needed
    initMultipleLocations();
}

function initMainLocationMap() {
    const mapFrame = document.querySelector('iframe[src*="google.com/maps"]');
    if (mapFrame) {
        // Enhance existing Google Maps iframe with interactive features
        enhanceMapFrame(mapFrame);
    } else {
        // Create new map container if needed
        createInteractiveMap();
    }
}

function enhanceMapFrame(mapFrame) {
    // Add loading indicator
    const mapContainer = mapFrame.parentElement;
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'map-loading';
    loadingIndicator.innerHTML = '<span>Loading Map...</span>';
    mapContainer.appendChild(loadingIndicator);
    
    mapFrame.addEventListener('load', () => {
        loadingIndicator.style.display = 'none';
    });
    
    // Add custom map controls
    addMapControls(mapContainer);
}

function addMapControls(mapContainer) {
    const controls = document.createElement('div');
    controls.className = 'map-controls';
    controls.innerHTML = `
        <button class="map-zoom-in">+</button>
        <button class="map-zoom-out">-</button>
        <button class="map-locate-me">📍</button>
    `;
    
    mapContainer.style.position = 'relative';
    mapContainer.appendChild(controls);
    
    // Add control functionality
    setupMapControls(controls);
}

function setupMapControls(controls) {
    // Note: These would need to interact with Google Maps API
    // This is a simplified version for demonstration
    controls.querySelector('.map-locate-me').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                alert(`Your location: ${position.coords.latitude}, ${position.coords.longitude}\nWe're at Rosebank Mall!`);
            });
        }
    });
}

function initMultipleLocations() {
    const locations = [
        {
            name: "Rosebank Main Café",
            address: "123 Coffee Street, Rosebank, Johannesburg",
            coords: { lat: -26.147231, lng: 28.040176 }
        },
        {
            name: "Sandton Pop-up",
            address: "45 Business District, Sandton",
            coords: { lat: -26.107565, lng: 28.056701 }
        }
    ];
    
    // Create locations list if needed
    createLocationsList(locations);
}

function createLocationsList(locations) {
    const locationsSection = document.querySelector('section h2');
    if (locationsSection && locationsSection.textContent.includes('Locations')) {
        const locationsContainer = document.createElement('div');
        locationsContainer.className = 'locations-list';
        
        locations.forEach(location => {
            const locationElement = document.createElement('div');
            locationElement.className = 'location-item';
            locationElement.innerHTML = `
                <h4>${location.name}</h4>
                <p>${location.address}</p>
                <button class="view-on-map" data-lat="${location.coords.lat}" data-lng="${location.coords.lng}">
                    View on Map
                </button>
            `;
            locationsContainer.appendChild(locationElement);
        });
        
        locationsSection.parentElement.appendChild(locationsContainer);
    }
}