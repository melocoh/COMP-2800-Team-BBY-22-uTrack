function addMarkers(map) {
    // outer element
    var card = document.createElement("div");
    var text_div = document.createElement("div");
    var text = document.createElement("p");

    // Card (Outer div)
    card.style.color = "black";
    card.style.backgroundColor = "white";
    card.style.width = "50px";
    card.style.height = "50px";
    card.style.textAlign = "center";

    // Text
    text.innerHTML = "Text is here.";

    // Appendingssssss
    card.appendChild(text_div);
    text_div.appendChild(text);

    // DOM Icon (needed for second parameter argument of H.map.DomMarker())
    var domIcon = new H.map.DomIcon(card);

    // DomMarker par args:
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

addMarkers(map);