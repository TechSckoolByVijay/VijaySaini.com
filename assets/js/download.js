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
    
    // Resource URLs mapping
    const resourceUrls = {
        'devops-curriculum': 'assets/resources/devops-2026-curriculum.pdf',
        'azure-cheat-sheet': 'assets/resources/azure-cheat-sheet.pdf',
        'kubernetes-guide': 'assets/resources/kubernetes-guide.pdf',
        'genai-playbook': 'assets/resources/genai-playbook.pdf',
        'all': 'assets/resources/all-resources.zip'
    };

    // Check if user has already unlocked resources
    checkUnlockedStatus();
    
    if (downloadForm) {
        downloadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                source: 'website',
                asset: 'all-resources'
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
                    // Success - unlock resources
                    unlockResources(formData.email);
                    showMessage(
                        '🎉 Success! All resources are now unlocked. Check your email for direct download links.',
                        'success'
                    );
                    downloadForm.reset();
                    
                    // Optional: Track conversion (Google Analytics, etc.)
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'download', {
                            'event_category': 'Lead Generation',
                            'event_label': 'All Resources Unlocked'
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

    // Handle individual resource downloads
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const resource = e.target.dataset.resource;
            if (!e.target.disabled) {
                downloadResource(resource);
            }
        });
    });

    // Handle bulk download
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', () => {
            downloadResource('all');
        });
    }

    function checkUnlockedStatus() {
        const unlockedEmail = localStorage.getItem('resourcesUnlocked');
        const unlockedTime = localStorage.getItem('resourcesUnlockedTime');
        
        if (unlockedEmail && unlockedTime) {
            const daysSinceUnlock = (Date.now() - parseInt(unlockedTime)) / (1000 * 60 * 60 * 24);
            
            // Keep unlocked for 7 days
            if (daysSinceUnlock < 7) {
                enableResourceDownloads();
                updateUIForUnlocked(unlockedEmail);
            } else {
                // Expired - clear storage
                localStorage.removeItem('resourcesUnlocked');
                localStorage.removeItem('resourcesUnlockedTime');
            }
        }
    }

    function unlockResources(email) {
        localStorage.setItem('resourcesUnlocked', email);
        localStorage.setItem('resourcesUnlockedTime', Date.now().toString());
        enableResourceDownloads();
        updateUIForUnlocked(email);
    }

    function enableResourceDownloads() {
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.disabled = false;
            btn.innerHTML = '📥 Download';
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
        });

        // Show bulk download
        const bulkDownload = document.getElementById('bulkDownload');
        if (bulkDownload) {
            bulkDownload.style.display = 'block';
        }
    }

    function updateUIForUnlocked(email) {
        const subtitle = document.getElementById('resourcesSubtitle');
        if (subtitle) {
            subtitle.textContent = `Resources unlocked for ${email} ✅`;
            subtitle.style.color = 'var(--success-color)';
        }

        // Optionally hide the form or show a "Already unlocked" message
        const formContainer = document.querySelector('.download-form-container');
        if (formContainer) {
            formContainer.innerHTML = `
                <div class="success-state">
                    <h3>✅ Resources Unlocked!</h3>
                    <p>You can now download any resource below.</p>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">
                        Unlocked for: <strong>${email}</strong>
                    </p>
                </div>
            `;
        }
    }

    function downloadResource(resourceKey) {
        const url = resourceUrls[resourceKey];
        if (url) {
            // Create temporary link and trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = url.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Track download
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Resource Download',
                    'event_label': resourceKey
                });
            }
        } else {
            showMessage('Resource not available yet. Coming soon!', 'warning');
        }
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
