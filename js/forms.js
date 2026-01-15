/**
 * forms.js
 * Handles form submissions to Google Sheets via Google Apps Script.
 */

// Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // 1. Show Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // 2. Collect Data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Add Timestamp
            data.timestamp = new Date().toLocaleString();

            try {
                // 3. Send to Google Sheet (Note: 'no-cors' mode is standard for Google Forms/Scripts)
                // For a real custom script, we assume it returns JSONP or simple text.
                // Since we can't easily read response in 'no-cors', we assume success if no network error.

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                // 4. Show Success Message (Premium SweetAlert)
                Swal.fire({
                    title: 'Application Received!',
                    text: 'JazakAllah! We have received your details. Our team will contact you shortly.',
                    icon: 'success',
                    confirmButtonColor: '#0F3D3E', // Primary Green
                    background: '#FDFBF7',
                    customClass: {
                        title: 'font-heritage',
                        popup: 'heritage-card'
                    }
                });

                form.reset();

            } catch (error) {
                console.error('Error:', error);

                Swal.fire({
                    title: 'Submission Failed',
                    text: 'Please check your internet connection or try again later.',
                    icon: 'error',
                    confirmButtonColor: '#800020'
                });
            } finally {
                // 5. Reset Button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    });
});
