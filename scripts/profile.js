firebase.auth().onAuthStateChanged(function (user) {
    document.querySelector("#userName").innerHTML = user.displayName;

    db.collection("/users/").doc(user.uid).onSnapshot(function (snap){
        document.querySelector(".displayLevel").innerHTML = snap.data().level;
        document.querySelector(".displayPosting").innerHTML = snap.data().post;
        document.querySelector(".displayPoint").innerHTML = snap.data().points;
        document.querySelector(".email").innerHTML = snap.data().email;

        // let sizeArray = snap.data().user_posts;
        // console.log(sizeArray);
        // if (sizeArray == "undefined"){
        //     document.querySelector("#postNum").innerHTML = 0;
        // } else{
        //     document.querySelector("#postNum").innerHTML = sizeArray.length;
        // }
        
    })
})