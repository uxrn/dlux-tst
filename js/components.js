// Function to load HTML components
function loadComponent(url, elementId) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            return document.getElementById(elementId);
        });
}

// Function to set active nav link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    
    const workLink = document.getElementById('work-link');
    const contactLink = document.getElementById('contact-link');
    
    if (workLink && contactLink) {
        // Remove active class from all links
        workLink.classList.remove('active');
        contactLink.classList.remove('active');
        
        // Add active class to current page link
        if (currentPath.includes('/work/')) {
            workLink.classList.add('active');
        } else if (currentPath.includes('/contact/')) {
            contactLink.classList.add('active');
        }
    }
}

// Get appropriate path prefix based on current location
function getPathPrefix() {
    // Check if we're in a subdirectory by looking at the pathname
    const pathname = window.location.pathname;
    
    // If in a subdirectory like /contact/ or /work/, use relative path to go up one level
    if (pathname.includes('/contact/') || pathname.includes('/work/')) {
        return '../';
    } else {
        return './';
    }
}

// Function to initialize the navbar logo
function initNavbarLogo() {
    const logo = document.getElementById('navbar-logo');
    const pathPrefix = getPathPrefix();
    
    if (logo) {
        // Default logo (black version)
        logo.src = pathPrefix + 'images/deluxo-full-black.png';
        
        // Check if we're on the home page
        const isHomePage = document.body.classList.contains('home-page');
        
        if (isHomePage) {
            // Use white logo on home page initially
            logo.src = pathPrefix + 'images/deluxo-full-white.png';
            
            // Add scroll event listener for home page
            window.addEventListener('scroll', function() {
                const heroSection = document.querySelector('#hero');
                if (heroSection) {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    
                    if (window.scrollY > heroBottom - 100) {
                        document.querySelector('.navbar').classList.add('scrolled');
                        logo.src = pathPrefix + 'images/deluxo-full-black.png';
                    } else {
                        document.querySelector('.navbar').classList.remove('scrolled');
                        logo.src = pathPrefix + 'images/deluxo-full-white.png';
                    }
                }
            });
        }
    }
}

// Get component path based on current location
function getComponentPath() {
    return getPathPrefix() + 'components/';
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load promises array
    const loadPromises = [];
    
    // Get the component base path
    const componentPath = getComponentPath();
    
    // Load header
    if (document.getElementById('header-container')) {
        loadPromises.push(
            loadComponent(componentPath + 'header.html', 'header-container')
                .then(() => {
                    // After header is loaded, set active link
                    setActiveNavLink();
                    // Initialize navbar logo
                    initNavbarLogo();
                })
        );
    }
    
    // Load footer
    if (document.getElementById('footer-container')) {
        loadPromises.push(
            loadComponent(componentPath + 'footer.html', 'footer-container')
                .then(() => {
                    // Handle footer logo if needed
                    const footerLogo = document.getElementById('footer-logo');
                    if (footerLogo) {
                        footerLogo.src = getPathPrefix() + 'images/deluxo-full-white.png';
                    }
                })
        );
    }
    
    // Load core concepts section
    if (document.getElementById('core-concepts-container')) {
        loadPromises.push(
            loadComponent(componentPath + 'core-concepts.html', 'core-concepts-container')
        );
    }
    
    // Load clients section
    if (document.getElementById('clients-container')) {
        loadPromises.push(
            loadComponent(componentPath + 'clients.html', 'clients-container')
        );
    }
    
    // After all components are loaded
    Promise.all(loadPromises).then(() => {
        // Dispatch a custom event to notify that all components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    });
}); 