// Initialize Vanta.js animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize birds effect on hero section
    const heroElement = document.getElementById('hero');
    if (heroElement && typeof VANTA !== 'undefined' && VANTA.BIRDS) {
        VANTA.BIRDS({
            el: heroElement,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            speedLimit: 4.00,
            wingSpan: 10.00,
            separation: 100.00,
            alignment: 100.00,
            cohesion: 100.00,
            quantity: 5.00,
            color1: 0xffffff,
            color2: 0x000000,
            color3: 0x000000,
            backgroundColor: 0x212529
        });
    }
}); 