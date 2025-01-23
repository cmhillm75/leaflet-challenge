// Creating the map object
let myMap = L.map("map", {
    center: [41, -87],
    zoom: 4
});

// Create the base layers of the map.
let stadiaGrey = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let stadiaSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object with Stadia maps and the topo map
let baseMaps = {
    "Stadia Grey": stadiaGrey,
    "Stadia Dark": stadiaDark,
    "Stadia Satellite": stadiaSatellite,
    "Topographic Map": topo
};

// Create the markers layer
let markers = L.markerClusterGroup();
myMap.addLayer(markers);

// Define a function to choose color based on magnitude and depth
function chooseColor(magnitude, depth) {
    let depthColor = depth > 70 ? "darkred" :
                     depth > 50 ? "red" :
                     depth > 30 ? "orange" :
                                  "yellow";
    return depthColor;
}

// Store our API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(data => {
    let earthquakes = data.features.map(feature => {
        let coords = feature.geometry.coordinates;
        let magnitude = feature.properties.mag;
        let depth = coords[2];
        let color = chooseColor(magnitude, depth);
        return L.circleMarker([coords[1], coords[0]], {
            radius: magnitude * 2,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5
        }).bindPopup(`
            <div>
                <h3>Magnitude: ${magnitude}</h3>
                <hr>
                <p>Depth: ${depth} km</p>
                <p>Location: ${feature.properties.place}</p>
                <p>${new Date(feature.properties.time)}</p>

            </div>
        `);
    });
    markers.addLayers(earthquakes);
});

// Create an overlay object to hold our overlay
let overlayMaps = {
    Earthquakes: markers
};

// Add layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
}).addTo(myMap);
