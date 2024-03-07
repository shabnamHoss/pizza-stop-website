// scripts.js

$(document).ready(function() {
    // Check if the user is already logged in
    const user = sessionStorage.getItem('user');
    if (user) {
        // Hide login form and show menu item form
        $('#loginForm').hide();
        $('#menuForm').show();
    } else {
        // Show login form and hide menu item form
        $('#loginForm').show();
        $('#menuForm').hide();
    }

    // Login form submission
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get username and password from form inputs
        const username = $('#username').val();
        const password = $('#password').val();

        // AJAX POST request to login endpoint
        $.ajax({
            url: 'https://ict4510.herokuapp.com/api/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password }),
            success: function(response) {
                // Save user object to sessionStorage
                sessionStorage.setItem('user', JSON.stringify(response));

                // Hide login form and show menu item form
                $('#loginForm').hide();
                $('#menuForm').show();
            },
            error: function(xhr, status, error) {
                // Handle login error (e.g., display error message)
                console.error(error);
            }
        });
    });

    // Logout process
    $('#logoutBtn').click(function() {
        // Remove user object from sessionStorage
        sessionStorage.removeItem('user');

        // Show login form and hide menu item form
        $('#loginForm').show();
        $('#menuForm').hide();
    });

    // Menu item form submission
    $('#menuItemForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get menu item details from form inputs
        const item = $('#item').val();
        const description = $('#description').val();
        const price = $('#price').val();

        // Get user object from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.token;

        // AJAX POST request to menu items endpoint
        $.ajax({
            url: `https://ict4510.herokuapp.com/api/menus?api_key=${user.api_key}`,
            method: 'POST',
            headers: {
                'x-access-token': token
            },
            contentType: 'application/json',
            data: JSON.stringify({ item, description, price }),
            success: function(response) {
                // Handle successful menu item addition (e.g., display success message)
                console.log('Menu item added successfully:', response);
            },
            error: function(xhr, status, error) {
                // Handle menu item addition error (e.g., display error message)
                console.error(error);
            }
        });
    });
});
