/*
Author: Shabnam Hosseinzadeh
Course: ICT 4510 -  Adv Website Design & Mgmt
Quarter: Spring 2024

Description: This script handles the retrieval and display of food menu items on the Menu page. 
It initiates an Ajax GET request to the designated endpoint "https://ict4510.herokuapp.com/api/menus?api_key=" to fetch the menu items from the server. 
Upon receiving a successful response with a 200 HTTP status code and a JSON response containing the list of menu items, 
the script processes and renders these items on the page.*/

//menu page - menu.js
// hide & Show Logout Icon
$(document).ready(function () {
    if (sessionStorage.getItem("user")) {
        $("#logoutNavItem").show();
    } else {
        $("#logoutNavItem").hide();
    }

    var user = JSON.parse(sessionStorage.getItem("user"));

    $.ajax({
        url: "https://ict4510.herokuapp.com/api/menus?api_key=" + user.api_key,
        method: "GET",
        success: function (response) {
            if (response && response.menu) {
                $("#dynamic-menu-items").empty();
                response.menu.forEach(function (menuItem) {
                    // index of menuItem
                    var index = response.menu.indexOf(menuItem);

                    var menuItemHtml = `
                        <div class="col-md-6">
                            <div class="single_menu">
                                <img src="./img/${index}.jpg" alt="${menuItem.item}" />
                                <div class="menu_content">
                                    <h4>${menuItem.item} <span>$${menuItem.price}</span></h4>
                                    <p>${menuItem.description}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#dynamic-menu-items").append(menuItemHtml);
                });
            } else {
                $("#dynamic-menu-items").html("<p>No menu items available</p>");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching menu items:", error);
            $("#dynamic-menu-items").html("<p>Error fetching menu items. Please try again later.</p>");
        },
    });
});
