let greeting = document.getElementById("username");

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        greeting.innerHTML = "Welcome, " + user.displayName + "!";
    }
    // display Welcome if user signed in with phone number ( => user name is null)
    else {
        greeting.innerHTML = "Welcome!";
    }
})

let nameOnly = document.getElementById("usernameOnly");

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        nameOnly.innerHTML = user.displayName;
    }
    // display Welcome if user signed in with phone number ( => user name is null)
    else {
        nameOnly.innerHTML = "Please log-in";
    }
})