// Core concepts animation
function initCoreConceptsAnimation() {
    const coreConceptsSection = document.querySelector('.core-concepts');
    if (!coreConceptsSection) return; // Exit if section doesn't exist
    
    const words = {
        'S': 'Satisfying',
        'E1': 'Effective',
        'E2': 'Efficient',
        'A': 'Accessible',
        'I': 'Intuitive',
        'R': 'Robust'
    };

    let leaveTimeout; // Variable to store the timeout
    let isInDelayPeriod = false; // Track if we're in the delay period
    let isTyping = false; // Track if typing animation is in progress

    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Function to set mobile text
    function setMobileText() {
        if (isMobile()) {
            const letterGroups = coreConceptsSection.querySelectorAll('.letter-group');
            letterGroups.forEach((group, index) => {
                const letter = group.querySelector('span').textContent;
                const paragraph = group.querySelector('p');
                const word = words[letter + (letter === 'E' ? (index === 1 ? '1' : '2') : '')];
                paragraph.textContent = word;
            });
        }
    }

    // Set mobile text on load and resize
    setMobileText();
    window.addEventListener('resize', setMobileText);

    // Setup mouse enter event
    coreConceptsSection.addEventListener('mouseenter', function() {
        // Always clear timeout when mouse enters
        if (leaveTimeout) {
            clearTimeout(leaveTimeout);
        }

        // Reset delay period flag
        isInDelayPeriod = false;

        // Only proceed with animation if not on mobile
        if (!isMobile()) {
            const letterGroups = this.querySelectorAll('.letter-group');
            const hasVisibleText = Array.from(letterGroups).some(group => group.querySelector('p').textContent.length > 0);

            if (!hasVisibleText) {
                letterGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('active');
                        group.classList.remove('fade-out');
                        const letter = group.querySelector('span').textContent;
                        const paragraph = group.querySelector('p');
                        const word = words[letter + (letter === 'E' ? (index === 1 ? '1' : '2') : '')];
                        
                        // Type the word
                        let charIndex = 0;
                        const typingSpeed = 100;
                        paragraph.textContent = ''; // Clear the paragraph for desktop animation
                        isTyping = true;
                        
                        function typeWord() {
                            if (charIndex < word.length) {
                                paragraph.textContent += word[charIndex];
                                charIndex++;
                                setTimeout(typeWord, typingSpeed);
                            } else {
                                isTyping = false;
                                group.classList.add('typing-complete');
                                // If mouse has left and typing is complete, start the delay period
                                if (!coreConceptsSection.matches(':hover')) {
                                    startDelayPeriod();
                                }
                            }
                        }
                        
                        typeWord();
                    }, index * 200);
                });
            } else {
                // If text is already visible, just add active class back
                letterGroups.forEach(group => {
                    group.classList.add('active');
                    group.classList.remove('fade-out');
                });
            }
        }
    });

    // Setup mouse leave event
    coreConceptsSection.addEventListener('mouseleave', function() {
        // Only proceed with animation if not on mobile
        if (!isMobile()) {
            const letterGroups = this.querySelectorAll('.letter-group');
            
            // Only remove active class if not currently typing
            if (!isTyping) {
                letterGroups.forEach(group => {
                    group.classList.remove('active');
                    group.classList.remove('typing-complete');
                });
                startDelayPeriod();
            }
        }
    });

    function startDelayPeriod() {
        // Set flag for delay period
        isInDelayPeriod = true;

        // Set timeout to start fade out after 5 seconds
        leaveTimeout = setTimeout(() => {
            // Only proceed with fade out if mouse is not over the section
            if (!coreConceptsSection.matches(':hover')) {
                const letterGroups = coreConceptsSection.querySelectorAll('.letter-group');
                letterGroups.forEach(group => {
                    group.classList.remove('active');
                    group.classList.remove('typing-complete');
                    group.classList.add('fade-out');
                });

                // Clear text content after fade out animation completes
                setTimeout(() => {
                    letterGroups.forEach(group => {
                        const paragraph = group.querySelector('p');
                        paragraph.textContent = '';
                    });
                    isInDelayPeriod = false; // Reset the flag after delay
                }, 500); // Wait for fade out animation to complete
            } else {
                // If mouse is still over, reset the delay period
                isInDelayPeriod = false;
                startDelayPeriod();
            }
        }, 5000); // 5 second delay
    }
}

// Initialize on DOMContentLoaded or when components are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize immediately
    initCoreConceptsAnimation();
    
    // Also listen for componentsLoaded event in case the component is loaded after DOMContentLoaded
    document.addEventListener('componentsLoaded', initCoreConceptsAnimation);
}); 