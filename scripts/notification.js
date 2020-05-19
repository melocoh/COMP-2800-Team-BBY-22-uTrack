/**
 * Read the total posts that have been reported from database and display it.
 */
db.collection("reports").get().then(function (snap) {
    document.getElementById("totalReport").innerHTML = snap.size;
});