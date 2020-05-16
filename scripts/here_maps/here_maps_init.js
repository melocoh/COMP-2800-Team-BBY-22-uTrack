// Obtain API access
var platform = new H.service.Platform({
    'apikey': 'NuSS0LLRfq-yIKGU2XxMbQAEpWpwDWipt7WnSWcBYwU'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('homeMap'),
    defaultLayers.vector.normal.map, {
        /* Map Zoom Levels:
         *  0: World-wide (don't)
         *  5: Country-wide
         *  10: City-wide
         *  15: Street-wide
         *  20: Forgot
         */
        zoom: 15,
        /* can get latitude and longitude from Google Maps
         *  by right-clicking in the map and selecting 'What's Here?'
         *  then copy lat and long
         */

        // starting location of map
        center: {
            // set center to BCIT, Burnaby, BC
            // lat: 49.249394,
            // lng: -123.000788

            // set center to Metropolis at Metrotown, Burnaby, BC
            lat: 49.226980,
            lng: -123.000498
        },
        pixelRatio: window.devicePixelRatio || 1
    });

// Resizes map to fit entire container
window.addEventListener("resize", () => map.getViewPort().resize());

// Make the map interactive
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Center to BCIT, Burnaby BC (redundant code but still good template)
function setCenterBCIT() {
    // lat: 49.249394,
    // lng: -123.000788

    map.setCenter({
        lat: 49.249394,
        lng: -123.000788
    });
    map.setZoom(15);
}