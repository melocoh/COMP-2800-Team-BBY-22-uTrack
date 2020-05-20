let displayName = document.getElementById("displayName");
let displayLevel = document.getElementById("displayLevel");
// let displayPosting = document.getElementById("displayPosting");
// let displayPoint = document.getElementById("displayPoint");
let displayEmail = document.getElementById("displayEmail");
let displayPicture = document.getElementById("userProfilePic");
let surpriseModal = document.getElementById("surpriseModal");
let displayPointbar = document.getElementById("userBar");

let clickCount = 0;
const timeout = 500;

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("/users/").doc(user.uid).onSnapshot(function (snap) {
                displayName.innerHTML = user.displayName;
                switch (snap.data().level) {
                    case 1:
                    document.getElementById("beginner").setAttribute("style","display:block");
                    break;
                    case 2:
                    document.getElementById("intermediate").setAttribute("style","display:block");
                    break;
                    case 3:
                    document.getElementById("advanced").setAttribute("style","display:block");
                    break;
                    case 4:
                    document.getElementById("expert").setAttribute("style","display:block");
                    break;
                    case 5:
                    document.getElementById("legend").setAttribute("style","display:block;");
                    break;
                }
                displayLevel.innerHTML = "<b>Level</b> : " + snap.data().level;
                // displayPosting.innerHTML = "<b>Post</b> : " + snap.data().post;
                // displayPoint.innerHTML = "<b>Points</b> : " + snap.data().points;
                displayEmail.innerHTML = user.email;
                setTimeout(() => {
                    displayPointbar.style.width = snap.data().points + "%";
                    displayPointbar.style.transition = "all 1s";
                }, timeout);
                setTimeout(() => {
                        displayPointbar.innerHTML = snap.data().points + " %";

                        displayPointbar.style.color = "#3792cb";
                        displayPointbar.style.fontSize = "0vh";
                        setTimeout(function () {
                            displayPointbar.style.color = "white";
                            displayPointbar.style.fontSize = "2vh";
                        }, timeout);
                    }, timeout * 2);

        })
} else {

}
})

displayPicture.onclick = surprise;

function surprise() {
    clickCount++;
    console.log("you've clicked " + clickCount + " times");
    if (clickCount === 3) {
        alert("Congrats!");

        setTimeout(() => {
            displayPicture.setAttribute("src", "./images/easter.gif");
        }, timeout);
    }

    if (clickCount === 6) {

        displayPicture.setAttribute("src", "./images/explosion.gif");

        setTimeout(() => {
            displayPicture.setAttribute("src", "./images/giftcard.jpg");
        }, timeout * 4);
    }

    if (clickCount === 7) {
        $('#giftModal').modal('show');
    }

     if (clickCount === 8) {
        displayPicture.setAttribute("src", "./images/penguin.png");
        window.location.href = "ToiletSnake.html";
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

function displayLevelSystem() {
    $('#myModal').modal('show');
}
                    