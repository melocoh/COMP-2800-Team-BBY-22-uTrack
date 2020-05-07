firebase.auth().onAuthStateChanged(function (user) {
    document.querySelector("#userName").innerHTML = user.displayName;

    db.collection("/users/").doc(user.uid).onSnapshot(function (snap){
        document.querySelector("#lv").innerHTML = snap.data().level;
        document.querySelector("#point").innerHTML = snap.data().points;

        // let sizeArray = snap.data().user_posts;
        // console.log(sizeArray);
        // if (sizeArray == "undefined"){
        //     document.querySelector("#postNum").innerHTML = 0;
        // } else{
        //     document.querySelector("#postNum").innerHTML = sizeArray.length;
        // }
        
    })
})