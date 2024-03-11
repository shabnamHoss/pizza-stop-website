/*
Author: Shabnam Hosseinzadeh
Course: ICT 4510 -  Adv Website Design & Mgmt
Quarter: Spring 2024

Description: building a map for about page
*/

// about page - Leaflet Map Script -about.JS
//  Set coordinates, zoom level of 15.

var map = L.map("map").setView([39.67838, -104.961753], 15);

// Add tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Add marker
var marker = L.marker([39.67838, -104.961753]).addTo(map);
marker.bindPopup("<b>University of Denver</b><br>2150 East Evans Avenue").openPopup(); // Add popup message to the marker
