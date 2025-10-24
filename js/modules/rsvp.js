// RSVP Module
// Handles form validation and Google Forms submission

// CONFIGURATION
// TODO: Replace with your actual Google Form URL and entry IDs
const GOOGLE_FORM_CONFIG = {
  // Get this URL from your Google Form's "Send" -> "Link" option
  // Then replace /viewform with /formResponse
  formUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  
  // Get these entry IDs by inspecting your Google Form's HTML
  // Right-click on your published form, view source, and search for "entry."
  fields: {
    name: 'entry.NAME_ID',      // Replace NAME_ID with actual number
    email: 'entry.EMAIL_ID',     // Replace EMAIL_ID with actual number
    phone: 'entry.PHONE_ID',     // Replace PHONE_ID with actual number
    attendance: 'entry.ATTENDANCE_ID',
    guests: 'entry.GUESTS_ID',
    dietary: 'entry.DIETARY_ID',
    message: 'entry.MESSAGE_ID'
  }
};

export function initRSVP() {
  const form = document.getElementById('rsvp-form');
  
  if (!form) {
    return; // Not on RSVP page
  }

  form.addEventListener('submit', handleSubmit);

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Validate all fields
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Submitting...';
  submitButton.disabled = true;

  try {
    // Submit to Google Forms
    await submitToGoogleForms(formData);

    // Show success message
    showMessage('success');
    form.reset();
    form.style.display = 'none';

  } catch (error) {
    console.error('Form submission error:', error);
    showMessage('error');

  } finally {
    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
}

async function submitToGoogleForms(formData) {
  // Note: Google Forms may block CORS requests
  // This implementation uses a form submission approach
  
  const form = document.getElementById('rsvp-form');
  
  // Create a hidden iframe for submission
  let iframe = document.getElementById('hidden-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.id = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  // Temporarily change form attributes
  const originalAction = form.action;
  const originalTarget = form.target;
  const originalMethod = form.method;

  form.action = GOOGLE_FORM_CONFIG.formUrl;
  form.target = 'hidden-iframe';
  form.method = 'POST';

  // Submit the form
  return new Promise((resolve, reject) => {
    iframe.onload = () => {
      // Restore original form attributes
      form.action = originalAction;
      form.target = originalTarget;
      form.method = originalMethod;
      
      resolve();
    };

    iframe.onerror = () => {
      // Restore original form attributes
      form.action = originalAction;
      form.target = originalTarget;
      form.method = originalMethod;
      
      reject(new Error('Form submission failed'));
    };

    // Trigger form submission
    form.submit();

    // Fallback timeout
    setTimeout(() => {
      resolve(); // Assume success if no error within 3 seconds
    }, 3000);
  });
}

function validateForm(form) {
  const fields = [
    form.querySelector('#name'),
    form.querySelector('#email'),
    form.querySelector('input[name="' + GOOGLE_FORM_CONFIG.fields.attendance + '"]:checked')
  ];

  let isValid = true;

  fields.forEach(field => {
    if (field && !validateField(field)) {
      isValid = false;
    }
  });

  // Validate at least one attendance option is selected
  const attendanceChecked = form.querySelector('input[name="' + GOOGLE_FORM_CONFIG.fields.attendance + '"]:checked');
  if (!attendanceChecked) {
    const errorSpan = document.getElementById('attendance-error');
    if (errorSpan) {
      errorSpan.textContent = 'Please select an option';
    }
    isValid = false;
  }

  return isValid;
}

function validateField(field) {
  if (!field) return true;

  const value = field.value.trim();
  let errorMessage = '';

  // Required field validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = 'This field is required';
  }

  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
    }
  }

  // Display error
  const errorSpan = document.getElementById(`${field.id}-error`);
  if (errorSpan) {
    errorSpan.textContent = errorMessage;
  }

  if (errorMessage) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    return true;
  }
}

function showMessage(type) {
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  if (type === 'success' && successMessage) {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else if (type === 'error' && errorMessage) {
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Scroll to message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Retry submission function
export function retrySubmission() {
  const form = document.getElementById('rsvp-form');
  if (form) {
    form.style.display = 'block';
    document.getElementById('form-error').style.display = 'none';
  }
}
