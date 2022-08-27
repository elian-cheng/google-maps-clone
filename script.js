const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoib2xlYW5kZXJhIiwiYSI6ImNsN2J0bXhudDE2eTUzb29sY2hoZ2g0MmgifQ.1QXsoyJPJOmQNFRozFHYCw";

// In oder to point the map to our own location, we will use browser geolocation with high accuracy
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

// Function to center the map to our current position
function setupMap(centerPosition) {
  // Getting the map object from Mapbox website
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: centerPosition,
    zoom: 15,
  });
  // Add zoom and rotation controls to the map.
  const navigationControls = new mapboxgl.NavigationControl();
  map.addControl(navigationControls);

  // Display navigation directions
  // Use the mapbox-gl-directions plugin to show results from the Mapbox Directions API.
  // Click the map to add an origin and destination, and use the toggle to switch among the available routing profiles.
  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN,
  });
  map.addControl(directionControls, "top-left");

  //  Add geocoder for search in Russian
  //   const geocoder = new MapboxGeocoder({
  //     accessToken: MAPBOX_ACCESS_TOKEN,
  //     language: "ru-RU", // Specify the language as Russian.
  //     mapboxgl: mapboxgl,
  //   });
  //   map.addControl(geocoder);

//   // Add buttons to switch between languages
//   document.getElementById("buttons").addEventListener("click", event => {
//     const language = event.target.id.substr("button-".length);
//     // Use setLayoutProperty to set the value of a layout property in a style layer.
//     // The three arguments are the id of the layer, the name of the layout property,
//     // and the new property value.
//     map.setLayoutProperty("country-label", "text-field", [
//       "get",
//       `name_${language}`,
//     ]);
//   });
}

// Define a successLocation function (to get our location successfully)
function successLocation(position) {
  // Setup function to zoom to our location, using latitude and longitude, passed by our browser geolocation tool
  setupMap([position.coords.longitude, position.coords.latitude]);
}

// Function to show errors, if we can't get a location
// This will lead to location on default coordianates [-2.24, 53.48], if we can't get the user's location
function errorLocation() {
  setupMap([-2.24, 53.48]);
}
