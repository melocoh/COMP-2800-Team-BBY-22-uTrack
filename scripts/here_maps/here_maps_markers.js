/** Firebase Store Collection Reference */
var allStores = db.collection("stores");

/** Array that holds all stores with valid locations (lat and long) */
var locStores = [];

/** Holds current store */
var store;

/**
 * Gets all the stores and stores them into the localStores[] array
 */
function getAllStores() {
    allStores.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let hasLoc = doc.get("lat");
            console.log("hasLoc: " + hasLoc);

            if (hasLoc !== undefined) {
                console.log(doc);
                locStores.push(doc);
            } else {
                console.log("no lat");
            }
        });
        console.log(locStores);

        // add the DOM map markers once all valid stores have been pushed
        addMarkers(map);
    });

}

/**
 * Adds the DOM map markers to the map.
 * @param {H.Map} map 
 */
function addMarkers(map) {
    console.log("inside addMarkers(map)");

    // holds the id of iterated map markers
    let curId = 1;

    // loop through array of valid stores
    for (let i = 0; i < locStores.length; i++) {
        console.log("inside for loop");

        // Current store
        store = locStores[i];

        console.log(store);

        // holds the contents of map marker
        let card = document.createElement("div");
        // Holds the text
        let text_div = document.createElement("div");
        // the text value
        let text = document.createElement("p");

        // set attributes for marker
        card.setAttribute("class", "card");
        card.setAttribute("data-toggle", "modal");
        card.setAttribute("value", "card" + curId);
        card.setAttribute("data-target", "#myModal1");
        card.setAttribute("id", "card" + curId);
        text_div.setAttribute("class", "card-body");
        text.setAttribute("class", "card-text");

        // Vanilla DOM Style
        // Card (Outer div)
        // card.style.color = "black";
        // card.style.backgroundColor = "white";
        // card.style.width = "50px";
        // card.style.height = "50px";
        // card.style.textAlign = "center";

        // set text-align of all map markers to center
        $(".card").css({
            "text-align": "center"
        });

        console.log(store.get("store_name"));

        // set text value to store name
        $(text).text(store.get("store_name"));

        // append DOM elements together
        text_div.appendChild(text);
        card.appendChild(text_div);

        console.log("initreadmodal");

        // initializes the store (external function from here_maps_markers.js)
        initReadModal(store);

        console.log("passed initreadmodal");

        // increment curId
        curId++;

        // HERE Maps API-related ONLY FROM HERE:

        // DOM Icon (needed for second parameter argument of H.map.DomMarker())
        let domIcon = new H.map.DomIcon(card, {
            onAttach: function (clonedElement, domIcon, domMarker) {
                clonedElement.addEventListener("click", function () {
                        $("body").addClass("modal-open");
                        $("#myModal1").modal("toggle");
                        console.log("inside card onclick...");
                        // let cardId = evt.id;
                        let cardId = clonedElement.id;
                        console.log("cardID: " + cardId);
                        // let cardIndex = evt.target.id.substring(4);
                        let cardIndex = clonedElement.id.substring(4);
                        console.log("cardIndex: " + cardIndex);

                        getStore(parseInt(cardIndex));

                        console.log("outside card onclick...");
                    });
            }
            // onDetach: function (clonedElement, domIcon, domMarker) {
            //     clonedElement.removeEventListener("tap", readModal(clonedElement));
            // }
        });

        let storeLat = store.get("lat");
        let storeLng = store.get("lng");

        // DomMarker par args: arg1 == cordinates, arg2 == DOM icon
        let domMarker = new H.map.DomMarker({
            lat: storeLat,
            lng: storeLng
        }, {
            icon: domIcon
        });

        console.log("adding marker...");

        // add DOM Marker to map
        map.addObject(domMarker);
    }
}

$(document).ready(function () {
    getAllStores();
});