/**
 * Read the total posts that have been reported from database and display it.
 */
db.collection("reports").get().then(function (snap) {
    
    let size = snap.size;
    let elements = document.getElementsByClassName("totalReport");

    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = size;
    }
});