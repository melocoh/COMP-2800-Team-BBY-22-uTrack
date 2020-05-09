// store collection
var allStores = db.collection("stores");

// array that holds all stores with valid locations (lat and long)
var locStores = [];

// current store
var store;

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
        addMarkers(map);
    });

}

// store document (global var)
// var store = storeList.doc("6ufTjE5tYRWppAXi2l8q");


function addMarkers(map) {
    console.log("inside addMarkers(map)");
    for (let i = 0; i < locStores.length; i++) {
        console.log("inside for loop");
        store = locStores[i];
        console.log(store);

        let card = document.createElement("div");
        let text_div = document.createElement("div");
        let text = document.createElement("p");

        card.setAttribute("class", "card");
        card.setAttribute("data-toggle", "modal");
        card.setAttribute("data-target", "#myModal");
        text_div.setAttribute("class", "card-body");
        text.setAttribute("class", "card-text");

        // Vanilla DOM Style
        // Card (Outer div)
        // card.style.color = "black";
        // card.style.backgroundColor = "white";
        // card.style.width = "50px";
        // card.style.height = "50px";
        // card.style.textAlign = "center";
        $(".card").css({
            "width": "50px",
            "height": "50px",
            "text-align": "center"
        });

        // test doc id: 6ufTjE5tYRWppAXi2l8q
        // get store name
        // store.get().then(function (doc) {
        //     $(".card-text").text(doc.get("store_name"));
        // });

        console.log(store.get("store_name"));
        let store_name = store.get("store_name");
        $(".card-text").text(store_name);

        // Appendingssssss
        text_div.appendChild(text);
        card.appendChild(text_div);
        // card.append(postModal);

        initReadModal(store);

        // read the latest post from the current store
        // function initReadLatest(store) {
        //     readLatest(store);
        // };

        function showModal() {
            $("#myModal").modal("show");
        }

        function readModal() {
            readLatest();
        };

        // DOM Icon (needed for second parameter argument of H.map.DomMarker())
        let domIcon = new H.map.DomIcon(card, {
            onAttach: function (clonedElement, domIcon, domMarker) {
                clonedElement.addEventListener("click", readModal());
                // clonedElement.addEventListener("touchstart", showModal());
            }
            // onDetach: function (clonedElement, domIcon, domMarker) {
            //     clonedElement.removeEventListener("click", initReadLatest);
            // }
        });

        let storeLat = store.get("lat");
        let storeLng = store.get("lng");

        // DomMarker par args:
        //  1st: coordinates
        //  2nd: DOM Icon
        let domMarker = new H.map.DomMarker({
            // lat: 49.249394,
            // lng: -123.000788
            lat: storeLat,
            lng: storeLng
        }, {
            icon: domIcon
        });

        console.log("adding marker...");
        // add DOM Marker to map
        map.addObject(domMarker);
    }

    // function closeModal(event) {
    //     $("#myModal").modal("hide");
    // };

    // FOR TESTING PURPOSES:
    // function changeOpacity(event) {
    //     event.target.style.opacity = 0.6;
    // };

    // function changeOpacityToOne(event) {
    //     event.target.style.opacity = 1;
    // };
}

$(document).ready(function () {
    getAllStores();
    // addMarkers(map);
})

// addMarkers(map);
// $(document).ready(function () {
//     addMarkers(map);
// })

// window.onload(addMarkers(map));