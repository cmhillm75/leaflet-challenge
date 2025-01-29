// Creating the map object
let myMap = L.map("map", {
    center: [40, -85],
    zoom: 4
});

// Create the base layers of the map.
let stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap); // Set stadiaDark as the primary base layer

let stadiaSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object with the remaining maps
let baseMaps = {
    "Stadia Dark": stadiaDark,
    "Stadia Satellite": stadiaSatellite,
    "Topographic Map": topo
};

// Define a function to choose color based on depth
function chooseColor(depth) {
    if (depth > 90) return "#FF0000"; // Red 
    if (depth > 70) return "#FF4500"; // OrangeRed
    if (depth > 50) return "#FFA500"; // Orange
    if (depth > 30) return "#FFFF00"; // Yellow
    if (depth > 10) return "#9ACD32"; // GreenYellow
    return "#008000";                 // Green
}

// Store the API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL & make a layerGroup to hold the earthquake markers
d3.json(queryUrl).then(data => {
    let earthquakes = L.layerGroup(); 

    data.features.forEach(feature => {
        let coords = feature.geometry.coordinates;
        let depth = coords[2];
        let magnitude = feature.properties.mag;
        let color = chooseColor(depth);
        
        let circle = L.circleMarker([coords[1], coords[0]], {
            radius: magnitude * 2.25,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        }).bindPopup(`
            <div>
                <h3>Magnitude: ${magnitude}</h3>
                <hr>
                <p>Depth: ${depth} km</p>
                <p>Location: ${feature.properties.place}</p>
                <p>${new Date(feature.properties.time)}</p>
            </div>
        `);

        earthquakes.addLayer(circle);
    });

    earthquakes.addTo(myMap); // Add the earthquake layer to the map

    // Create an overlay object to hold the earthquake data layer
    let overlayMaps = {
        "Earthquakes": earthquakes // overlayMaps is named and assigned
    };

    // Add layer control to the map  - uses tiles icon to choose layers and earthquakes on/off.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);
});

// Create the Earthquake depth legend
function createLegend() {
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
        let div = L.DomUtil.create("div", "legend");
        let depths = [-10, 10, 30, 50, 70, 90];

        div.innerHTML = '<h3> Depth (km)</h3>';

        // Create legend items using .map() and arrow functions
        let legendItems = depths.map((depth, index) => {
            let nextDepth = depths[index + 1];
            return `<li>
                        <span class="color-box" style="background:${chooseColor(depth + 1)}"></span>
                        ${depth}${nextDepth ? `&ndash;${nextDepth}` : '+'} km
                    </li>`;
        }).join('');

        div.innerHTML += `<ul>${legendItems}</ul>`;
        return div;
    };

    legend.addTo(myMap);
}

// Call the createLegend function to add the legend to the map
createLegend();