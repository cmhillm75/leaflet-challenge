# leaflet-challenge
Module 15 homework - Create an earthquake visualization using USGS data and open source maps.

## Prerequisites

- Web browser
- Internet connection
- VS Code

## Data Source
[GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

## Maps
[Website: opentopomap.org](https://opentopomap.org/?form=MG0AV3#map=3/33.21/-30.41)
Attribution: © OpenStreetMap contributors (under ODbL) and SRTM | Map-rendering: © OpenTopoMap (CC-BY-SA).

© Stadia Maps © OpenMapTiles © OpenStreetMap[_{{{CITATION{{{_3{Legally Required Attribution - Stadia Maps Documentation](https://docs.stadiamaps.com/attribution/)[_{{{CITATION{{{_1{Attributions - Stadia Maps](https://stadiamaps.com/attribution).

© Stadia Maps © Stamen Design © OpenMapTiles © OpenStreetMap[_{{{CITATION{{{_3{Legally Required Attribution - Stadia Maps Documentation](https://docs.stadiamaps.com/attribution/)[_{{{CITATION{{{_4{maps.stamen.com](https://maps.stamen.com/).

© CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)[_{{{CITATION{{{_3{Legally Required Attribution - Stadia Maps Documentation](https://docs.stadiamaps.com/attribution/).

## Coding Project Description

Class Examples
Legend Creation (Night 2 Activity 04):

Par_SchoolDistrictChoropleth: This class example served as a basis for creating the legend in my project.

Tutor Assistance
Tutor: Fred

Help received: Fred assisted me in adjusting style.css and index.html to correct the formatting of the legend. Provided tips on setting up JavaScript, as the initial student setup lacked boundaries, a color strip, and labels.

Project Steps
Step 1: Create the Map Object

Center: Mid-USA (default), with a zoom level of 4.

Focus: Throughout class, we concentrated on the map's initiation.

Step 2: Differentiate Map Layers

Additional Options: Included gray, dark gray, and satellite image of the world map.

Base Layer Creation: Differentiated map layers per step 2 using above options.

Step 3: Setup Color Coding and Clustering

Cluster Group: Created using the Leaflet cluster group due to the significant seismic activity reported in the JSON data.

Color Setup: Followed Module 15 challenge parameters (colors: red, orange, yellow, green with intermediaries; depths: -10 to +90).

Testing: Faced issues with named colors not setting correctly, so used the color coding aid from W3Schools (link listed above).

Step 4: Store the API

Stored the API as a URL.

Step 5: Use D3 Library

Function Creation: Utilized the library to loop through the JSON data to grab coordinates, magnitude, and depth of earthquake data.

Metric Collection: Fulfilled challenge requirements by creating circle cluster markers, with radius based on earthquake size. The setup is similar to class activity "Night 2, 01_Evr_BasicNYBoroughs" under logic.3, where marker size depends on the incoming data (multiplied by magnitude in JSON data).

Step 6: Create Legend

Relied on two primary sources: Class example "04 Par_SchoolDistrictChoropleth," and tutor assistance.

Note: Student preference involved using => rather than the i++ for loop method.

Additional Information
Testing resources and color coding aid links are available through W3Schools.  

[Latitude/Longitude](https://stackoverflow.com/questions/13785466/default-center-on-united-states)

[Legend/Marker Colors](https://www.w3schools.com/colors/colors_hex.asp)

## Markers

[Leaflet Marker](https://github.com/Leaflet/Leaflet.markercluster)

## License

This project is licensed under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html)
