// Text effect animation for the hero section
document.addEventListener('DOMContentLoaded', function() {
    const shapeText = document.getElementById('shape-text');
    if (!shapeText) return; // Exit if element doesn't exist

    const words = ["Style", "Shape", "Design", "Build", "Create", "Grow"];
    let currentWord = 0;
    let isDeleting = false;
    let charIndex = 0;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const wordChangeDelay = 2000;

    function updateTextStyle() {
        if (isDeleting) {
            // Deleting effect
            if (charIndex > 0) {
                shapeText.textContent = words[currentWord].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(updateTextStyle, deletingSpeed);
            } else {
                isDeleting = false;
                currentWord = (currentWord + 1) % words.length;
                setTimeout(updateTextStyle, wordChangeDelay);
            }
        } else {
            // Typing effect
            if (charIndex < words[currentWord].length) {
                shapeText.textContent = words[currentWord].substring(0, charIndex + 1);
                charIndex++;
                setTimeout(updateTextStyle, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(updateTextStyle, wordChangeDelay);
            }
        }
    }

    // Start the animation
    updateTextStyle();
}); 