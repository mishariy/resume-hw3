// Wait for the document to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 1. Contact Form Validation
    setupContactFormValidation();
    
    // 2. Dynamic Projects Feature
    setupShowMoreProjects();
    
    // 3. CV Page Toggle Skills
    setupToggleSkills();
    
    // 4. Dynamic Time-based Greeting
    displayTimeBasedGreeting();
    
    // Setup Mobile Menu Toggle (from your original code)
    setupMobileMenu();
});

// Mobile menu toggle functionality
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
}

// 1. Contact Form Validation
function setupContactFormValidation() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent form from submitting by default
            event.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset previous error messages
            clearErrorMessages();
            
            // Validate all fields
            let isValid = true;
            
            // Check if name is empty
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Check if email is empty or invalid
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Check if message is empty or too short
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If all validations pass, submit the form
            if (isValid) {
                contactForm.submit();
            }
        });
    }
}

// Helper function to validate email format
function isValidEmail(email) {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Helper function to display error message
function showError(inputElement, message) {
    // Create error message element
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
    errorElement.style.margin = '5px 0 0 0';
    
    // Insert error message after the input element
    inputElement.parentNode.appendChild(errorElement);
    
    // Highlight the input field
    inputElement.style.borderColor = 'red';
}

// Helper function to clear all error messages
function clearErrorMessages() {
    // Remove all error message elements
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.remove();
    });
    
    // Reset input field styles
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.style.borderColor = '';
    });
}

// 2. Dynamic Projects Feature
function setupShowMoreProjects() {
    const projectsContainer = document.querySelector('.portfolio-container');
    const mainElement = document.querySelector('main');
    
    if (projectsContainer) {
        // Create "Show More Projects" button
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More Projects';
        showMoreButton.className = 'btn show-more-btn';
        showMoreButton.style.margin = '20px auto';
        showMoreButton.style.display = 'block';
        
        // Insert button after portfolio container
        projectsContainer.parentNode.insertBefore(showMoreButton, projectsContainer.nextSibling);
        
        // Add click event to the button
        showMoreButton.addEventListener('click', function() {
            // Create a new project card
            addNewProject();
            
            // Hide the button after adding the project
            showMoreButton.style.display = 'none';
        });
    }
}

// Function to add a new project dynamically
function addNewProject() {
    const projectsContainer = document.querySelector('.portfolio-container');
    
    if (projectsContainer) {
        // Create new project card
        const newProject = document.createElement('div');
        newProject.className = 'project-card';
        
        // Set project content
        newProject.innerHTML = `
           <!-- Task Management App -->
                <img src="assets/images/task_app.jpg" alt="Task Management App">
                <div class="project-content">
                    <h5>Task Management</h5>
                    <p>Trello-like task management app developed for the cybersecurity club at King Saud University.</p>
                    <time>Oct 2024</time>
                    <a href="https://github.com/misharii/taskmanagementapp.git" class="btn">Visit Project</a>
                </div>
        `;
        
        // Add animation effect
        newProject.style.opacity = '0';
        newProject.style.transform = 'translateY(20px)';
        newProject.style.transition = 'opacity 0.5s, transform 0.5s';
        
        // Add new project to container
        projectsContainer.appendChild(newProject);
        
        // Force repaint to apply animation
        setTimeout(function() {
            newProject.style.opacity = '1';
            newProject.style.transform = 'translateY(0)';
        }, 10);
    }
}

// 3. CV Page Toggle Skills
function setupToggleSkills() {
    const skillsSection = document.querySelector('.skills-grid');
    
    if (skillsSection) {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Skills';
        toggleButton.className = 'btn toggle-skills-btn';
        toggleButton.style.marginTop = '10px';
        
        // Insert button before skills grid
        skillsSection.parentNode.insertBefore(toggleButton, skillsSection);
        
        // Add click event to the button
        toggleButton.addEventListener('click', function() {
            // Toggle skills section visibility
            if (skillsSection.style.display === 'none') {
                skillsSection.style.display = 'grid';
                toggleButton.textContent = 'Hide Skills';
            } else {
                skillsSection.style.display = 'none';
                toggleButton.textContent = 'Show Skills';
            }
        });
    }
}

// 4. Dynamic Time-based Greeting
function displayTimeBasedGreeting() {
    const profileSection = document.querySelector('.hero');
    
    if (profileSection && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Get current hour
        const currentHour = new Date().getHours();
        
        // Determine greeting based on time
        let greeting = 'Welcome';
        
        if (currentHour < 12) {
            greeting = 'Good morning!';
        } else if (currentHour < 18 && currentHour >= 12) {
            greeting = 'Good afternoon!';
        } else {
            greeting = 'Good evening!';
        }
        
        // Create greeting element
        const greetingElement = document.createElement('div');
        greetingElement.className = 'greeting';
        greetingElement.textContent = greeting;
        greetingElement.style.fontSize = '24px';
        greetingElement.style.fontWeight = 'bold';
        greetingElement.style.marginBottom = '15px';
        greetingElement.style.color = '#4a89dc';
        
        // Insert greeting at the top of profile section
        profileSection.insertBefore(greetingElement, profileSection.firstChild);
    }
}