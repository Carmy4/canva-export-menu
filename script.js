document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-btn');
    const statusMessage = document.getElementById('status-message');
    const allPages = document.getElementById('page-all');
    const currentPage = document.getElementById('page-current');

    downloadButton.addEventListener('click', () => {
        statusMessage.textContent = '';
        statusMessage.className = '';

        if (!navigator.onLine) {
            statusMessage.textContent = 'No internet connection. Please check your network.';
            statusMessage.classList.add('error-state');
            return;
        }

        const isPageSelected = allPages.checked || currentPage.checked;
        if (!isPageSelected) {
            statusMessage.textContent = 'Please select at least one page to download.';
            statusMessage.classList.add('error-state');
            return;
        }

        downloadButton.disabled = true;
        downloadButton.textContent = 'Preparing download...';
        statusMessage.textContent = 'Generating your file, please wait...';
        statusMessage.classList.add('loading-state');

        setTimeout(() => {
            statusMessage.textContent = 'Download complete successfully!';
            statusMessage.className = ''; 
            statusMessage.classList.add('success-state');
            
            downloadButton.disabled = false; 
            downloadButton.textContent = 'Download';
        }, 2000);
    });
});