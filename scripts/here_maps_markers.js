var card = document.createElement("div");
var text_div = document.createElement("div");
var text = document.createElement("p");

function getStoreName() {
    // var storeName = db.collection("stores").doc("mypwpPVth1Obt0wgPIJP").get("store_name");
}

function addMarkers(map) {
    // outer element

    // "<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal3\">" +
        // "Launch demo modal </button>" +
    // var postModal = $(
    //     "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModal3Label\" aria-hidden=\"true\">" +
    //     "<div class=\"modal-dialog\" role=\"document\">" +
    //       "<div class=\"modal-content\">" +
    //         "<div class=\"modal-header\">" +
    //           '<h5 class="modal-title" id="exampleModal3Label">Modal title</h5>' +
    //           '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    //             '<span aria-hidden="true">&times;</span>' +
    //           '</button>' +
    //         '</div>' +
    //         '<div class="modal-body">' +
    //           '...' +
    //         '</div>' +
    //         '<div class="modal-footer">' +
    //           '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
    //           '<button type="button" class="btn btn-primary">Save changes</button>' +
    //         '</div>' +
    //       '</div>' +
    //     '</div>' +
    //   '</div>'
    // );

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

    var colUsers = db.collection("users");
    var colItems = db.collection("items");
    var colPosts = db.collection("posts");
    var colStores = db.collection("stores");
    // test doc id: mypwpPVth1Obt0wgPIJP

    // get store name
    var store = db.collection("stores").doc("mypwpPVth1Obt0wgPIJP");
    store.get().then(function (doc) {
        $(".card-text").text(doc.get("store_name"));
    });
    // Why are we here... just to suffer?

    // storeName.get().then(function(snap) {
    //     if (doc.exists) {
    //         console.log("data:", doc.data());
    //     } else {
    //         console.log("no such doc");
    //     }
    // }).catch(function(error) {
    //     console.log("error getting doc", error);
    // })
    // console.log(storeName);
    // Text
    // text.innerHTML = "Text is here.";

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