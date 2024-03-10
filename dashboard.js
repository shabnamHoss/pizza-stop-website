// dashboard.js 
$(document).ready(function() {
    // Login Form Submission
   
$("#loginForm").submit(function(event) {
    event.preventDefault();
    
    var username = $("#username").val();
    var password = $("#password").val();
    
    $.ajax({
        type: "POST",
        url: "https://ict4510.herokuapp.com/api/login",
        data: JSON.stringify({ username: username, password: password }),
        contentType: "application/json",
        success: function(response) {
            // Show the logout button after successful login
            $("#logoutNavItem").show();
            
            // Store user data in session storage
            sessionStorage.setItem("api_key", JSON.stringify(response.user.api_key));
            sessionStorage.setItem("token", JSON.stringify(response.user.token));
            
            // Hide the login form and show the menu form
            $("#loginForm").hide();
            $("#menuForm").show();
        },
        error: function(xhr, status, error) {
            alert("Login failed. Please try again.");
        }
    });
});

    
    // Logout Process
    $("#logoutButton").click(function() {
        sessionStorage.removeItem("user");
        $("#menuForm").hide();
        $("#loginForm").show();
    });
    
    // Menu Item Form Submission
    $("#menuItemForm").submit(function(event) {
        event.preventDefault();
        
        var user = JSON.parse(sessionStorage.getItem("user"));
        var item = $("#item").val();
        var description = $("#description").val();
        var price = $("#price").val();
        
        $.ajax({
            type: "POST",
            url: "https://ict4510.herokuapp.com/api/menus?api_key=" + user.api_key,
            data: JSON.stringify({ item: item, description: description, price: price }),
            headers: {
                "x-access-token": user.session_token
            },
            contentType: "application/json",
            success: function(response) {
                alert("Menu item added successfully!");
            },
            error: function(xhr, status, error) {
                alert("Failed to add menu item. Please try again.");
            }
        });
    });
});


