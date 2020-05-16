let lv;

$(document).ready(function () {
    // let promise = new Promise(function (req, res) {
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("inside firebase auth for profile");
            db.collection("/users/").doc(user.uid).get().then(function (snap){
                lv = snap.data().level;
                console.log(lv);
                switch(parseInt(lv)){
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
            })
        });
        setCurAvatar();
        setListeners();
    // });
    // console.log("beginning of promise chain");
    // promise.then(setCurAvatar()).then(setListeners());
    // console.log("end of promise chain");
    console.log("end of document ready for avatar_switch.js");
    // setCurAvatar();
    // setListeners();
})