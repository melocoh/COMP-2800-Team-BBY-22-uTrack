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

        // currently set center to BCIT, Burnaby, BC
        center: {
            lat: 49.249394,
            lng: -123.000788
        }
    });

// Make the map interactive
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Center to BCIT, Burnaby BC (redundant code but still good template)
function setCenterBCIT() {
    // lat: 49.249394,
    // lng: -123.000788

    map.setCenter({lat: 49.249394,lng: -123.000788});
    map.setZoom(15);
}