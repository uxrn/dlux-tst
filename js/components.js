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
    const currentPage = window.location.pathname.split('/').pop();
    
    const workLink = document.getElementById('work-link');
    const contactLink = document.getElementById('contact-link');
    
    if (workLink && contactLink) {
        // Remove active class from all links
        workLink.classList.remove('active');
        contactLink.classList.remove('active');
        
        // Add active class to current page link
        if (currentPage === 'work.html') {
            workLink.classList.add('active');
        } else if (currentPage === 'contact.html') {
            contactLink.classList.add('active');
        }
    }
}

// Function to handle home page specific navbar behavior
function setupHomePageNavbar() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const logo = document.getElementById('navbar-logo');
    
    if (body.classList.contains('home-page') && navbar && logo) {
        // Set initial logo for home page
        logo.src = './images/deluxo-full-white.png';
        
        // Add scroll event listener for home page
        window.addEventListener('scroll', function() {
            const heroSection = document.querySelector('#hero');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                
                if (window.scrollY > heroBottom - 100) {
                    navbar.classList.add('scrolled');
                    logo.src = './images/deluxo-full-black.png';
                } else {
                    navbar.classList.remove('scrolled');
                    logo.src = './images/deluxo-full-white.png';
                }
            }
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load promises array
    const loadPromises = [];
    
    // Load header
    if (document.getElementById('header-container')) {
        loadPromises.push(
            loadComponent('components/header.html', 'header-container')
                .then(() => {
                    // After header is loaded, set active link
                    setActiveNavLink();
                    // Setup home page specific navbar behavior
                    setupHomePageNavbar();
                })
        );
    }
    
    // Load footer
    if (document.getElementById('footer-container')) {
        loadPromises.push(
            loadComponent('components/footer.html', 'footer-container')
        );
    }
    
    // Load core concepts section
    if (document.getElementById('core-concepts-container')) {
        loadPromises.push(
            loadComponent('components/core-concepts.html', 'core-concepts-container')
        );
    }
    
    // Load clients section
    if (document.getElementById('clients-container')) {
        loadPromises.push(
            loadComponent('components/clients.html', 'clients-container')
        );
    }
    
    // After all components are loaded
    Promise.all(loadPromises).then(() => {
        // Dispatch a custom event to notify that all components are loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    });
}); 