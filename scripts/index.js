let greeting = document.getElementById("username");

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (users) {
    if (users) {
        greeting.innerHTML = "Hello, " + user.displayName;
    }
})