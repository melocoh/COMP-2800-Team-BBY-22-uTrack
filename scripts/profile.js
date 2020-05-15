let displayName = document.getElementById("displayName");
let displayLevel = document.getElementById("displayLevel");
// let displayPosting = document.getElementById("displayPosting");
let displayPoint = document.getElementById("displayPoint");
let displayEmail = document.getElementById("displayEmail");
let displayPicture = document.getElementById("userProfilePic");
let surpriseModal = document.getElementById("surpriseModal");

let clickCount =  0;
const timeout = 500;

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("/users/").doc(user.uid).onSnapshot(function (snap){
        displayName.innerHTML = user.displayName;
        displayLevel.innerHTML = "<b>Level</b> : " + snap.data().level;
        // displayPosting.innerHTML = "<b>Post</b> : " + snap.data().post;
        displayPoint.innerHTML = "<b>Points</b> : " + snap.data().points;
        displayEmail.innerHTML = user.email;
        })
    } else {

    }
})

displayPicture.onclick = surprise;

function surprise() {
    clickCount++;
    console.log("you've clicked " + clickCount + " times");
    if(clickCount === 3) {
        alert("Congrats!");

        setTimeout(() => {
            displayPicture.setAttribute("src","./images/easter.gif");
        }, timeout);
    }

    if(clickCount === 6) {
        surpriseModal.setAttribute("display","block");
    }
}

/*
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
*/