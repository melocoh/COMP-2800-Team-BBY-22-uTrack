firebase.auth().onAuthStateChanged(function (user) {
    console.log(user.displayName);
    document.querySelector("").innerHTML = "Hi, " + user.displayName + " !";
})