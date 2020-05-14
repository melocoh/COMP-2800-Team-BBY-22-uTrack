let lv;
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("/users/").doc(user.uid).onSnapshot(function (snap){
        lv = snap.get("level");
    })
})

switch(lv){
    case 1:
        $("#userProfilePic").attr("src",  "https://via.placeholder.com/150");
        break;
    case 2:
        $("#userProfilePic").attr("src",  "https://via.placeholder.com/150");
        break;
    case 3:
        $("#userProfilePic").attr("src",  "https://via.placeholder.com/150");
        break;
    default:
        $("#userProfilePic").attr("src",  "https://via.placeholder.com/150");
        break;
}
