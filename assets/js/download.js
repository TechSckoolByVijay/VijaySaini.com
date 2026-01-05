// Download form handling with n8n webhook integration
document.addEventListener('DOMContentLoaded', () => {
    const downloadForm = document.getElementById('downloadForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    // n8n webhook configuration - injected from GitHub Secrets during deployment
    // No fallback values for security - requires n8n-config.js to be loaded
    const N8N_WEBHOOK_URL = window.N8N_CONFIG?.webhookUrl;
    const N8N_USERNAME = window.N8N_CONFIG?.username;
    const N8N_PASSWORD = window.N8N_CONFIG?.password;
    
    if (downloadForm) {
        downloadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                source: 'website',
                asset: 'devops-2026-curriculum'
            };

            // Validate form
            if (!formData.name || !formData.email) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            setLoadingState(true);
            hideMessage();

            try {
                // Create Basic Auth header
                const credentials = btoa(`${N8N_USERNAME}:${N8N_PASSWORD}`);
                
                // Send data to n8n webhook with authentication
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Success
                    showMessage(
                        '🎉 Success! Check your email for the DevOps 2026 Curriculum. ' +
                        'If you don\'t see it in a few minutes, please check your spam folder.',
                        'success'
                    );
                    downloadForm.reset();
                    
                    // Optional: Track conversion (Google Analytics, etc.)
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'download', {
                            'event_category': 'Lead Generation',
                            'event_label': 'DevOps 2026 Curriculum'
                        });
                    }
                } else {
                    // Server error
                    throw new Error('Server responded with an error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showMessage(
                    '❌ Oops! Something went wrong. Please try again or contact us directly at vijaysainiprofessional@gmail.com',
                    'error'
                );
            } finally {
                setLoadingState(false);
            }
        });
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideMessage();
            }, 10000);
        }
    }

    function hideMessage() {
        formMessage.style.display = 'none';
    }

    // Add input validation feedback
    const inputs = downloadForm.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'var(--error-color)';
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });

        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--border-color)';
        });
    });

    // Email-specific validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = 'var(--error-color)';
                showMessage('Please enter a valid email address.', 'error');
            } else {
                emailInput.style.borderColor = 'var(--border-color)';
                if (formMessage.textContent.includes('valid email')) {
                    hideMessage();
                }
            }
        });
    }
});
