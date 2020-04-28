// This javascript file should be referenced by all the html files except for launch and login

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
        location.href = './login.html';
    }
});