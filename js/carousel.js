// Client carousel functionality
function initClientCarousel() {
    const track = document.querySelector('.client-track');
    if (!track) return; // Exit if element doesn't exist
    
    const logos = track.querySelectorAll('.client-logo');
    
    // Clone each logo and append it to the track
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
}

// Initialize on DOMContentLoaded or when components are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize immediately
    initClientCarousel();
    
    // Also listen for componentsLoaded event in case the component is loaded after DOMContentLoaded
    document.addEventListener('componentsLoaded', initClientCarousel);
}); 