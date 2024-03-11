/*
Author: Shabnam Hosseinzadeh
Course: ICT 4510 -  Adv Website Design & Mgmt
Quarter: Spring 2024

Description: This script manages the login process and administrative functionalities for the dashboard page.
It includes handling the login form, making Ajax POST requests to the login endpoint, processing responses, and managing user authentication. 
Upon successful login, it saves the user object containing essential information like username, first name, last name, API key, and session token to sessionStorage. 
Additionally, it handles the logout process by deleting the user object from sessionStorage and rendering the login form. 
Furthermore, it controls the rendering and submission of the food menu item form, ensuring that it only appears when the user is successfully logged in. 
The script facilitates the submission of new menu items via Ajax POST requests to the menu endpoint, including the necessary fields such as item, description, and price. 
These requests are authenticated with the session token included in the header, and a successful response results in a 201 HTTP status code.
*/
// dashboard.js
$(document).ready(function () {
    // If token is stored in session storage, show the menu form
    if (sessionStorage.getItem("user")) {
        $("#menuForm").show();
        $("#loginForm").hide();
        $("#logoutNavItem").show();
    } else {
        $("#menuForm").hide();
        $("#loginForm").show();
        $("#logoutNavItem").hide();
    }

    $("#loginForm").submit(function (event) {
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "https://ict4510.herokuapp.com/api/login",
            data: JSON.stringify({ username: username, password: password }),
            contentType: "application/json",
            success: function (response) {
                // Store user data in session storage
                sessionStorage.setItem("user", JSON.stringify(response.user));

                // Hide the login form and show the menu form
                $("#logoutNavItem").show();
                $("#loginForm").hide();
                $("#menuForm").show();
            },
            error: function (xhr, status, error) {
                alert("Login failed. Please try again.");
            },
        });
    });

    // Logout Process
    $("#logoutButton").click(function () {
        sessionStorage.removeItem("user");
        $("#menuForm").hide();
        $("#loginForm").show();
        $("#logoutNavItem").show();
    });

    // Menu Item Form Submission
    $("#menuItemForm").submit(function (event) {
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
                "x-access-token": user.token,
            },
            contentType: "application/json",
            success: function (response) {
                alert(`${response.message}!`);
                console.log(response.message);
            },
            error: function (xhr, status, error) {
                alert("Failed to add menu item. Please try again.");
            },
        });
    });
});
