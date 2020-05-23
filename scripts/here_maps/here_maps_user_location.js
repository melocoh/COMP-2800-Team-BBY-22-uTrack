/** Holds the user location's latitude value. */
var latData;

/** Holds the user location's longitude value. */
var lngData;

/** Holds the user DOM marker. */
var userMarker;

/**
 * Gets the user's location.
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

/**
 * Shows the user's position via latitude and longitude values.
 * @param {*} position 
 */
function showPosition(position) {
    // saves data in these variables
    latData = position.coords.latitude;
    lngData = position.coords.longitude;

    console.log("Latitude: " + latData +
        "\nLongitude: " + lngData);
}

/**
 * Adds a marker to indicate the user's current location.
 * @param {H.map} map 
 */
function addUserMarker(map) {
    console.log("inside addUserMarker()");
    
    // instantiate HTML Elements (map marker elements MUST be made using DOM)

    // holds outer div of map marker
    let outerDiv = document.createElement("div");
    
    // holds inner div of map marker
    let innerDiv = document.createElement("img");

    // holds image download url through the local storage
    let imgURL = localStorage.getItem("avatarURL");

    console.log(imgURL);

    $(innerDiv).attr("src", imgURL);

    // style marker image
    $(innerDiv).css({
        "width": "100px",
        "height": "100px"
    });

    // Append to Parent Div
    outerDiv.appendChild(innerDiv);

    // Instantiate DOM Icon
    let domIcon = new H.map.DomIcon(outerDiv);

    // sets user marker to the newly created DOM marker
    userMarker = new H.map.DomMarker({
        lat: latData,
        lng: lngData
    }, {
        icon: domIcon
    });

    // Add the user marker to the map
    map.addObject(userMarker);

    // Sets the map center to the user marker
    setCenterToUser(map);
}

/**
 * Sets map center to user's current location.
 * @param {H.Map} map 
 */
function setCenterToUser(map) {
    map.setCenter({
        lat: latData,
        lng: lngData
    }, true);
}

/**
 * Remove the user marker from the map.
 * @param {H.Map} map 
 */
function removeUserMarker(map) {
    // removes object from the map
    map.removeObject(userMarker);

    console.log("removed user marker from map");
    console.log("userMarker: " + userMarker);
}

/**
 * Shows error messages via alert.
 * @param {Error} error 
 */
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessages = "User denied the request for Geolocation."
            alert(errorMessages);
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            alert(errorMessage);
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out."
            alert(errorMessage);
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred."
            alert(errorMessage);
            break;
    }
}

$(document).ready(() => {
    /* Promise object that ensures the addition of user marker
        is placed after getting the user location */
    let markerPromise = new Promise((req, res) => {
        console.log("starting promise");
        getLocation();
        console.log("ending promise");
    });

    // Mouseclick event listener for location button
    $("#reportButton").click(() => {
        // If a user marker already exists, delete it
        if (userMarker !== undefined) {
            removeUserMarker(map);
        }

        markerPromise.then(
            addUserMarker(map)
        );
    });
});