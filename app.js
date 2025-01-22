$(document).ready(function () {
    // Load the data from localStorage if any exists
    loadDataFromLocalStorage();

    // Form submit event
    $('#registrationForm').submit(function (event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get form data
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // Simple validation (can be extended)
        if (username && email && password) {
            // Create user object
            const user = {
                username: username,
                email: email,
                password: password
            };

            // Store user data in localStorage or array
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            // Send data to server via AJAX (mocked as POST request)
            $.ajax({
                url: 'mock_endpoint.php', // The endpoint for your POST request (you can use your backend API)
                type: 'POST',
                data: JSON.stringify(user),
                contentType: 'application/json',
                success: function (response) {
                    console.log('Data sent successfully:', response);
                    alert('User registered successfully!');
                    window.location.href = 'data-list.html'; // Redirect to data list page after registration
                },
                error: function (error) {
                    console.error('Error:', error);
                    alert('Error registering user.');
                }
            });

            // Clear the form
            $('#registrationForm')[0].reset();
        } else {
            alert('Please fill in all fields!');
        }
    });

    // Function to load data from localStorage and display
    function loadDataFromLocalStorage() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Loaded users from localStorage:', users);
    }
});
