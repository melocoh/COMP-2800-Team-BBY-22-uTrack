/** Holds the user's current level (also used for Avatar Customization UI, hence the global scale) */
var lv;

function avatarSwitch(level) {
    switch(level) {
        case 1:
            $("#userProfilePic").attr("src",  "./images/Avatar/level_1.png");
            break;
        case 2:
            $("#userProfilePic").attr("src",  "./images/Avatar/level_2.png");
            break;
        case 3:
            $("#userProfilePic").attr("src",  "./images/Avatar/level_3.png");
            break;
        default:
            $("#userProfilePic").attr("src",  "./images/Avatar/level_4.png");
            break;
    }
}

$(document).ready(function () {
    // let promise = new Promise(function (req, res) {
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("inside firebase auth for profile");
            db.collection("/users/").doc(user.uid).get().then(function (snap){
                lv = snap.data().level;
                console.log(lv);
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