// Form validation and submission
function initFormValidation() {
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        setupRealTimeValidation(contactForm);
    }

    // Enquiry form validation for user input
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleEnquirySubmit);
        setupRealTimeValidation(enquiryForm);
    }
}

function setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    // Message length validation
    if (field.name === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }

    if (!isValid) {
        showError(field, errorMessage);
    }

    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(e) {
    const field = e.target || e;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Validate all fields
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showFormMessage(form, 'Please correct the errors above', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission
        await simulateAPICall();
        
        // Compile email (in a real scenario, this would be handled by a backend)
        const formData = new FormData(form);
        const emailContent = compileEmailContent(formData);
        
        showFormMessage(form, 'Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        form.reset();
        
        // In a real implementation, you would send the email here
        console.log('Email content:', emailContent);
        
    } catch (error) {
        showFormMessage(form, 'Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handleEnquirySubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Validate all fields
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showFormMessage(form, 'Please correct the errors above', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    try {
        await simulateAPICall();
        
        const enquiryType = form.querySelector('#enquiry-type').value;
        const response = generateEnquiryResponse(enquiryType, form);
        
        showFormMessage(form, response, 'success');
        form.reset();
        
    } catch (error) {
        showFormMessage(form, 'Sorry, there was an error processing your enquiry. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function compileEmailContent(formData) {
    return `
        New Contact Form Submission:
        
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Phone: ${formData.get('phone')}
        Subject: ${formData.get('subject')}
        
        Message:
        ${formData.get('message')}
    `;
}

function generateEnquiryResponse(enquiryType, form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    
    const responses = {
        'general': `Thank you ${name}! We've received your general enquiry and will respond within 24 hours.`,
        'catering': `Thank you ${name}! Our catering team will contact you within 2 hours to discuss your requirements. Standard catering packages start from R150 per person.`,
        'events': `Thank you ${name}! We'll check availability for your event and get back to you shortly. Our venue can accommodate up to 50 guests.`,
        'wholesale': `Thank you ${name}! Our wholesale manager will contact you with pricing for our premium coffee beans. Minimum order: 5kg.`,
        'feedback': `Thank you ${name} for your valuable feedback! We appreciate you helping us improve.`
    };
    
    return responses[enquiryType] || 'Thank you for your enquiry! We will get back to you soon.';
}

function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    form.insertBefore(messageElement, form.querySelector('button[type="submit"]'));
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function simulateAPICall() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}