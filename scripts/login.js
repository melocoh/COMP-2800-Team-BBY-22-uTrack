// JavaScript file that handles the Firebase UI for authentication (for the login page)

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            var user = authResult.user;
                    if (authResult.additionalUserInfo.isNewUser) {
                        db.collection("users").doc(user.uid).set({
                                name: user.displayName,
                                email: user.email,
                                level: 1,
                                points: 0,
                                post: 0,
                                favoriteStore: ""
                            }).then(function () {
                                console.log("New user added to firestore");
                                window.location.assign("home.html");
                            })
                            .catch(function (error) {
                                console.log("Error adding new user: " + error);
                            });
                    } else {
                        return true;
                    }
                    return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'home.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // VVVVVV Might be added later
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    // VVVVVV Definitely configure this later (index is placeholder)
    tosUrl: 'home.html',
    // Privacy policy url.
    // VVVV May configure or go with ToS later (index is placeholder)
    privacyPolicyUrl: 'home.html'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);