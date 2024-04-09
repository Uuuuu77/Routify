// static/js/main.js

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

        if (event.target.id === 'updateLocationForm') {
            endpoint += `/${data.locationId}`;
            method = 'PUT';
        }

        // Send form data to server and handle response
        fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            alert(`Form ${event.target.id} submitted successfully.`);
        })
        .catch(error => console.error('Error:', error)); // Log any errors to console
    };

    // Add event listeners to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Show overlay when map container is clicked
    document.querySelector('.map-container').addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'flex';
    });

    // Close overlay when the close button is clicked
    document.getElementById('closeOverlayButton').addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
    });
});
