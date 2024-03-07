// Leaflet Map Script
var map = L.map('map').setView([39.678380, -104.961753], 16); // Set initial map coordinates and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([39.678380, -104.961753]).addTo(map); // Add marker to the map at the specified coordinates
marker.bindPopup("<b>University of Denver</b><br>2150 East Evans Avenue").openPopup(); // Add popup message to the marker
