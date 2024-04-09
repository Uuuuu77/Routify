// static/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Define the initializeMap function, which is called by the Google Maps API script
    window.initializeMap = () => {
        // Initialize the map using Google Maps API
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -1.280555, lng: 36.808945 }, // Center the map at Nairobi location
            zoom: 10 // Set the initial zoom level
        });

        // Add event listener to the Optimize Route button
        const optimizeButton = document.getElementById('optimizeButton');
        optimizeButton.addEventListener('click', () => {
            // Fetch optimization data from server and update map with optimized route
            fetch('/optimize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ locations: locations }) // Replace 'locations' with actual data
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error); // Display error message if optimization fails
                } else {
                    alert('Route optimized!'); // Display success message
                    // Update map with optimized route
                    const routeCoordinates = data.map(location => ({ lat: location.lat, lng: location.lng }));
                    const routePath = new google.maps.Polyline({
                        path: routeCoordinates,
                        geodesic: true,
                        strokeColor: '#0000FF',
                        strokeOpacity: 1.0,
                        strokeWeight: 3
                    });
                    routePath.setMap(map); // Show route on map
                }
            })
            .catch(error => console.error('Error:', error)); // Log any errors to console
        });

        // Show overlay when map is clicked
        document.getElementById('map').addEventListener('click', () => {
            document.getElementById('overlay').style.display = 'flex';
        });

        // Close overlay when the close button is clicked
        document.getElementById('closeOverlayButton').addEventListener('click', () => {
            document.getElementById('overlay').style.display = 'none';
        });

        // Handle form submissions
        ['locationSearchForm', 'nearbyPlacesForm', 'routeFinderForm', 'loginForm', 'createLocationForm', 'updateLocationForm'].forEach(formId => {
            document.getElementById(formId).addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission behavior

                // Extract form data and convert to JSON
                const formData = new FormData(event.target);
                const data = Object.fromEntries(formData);

                // Determine endpoint and request method based on form ID
                let endpoint = 'view/my_location_view'; // Replace with your actual endpoint
                let method = 'POST';

                if (formId === 'updateLocationForm') {
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
                    alert(`Form ${formId} submitted successfully.`);
                })
                .catch(error => console.error('Error:', error)); // Log any errors to console
            });
        });
    };
});
