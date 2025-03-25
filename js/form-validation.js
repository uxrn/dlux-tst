/**
 * Form validation for the contact form
 * Bootstrap 5 form validation implementation
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Get all forms with the 'needs-validation' class
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop through each form and add the validation event listener
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                // If the form is not valid, prevent submission
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                // Add the 'was-validated' class to show validation feedback
                form.classList.add('was-validated');
            }, false);
        });
}); 