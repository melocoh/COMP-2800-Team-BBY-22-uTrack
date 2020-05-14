let lv;
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("/users/").doc(user.uid).onSnapshot(function (snap){
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
})
