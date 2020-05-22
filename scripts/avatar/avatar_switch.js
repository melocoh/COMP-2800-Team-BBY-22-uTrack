/** Holds the Firebase Storage reference */
var avatarStorageRef = firebase.storage().ref().child("avatars");

/** Holds the user's current level (also used for Avatar Customization UI, hence the global scale) */
var lv;

/**
 * Selects an avatar based on the user's current level
 * @param {Number} level 
 */
function avatarSwitch(level) {
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
        
        // apply avatar image to associated HTML element
        $("#userProfilePic").attr("src", url);
    });



    // OLD CODE (Avatar Placeholders):
    // switch(level) {
    //     case 1:
    //         $("#userProfilePic").attr("src",  "./images/Avatar/level_1.png");
    //         break;
    //     case 2:
    //         $("#userProfilePic").attr("src",  "./images/Avatar/level_2.png");
    //         break;
    //     case 3:
    //         $("#userProfilePic").attr("src",  "./images/Avatar/level_3.png");
    //         break;
    //     default:
    //         $("#userProfilePic").attr("src",  "./images/Avatar/level_4.png");
    //         break;
    // }
}

$(document).ready(function () {
    // let promise = new Promise(function (req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("inside firebase auth for profile");
        db.collection("/users/").doc(user.uid).get().then(function (snap) {
            lv = snap.data().level;
            console.log(lv);
            // designate user avatar based on level
            avatarSwitch(parseInt(lv));
        })
    });
    // });
    // console.log("beginning of promise chain");
    // promise.then(setCurAvatar()).then(setListeners());
    // console.log("end of promise chain");
    console.log("end of document ready for avatar_switch.js");
    // setCurAvatar();
    // setListeners();
})