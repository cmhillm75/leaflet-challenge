# Leaflet-challenge

Module 15 homework - Creating an earthquake visualization using USGS data and open source maps in JavaScript. Applying knowledge gained from Modules 14 "Interactive Visualizations" and 15 "Mapping". Per challenge instructions created the "Leaflet-Part-1" folder, the static folders house `style.css` and `logic.js`. `The index.html` has been amended to apply
correct paths and adding the legend.

## Prerequisites

- Web browser
- Internet connection
- Visual Studio Code (VS Code)

## Data Source

[GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

## Maps

- [OpenTopoMap](https://opentopomap.org/?form=MG0AV3#map=3/33.21/-30.41)
  - Attribution: © OpenStreetMap contributors (under ODbL) and SRTM
  - Map-rendering: © OpenTopoMap (CC-BY-SA)
  
- [Stadia Maps](https://stadiamaps.com/attribution)
  - Attribution: © Stadia Maps, © OpenMapTiles, © OpenStreetMap

- [Stamen Design](https://maps.stamen.com/)
  - Attribution: © Stamen Design, © OpenMapTiles, © OpenStreetMap
  
- © CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)

## Legend Creation

- Inspired by [Leaflet Choropleth Legend Example](https://github.com/timwis/leaflet-choropleth/blob/gh-pages/examples/legend/demo.js)
- Styled using `style.css` template provided by tutoring guidance. USed course provided tutor "Fred" in assisting in setup of the css formatting. In using tutor and provided css example coupled with the chorpleth legend source, I adjusted the settings of my code for asethitically pleasing size.

```css
.legend {
  padding: 10px;
  line-height: 18px;
  color: #555;
  background-color: #fff;
  border-radius: 5px;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}

.legend ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.legend li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.color-box {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
```

## Coding Project Description

- Step 1: Create the Map Object - set center of map on approximation based on search using posting on Stack Overflow
and applied a zoom level of 4. Lines 1-5.
- Step 2: Create the base layers Stadia Dark, Satellite and Topographic. Then apply as the base map objects. Lines 7-25.
- Step 3: Choose the colors for the legend and circleMarkers. Utilized W3Schools link below in defining the colors assigned
to the the earthquake depths. Lines 27-35.
- Step 4: Create a URL query for the API, then use the D3 library to perform the get request. a. `d3.json(queryUrl)` performs the get request and obtains the JSON data. b. `.then(data=>)` processes the data once obtained. This is alternate to the class example of `for (let i = 0; i < marker_limit; i++)`. c. `let earthquakes=L.layerGroup` makes the layer to hold the circleMarkers based on the earthquake magnitude. d. `data.features.forEach(feature =>):` This loops through each feature coordinates, depth and magnitude then applys the color. e. `let circle = L.circleMarker([coords[0], coords[1]])` places the circles using the attributes of the coordinates to apply magnitude to the size of the cirlce (radius) and color based on the depth. f. the `.bindPopup` attaches the popup (circleMarker) giving a level 3 header, then a line using hr,
then the depth, location and the date/time of the earthquake. f. `earthquakes.addLayer(circle)` takes the above steps and places the marker on the map.
- Step 5: Add the earthquakes layer to the map `earthquakes.addTo(myMap)`.
- Step 6: Create the overlay object function to hold the eq data `let overlayMaps = {"Earthquakes": earthquakes}`.
- Step 7: Add the control to turn the earthquakes layer on and off from the tiles icon and switch between basemaps.

## Additional Resources

[Latitude/Longitude](https://stackoverflow.com/questions/13785466/default-center-on-united-states)

[Legend/Marker Colors](https://www.w3schools.com/colors/colors_hex.asp)

[CSS Formatting](https://www.w3schools.com/cssref/css_default_values.php)

## License

This project is licensed under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html)
