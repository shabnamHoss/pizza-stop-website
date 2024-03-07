// scripts.js

// Function to handle login form submission
function handleLoginForm() {
    // Assuming you have a form with id "loginForm"
    $("#loginForm").submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get form data
        var formData = {
            username: $("input[name=username]").val(),
            password: $("input[name=password]").val(),
        };

        // Send AJAX POST request
        $.ajax({
            type: "POST",
            url: "https://ict4510.herokuapp.com/api/login",
            data: formData,
            success: function (response) {
                // Handle successful login
                sessionStorage.setItem("user", JSON.stringify(response.user));
                $("#loginForm").hide(); // Hide the login form
            },
            error: function (xhr, status, error) {
                // Handle login error
                console.error("Login failed:", error);
                alert("Login failed. Please try again.");
            },
        });
    });
}

// Function to handle logout
function handleLogout() {
    // Assuming you have a logout button with id "logoutBtn"
    $("#logoutBtn").click(function () {
        sessionStorage.removeItem("user");
        $("#loginForm").show(); // Show the login form
    });
}

// Function to handle food menu item form submission
function handleFoodMenuItemForm() {
    // Assuming you have a form with id "menuItemForm"
    $("#menuItemForm").submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Check if user is logged in
        var user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) {
            alert("Please login to add menu items.");
            return;
        }

        // Get form data
        var formData = {
            item: $("input[name=item]").val(),
            description: $("input[name=description]").val(),
            price: $("input[name=price]").val(),
        };

        // Send AJAX POST request
        $.ajax({
            type: "POST",
            url: "https://ict4510.herokuapp.com/api/menus?api_key=" + user.api_key,
            headers: {
                "x-access-token": user.session_token,
            },
            data: formData,
            success: function (response) {
                // Handle successful menu item addition
                alert("Menu item added successfully.");
            },
            error: function (xhr, status, error) {
                // Handle error
                console.error("Failed to add menu item:", error);
                alert("Failed to add menu item. Please try again.");
            },
        });
    });
}

// Function to fetch and display menu items
function fetchAndDisplayMenuItems() {
    // Check if user is logged in
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        return; // No need to fetch menu items if user is not logged in
    }

    // Send AJAX GET request
    $.ajax({
        type: "GET",
        url: "https://ict4510.herokuapp.com/api/menus?api_key=" + user.api_key,
        headers: {
            "x-access-token": user.session_token,
        },
        success: function (response) {
            // Assuming you have a div with id "menuItemsContainer" to display menu items
            var menuItemsContainer = $("#menuItemsContainer");
            menuItemsContainer.empty(); // Clear previous menu items

            // Display menu items
            response.forEach(function (item) {
                var menuItemHtml = '<div class="menu-item">';
                menuItemHtml += "<h3>" + item.item + "</h3>";
                menuItemHtml += "<p>" + item.description + "</p>";
                menuItemHtml += "<p>$" + item.price + "</p>";
                menuItemHtml += "</div>";
                menuItemsContainer.append(menuItemHtml);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch menu items:", error);
        },
    });
}

// Document ready function
$(document).ready(function () {
    // Call functions to handle form submissions and other functionalities
    handleLoginForm();
    handleLogout();
    handleFoodMenuItemForm();
    fetchAndDisplayMenuItems();
});

// Function to fetch and display menu items
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://ict4510.herokuapp.com/api/menus?api_key=<your-api-key>",
        success: function (response) {
            displayMenuItems(response);
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch menu items:", error);
            alert("Failed to fetch menu items. Please try again.");
        },
    });
});

function displayMenuItems(menuItems) {
    var menuItemsContainer = $("#menuItems");
    var menuHTML = "<ul>";
    menuItems.forEach(function (item) {
        menuHTML += "<li><strong>" + item.item + "</strong>: " + item.description + " - $" + item.price + "</li>";
    });
    menuHTML += "</ul>";
    menuItemsContainer.html(menuHTML);
}
