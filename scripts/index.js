let greeting = document.getElementById("username");

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        greeting.innerHTML = "Welcome, " + user.displayName + "!";
    }
})