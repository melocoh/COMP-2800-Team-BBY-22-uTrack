/** Holds the element by id */
let displayName = document.getElementById("displayName");

/** Holds the element by id */
let displayLevel = document.getElementById("displayLevel");

/** Holds the element by id */
let displayEmail = document.getElementById("displayEmail");

/** Holds the element by id */
let displayPicture = document.getElementById("userProfilePic");

/** Holds the element by id */
let surpriseModal = document.getElementById("surpriseModal");

/** Holds the element by id */
let displayPointbar = document.getElementById("userBar");

/** Holds the number of click */
let clickCount = 0;

/** Holds the time */
const timeout = 500;

/** Display greeting if signed in. */ 
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("/users/").doc(user.uid).onSnapshot(function (snap) {
            displayName.innerHTML = user.displayName;
            switch (snap.data().level) {
                case 1:
                    document.getElementById("beginner").setAttribute("style", "display:block");
                    break;
                case 2:
                    document.getElementById("intermediate").setAttribute("style", "display:block");
                    break;
                case 3:
                    document.getElementById("advanced").setAttribute("style", "display:block");
                    break;
                case 4:
                    document.getElementById("expert").setAttribute("style", "display:block");
                    break;
                case 5:
                    document.getElementById("legend").setAttribute("style", "display:block;");
                    break;
            }
            displayLevel.innerHTML = "<b>Level</b> : " + snap.data().level;
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
    } 
})

/** Invoke surprise function */
displayPicture.onclick = surprise;

/** Easter egg */
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

/** Display the modal of level system */
function displayLevelSystem() {
    $('#myModal').modal('show');
}