// Form action page script - displays submitted form data
document.addEventListener('DOMContentLoaded', () => {
    const formDataDisplay = document.getElementById('form-data-display');
    
    if (!formDataDisplay) return;
    
    // Get form data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const formData = {};
    
    for (const [key, value] of urlParams) {
        formData[key] = value;
    }
    
    // Display form data
    if (Object.keys(formData).length > 0) {
        let html = '<div class="form-data-summary"><h2>Your Submission</h2><ul>';
        
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'newsletter') {
                html += `<li><strong>Newsletter Subscription:</strong> ${value ? 'Yes' : 'No'}</li>`;
            } else {
                html += `<li><strong>${formatFieldName(key)}:</strong> ${value}</li>`;
            }
        }
        
        html += '</ul></div>';
        formDataDisplay.innerHTML = html;
    } else {
        formDataDisplay.innerHTML = '<p>No form data received.</p>';
    }
});

function formatFieldName(fieldName) {
    return fieldName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}