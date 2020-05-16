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

    let curId = 1;
    for (let i = 0; i < locStores.length; i++) {


        // FOR TESTING PURPOSES
        console.log("inside for loop");

        // Current store
        store = locStores[i];

        // FOR TESTING PURPOSES
        console.log(store);

        // Is the map marker
        let card = document.createElement("div");
        // Holds the text
        let text_div = document.createElement("div");
        // Holds the text
        let text = document.createElement("p");

        card.setAttribute("class", "card");
        card.setAttribute("data-toggle", "modal");
        card.setAttribute("value", "card" + curId);
        // RE-CONFIGURE LATER
        card.setAttribute("data-target", "#myModal1");
        card.setAttribute("id", "card" + curId);
        console.log(card.id);
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
            // "width": "50px",
            // "height": "50px",
            "text-align": "center"
        });

        // test doc id: 6ufTjE5tYRWppAXi2l8q
        // get store name
        // store.get().then(function (doc) {
        //     $(".card-text").text(doc.get("store_name"));
        // });

        console.log(store.get("store_name"));
        $(text).text(store.get("store_name"));

        // Appendingssssss
        text_div.appendChild(text);
        card.appendChild(text_div);
        // card.append(postModal);

        // card.onclick(function () {
        //     // 0 1 2 3 4
        //     // c a r d 1
        //     let cardIndex = card.id.substring(4);
        //     console.log("cardIndex: " + cardIndex);
        //     getStore(parseInt(cardIndex));
        // });

        console.log("initreadmodal");
        initReadModal(store);
        console.log("passed initreadmodal");

        curId++;

        // HERE Maps API-related ONLY FROM HERE:

        // read the latest post from the current store
        // function initReadLatest(store) {
        //     readLatest(store);
        // };

        // function showModal() {
        //     $("#myModal").modal("show");
        // }

        // function readModal() {
        //     // readLatest();
        //     // 0 1 2 3 4
        //     // c a r d 1
        //     console.log("inside card onclick...");

        //     // let cardId = evt.id;
        //     let cardId = clonedElement.id;
        //     console.log("cardID: " + cardId);
        //     // let cardIndex = evt.target.id.substring(4);
        //     let cardIndex = clonedElement.id.substring(4);
        //     console.log("cardIndex: " + cardIndex);

        //     getStore(parseInt(cardIndex));

        //     console.log("outside card onclick...");
        // };

        // 0 1 2 3 4
        // c a r d 1
        // console.log("inside card onclick...");

        // let cardIndex = $(this).id.substring(4);

        // console.log("cardIndex: " + cardIndex);

        // getStore(parseInt(cardIndex));

        // console.log("outside card onclick...");

        // DOM Icon (needed for second parameter argument of H.map.DomMarker())
        let domIcon = new H.map.DomIcon(card, {
            onAttach: function (clonedElement, domIcon, domMarker) {
                clonedElement.addEventListener("click", function () {
                        $("body").addClass("modal-open");
                        $("#myModal1").modal("show");
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
                // clonedElement.addEventListener("touchstart", showModal());
            }
            // onDetach: function (clonedElement, domIcon, domMarker) {
            //     clonedElement.removeEventListener("tap", readModal(clonedElement));
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

        // domMarker.addEventListener("click", () => {
        //     // readLatest();
        //     // 0 1 2 3 4
        //     // c a r d 1
        //     console.log("inside card onclick...");

        //     // let cardIndex = $(this).id.substring(4);
        //     // let cardId = evt.id;
        //     let cardId = domMarker.id;
        //     console.log("cardID: " + cardId);
        //     // let cardIndex = evt.target.id.substring(4);
        //     let cardIndex = domMarker.id.substring(4);
        //     console.log("cardIndex: " + cardIndex);

        //     getStore(parseInt(cardIndex));

        //     console.log("outside card onclick...");
        // });

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
    // $(".card").on("click", () => {

    // })
});

// $(".card").on("click", () => {
//     // 0 1 2 3 4
//     // c a r d 1
//     console.log("inside card onclick...");

//     let cardIndex = $(this).id.substring(4);

//     console.log("cardIndex: " + cardIndex);

//     getStore(parseInt(cardIndex));

//     console.log("outside card onclick...");
// });


// addMarkers(map);
// $(document).ready(function () {
//     addMarkers(map);
// })

// window.onload(addMarkers(map));