var card = document.createElement("div");
var text_div = document.createElement("div");
var text = document.createElement("p");

// store collection
var storeList = db.collection("stores");

// store document (global var)
var store = storeList.doc("6ufTjE5tYRWppAXi2l8q");

function addMarkers(map) {
    card.setAttribute("class", "card");
    // fuuuuuuuuuu
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

    // var store = db.collection("stores").doc("6ufTjE5tYRWppAXi2l8q");

    // test doc id: 6ufTjE5tYRWppAXi2l8q
    // get store name
    store.get().then(function (doc) {
        $(".card-text").text(doc.get("store_name"));
    });
    // Why are we here... just to suffer?

    // Appendingssssss
    card.appendChild(text_div);
    // card.append(postModal);
    text_div.appendChild(text);

    function initReadLatest() {
        readLatest();
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

    // DOM Icon (needed for second parameter argument of H.map.DomMarker())
    var domIcon = new H.map.DomIcon(card, {
        onAttach: function (clonedElement, domIcon, domMarker) {
            clonedElement.addEventListener("click", initReadLatest);
        },
        onDetach: function (clonedElement, domIcon, domMarker) {
            clonedElement.removeEventListener("click", initReadLatest);
        }
    });
    // , {
    //     onAttach: function (clonedElement, domIcon, domMarker) {
    //         // clonedElement.addEventListener("click", openModal);
    //         // clonedElement.addEventListener("mouseover", changeOpacity);
    //         // clonedElement.addEventListener("mouseout", changeOpacityToOne);
    //     },
    //     onDetach: function (clonedElement, domIcon, domMarker) {
    //         // clonedElement.removeEventListener("click", openModal);
    //         // clonedElement.removeEventListener("mouseover", changeOpacity);
    //         // clonedElement.removeEventListener("mouseout", changeOpacityToOne);
    //     }
    // }

    // DomMarker par args:"
    //  1st: coordinates
    //  2nd: DOM Icon
    var domMarker = new H.map.DomMarker({
        lat: 49.249394,
        lng: -123.000788
    }, {
        icon: domIcon
    });

    // add DOM Marker to map
    map.addObject(domMarker);
}

$(document).ready(function () {
    addMarkers(map);
})

// addMarkers(map);
// $(document).ready(function () {
//     addMarkers(map);
// })

// window.onload(addMarkers(map));