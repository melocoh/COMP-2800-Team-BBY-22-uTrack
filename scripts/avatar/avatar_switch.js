/** Holds the Firebase Storage reference */
var avatarStorageRef = firebase.storage().ref().child("avatars");

/** Holds the user's current level (also used for Avatar Customization UI, hence the global scale) */
var lv;

/**
 * Selects an avatar based on the user's current level
 * @param {Number} level
 * @param {Boolean} isProfile
 */
function avatarSwitch(level, isProfile) {
    // holds avatar image
    let avatar;

    switch (level) {
        case 1:
            avatar = avatarStorageRef.child("level_1.png");
            break;
        case 2:
            avatar = avatarStorageRef.child("level_2.png");
            break;
        case 3:
            avatar = avatarStorageRef.child("level_3.png");
            break;
        case 4:
            avatar = avatarStorageRef.child("level_4.png");
            break;
        case 5:
            avatar = avatarStorageRef.child("level_5.png");
            break;
        case 6:
            avatar = avatarStorageRef.child("level_6.png");
            break;
        case 7:
            avatar = avatarStorageRef.child("level_7.png");
            break;
        case 8:
            avatar = avatarStorageRef.child("level_8.png");
            break;
        case 9:
            avatar = avatarStorageRef.child("level_9.png");
            break;
        case 10:
            avatar = avatarStorageRef.child("level_10.png");
            break;
        case 11:
            avatar = avatarStorageRef.child("level_11.png");
            break;
        case 12:
            avatar = avatarStorageRef.child("level_LEGENDARY.png");
            break;
    }

    // get the download url of the avatar image reference
    avatar.getDownloadURL().then(function (url) {
        console.log(url);
        console.log("isProfile: " + isProfile);

        // apply avatar image to associated HTML element
        if (isProfile) {
            $("#userProfilePic").attr("src", url);
        } else {
            localStorage.setItem("avatarURL", url);
        }
    });
}

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("inside firebase auth for profile");
        db.collection("/users/").doc(user.uid).get().then(function (snap) {
            // get the user's current level
            lv = snap.data().level;

            console.log(lv);

            // holds isProfile boolean for avatarSwitch()
            let isProfile = false;

            // if current page is the profile page, then set boolean to indicate so
            if (window.location.href.includes("profile")) {
                isProfile = true;
            }

            // designate user avatar based on level
            avatarSwitch(parseInt(lv), isProfile);
        })
    });

    console.log("end of document ready for avatar_switch.js");
})