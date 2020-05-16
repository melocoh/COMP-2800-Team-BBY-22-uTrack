/** Geolocation of user */
// var x = document.getElementById("demo");

/** Holds the user location's latitude value */
var latData;

/** Holds the user location's longitude value */
var lngData;

/** Holds the user DOM marker */
var userMarker;

$(document).ready(() => {
    /* Promise object that ensures the addition of user marker
        is placed after getting the user location */
    let markerPromise = new Promise((req, res) => {
        console.log("starting promise");
        getLocation();
        console.log("ending promise");
        // res("Success");
    });

    // Mouseclick event listener for location button
    $("#reportButton").click(() => {
        // removeUserMarker(map);
        // console.log("getting user location");
        // getLocation();
        // console.log("adding user marker");
        // addUserMarker(map);

        // If a user marker already exists, delete it
        if (userMarker !== undefined) {
            removeUserMarker(map);
        }

        markerPromise.then(
            addUserMarker(map)
        );
    });
});

/**
 * Gets the user's location
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

/**
 * Shows the user's position via latitude and longitude values
 * @param {} position 
 */
function showPosition(position) {

    // saves data in these variables
    latData = position.coords.latitude;
    lngData = position.coords.longitude;

    // test: prints out location tracking
    console.log("Latitude: " + latData +
        "\nLongitude: " + lngData);


}

/**
 * Adds a marker to indicate the user's current location
 * @param {H.map} map 
 */
function addUserMarker(map) {
    console.log("inside addUserMarker()");

    // Instantiate HTML Elements
    // let outerDiv = $("<div></div>");
    let outerDiv = document.createElement("div");
    // let innerDiv = $("<img>");
    let innerDiv = document.createElement("img");

    // Set image
    let imgURL = "https://dummyimage.com/50x50/000/fff.jpg";
    $(innerDiv).attr("src", imgURL);

    // Append to Parent Div
    outerDiv.appendChild(innerDiv);

    // Instantiate DOM Icon
    let domIcon = new H.map.DomIcon(outerDiv
        // , {
        // the function is called every time marker enters the viewport
        // onAttach: function(clonedElement, domIcon, domMarker) {
        //   clonedElement.addEventListener('mouseover', changeOpacity);
        //   clonedElement.addEventListener('mouseout', changeOpacityToOne);
        // },
        // // the function is called every time marker leaves the viewport
        // onDetach: function(clonedElement, domIcon, domMarker) {
        //   clonedElement.removeEventListener('mouseover', changeOpacity);
        //   clonedElement.removeEventListener('mouseout', changeOpacityToOne);
        // }
        //   }
    );

    userMarker = new H.map.DomMarker({
        // lat: 49.249394,
        // lng: -123.000788
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

function setCenterToUser(map) {
    map.setCenter({
        lat: latData,
        lng: lngData
    }, true);
}

function removeUserMarker(map) {
    map.removeObject(userMarker);
    console.log("removed user marker from map");
    console.log("userMarker: " + userMarker);
}

/**
 * Shows error messages via alert
 * @param {} error 
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