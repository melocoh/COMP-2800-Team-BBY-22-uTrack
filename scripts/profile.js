firebase.auth().onAuthStateChanged(function (user) {
    document.querySelector("#userName").innerHTML = user.displayName;

    db.collection("/users/").doc(user.uid).onSnapshot(function (snap){
        document.querySelector("#lv").innerHTML = snap.data().level;
        document.querySelector("#point").innerHTML = snap.data().point;

        let sizeArray = snap.data().user_posts;
        console.log(sizeArray);
        document.querySelector("#postNum").innerHTML = sizeArray.length;
    })
})