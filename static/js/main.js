document.addEventListener('DOMContentLoaded', () => {
    // Function to handle form submissions
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Extract form data and convert to JSON
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        // Determine endpoint and request method based on form ID
        let endpoint = '/my-endpoint'; // Replace with your actual endpoint
        let method = 'POST';

        if (event.target.id === 'routeFinderForm') {
            // Handle route finder form submission
            // Add your logic to handle route finding
            alert(`Finding route from ${data.start} to ${data.end}`);
        } else if (event.target.id === 'nearbyPlacesForm') {
            // Handle nearby places form submission
            // Add your logic to find nearby places
            alert(`Finding nearby places for ${data.nearby}`);
        } else if (event.target.id === 'myLocationForm') {
            // Handle my location form submission
            // Add your logic to get user's current location
            alert(`Getting current location`);
        } else {
            console.error('Form ID not recognized.');
            return;
        }
    };

    // Add event listeners to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Show sliding page overlay when Settings button is clicked
    document.getElementById('toggleSettingsButton').addEventListener('click', () => {
        document.querySelector('.sliding-page').style.display = 'block';
    });

    // Close sliding page overlay when the close button is clicked
    document.getElementById('closeSlidingPageButton').addEventListener('click', () => {
        document.querySelector('.sliding-page').style.display = 'none';
    });

    // Toggle dark mode when the theme button is clicked
    document.getElementById('toggleThemeButton').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
