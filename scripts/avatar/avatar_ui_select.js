/** Left and Right Arrow Element Holders */
const lArrow = $("#left_arrow");
const rArrow = $("#right_arrow");

/** Avatar Image Object Holder */
var avatar = $("#userProfilePic");

/** Current Avatar Image Source Holder */
var curAvatar;

/** New Avatar Image Souce Holder */
var newAvatar;

/** Profile picture div container */
let profPicDiv = $("#profpic_container");

// level indicator of avatar design
let avatarLevelIndicator;

/** Array that holds all the released avatar design image sources for the user */
const allAvatars = [];

const numOfAvatarDesigns = 12;

// OLD ALLAVATARS ARRAY
// const allAvatars = [
//     "./images/Avatar/level_1.png",
//     "./images/Avatar/level_2.png",
//     "./images/Avatar/level_3.png",
//     "./images/Avatar/level_4.png"
// ];

/* --------------------------------- */
/* SETTERS */
/* --------------------------------- */

function setAvatars() {
    /* gets storage reference from avatar_switch.js and loops through all available avatar variations (12)
        before storing them into the allAvatars array */
    for (let i = 0; i < numOfAvatarDesigns; i++) {
        // holds the iterating string for image reference
        let childString = "level_" + (i + 1) + ".png";
        if (i === numOfAvatarDesigns - 1) {
            childString = "level_LEGENDARY.png";
        }
        console.log("childString: " + childString);
        
        // holds the avatar image reference
        let avatarHolder = avatarStorageRef.child(childString);
        avatarHolder.getDownloadURL().then(function (url) {
            console.log(url);

            // add avatar image download url to allAvatars array
            allAvatars[i] = url;

            console.log("succesfully pushed download url to allAvatars[]");
        });
        console.log("end of iteration " + i);
    }
    console.log(allAvatars);
}

/**
 * Checks for the user's level and determines if the current avatar showcased
 * is unlocked or locked by the user.
 * 
 * If the user's level is strictly less than that of the avatar's level indicator,
 * include greyscale for that avatar to indicate a locked state.
 * 
 * Otherwise, leave the avatar as it is
 */
function setGreyscale() {
    // TESTING NOTES (OLD)
    // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
    // . / i m a g e s / A v  a  t  a  r  /  l  e  v  e  l  _  1  .  p  n  g

    // holds the index location of the specified string in the download url
    let substringStartPos = newAvatar.indexOf("level_") + 6;

    // extract level from avatar image download url
    avatarLevelIndicator = newAvatar.substring(substringStartPos, substringStartPos + 2);
    
    // OLD CODE
    // avatarLevelIndicator = newAvatar.substring(22, 24);
    console.log("avatarindicator: " + avatarLevelIndicator);

    // check to see if level is single digit or double
    if (avatarLevelIndicator.substring(1) === ".") {
        // cut substring even further if it is single digit
        avatarLevelIndicator = avatarLevelIndicator.substring(0, 1);
    } else if (avatarLevelIndicator.includes("LE")) {
        avatarLevelIndicator = 12;
    }

    // parse into integer
    avatarLevelIndicator = parseInt(avatarLevelIndicator);

    console.log("avatarLevelIndicator: " + avatarLevelIndicator);

    // external level variable (from avatar_switch.js)
    let level = parseInt(lv);

    console.log("user's current level: " + level);

    // if level is less than avatar level indicator, set grayscale filter to avatar
    if (level < avatarLevelIndicator) {
        // check for lock icon
        let checkLockIcon = $(".lock_icon");
        console.log(checkLockIcon.length);
        $(avatar).css("filter", "grayscale(95%)");
        if (checkLockIcon.length <= 0) {
            console.log("adding lock");
            setLock("add");
        }
        setLevelReqIndicator("add");
    } else {
        // remove filter css property if avatar is unlocked by user
        $(avatar).css("filter", "");
        console.log("removing lock");
        setLock("remove");
        setLevelReqIndicator("remove")
    }
}

/**
 * Sets the lock icon to the profile picture container
 */
function setLock(addOrRemove) {
    // lock icon html code
    let lockIcon = `<i class="fas fa-lock fa-2x lock_icon"></i>`;

    if (addOrRemove === "add") {
        console.log("adding lock");
        // append lock icon code to profile pic container
        $(profPicDiv).append(lockIcon);

        // setLevelReqIndicator();
    } else {
        console.log("removing lock");
        $(".fa-lock").remove();
        // $(".lvlreq_div").remove();
    }
}

function setLevelReqIndicator(addOrRemove) {
    if (addOrRemove === "add") {
        let divIndicator = `<div class="lvlreq_div"><p>Level ` + avatarLevelIndicator + ` required to unlock this avatar</p></div>`;
        $(profPicDiv).append(divIndicator);
    } else {
        $(".lvlreq_div").remove();
    }
}

/**
 * Updates the current avatar holder
 */
function setCurAvatar() {
    curAvatar = $(avatar).attr("src");
    console.log("curAvatar src: " + curAvatar);
}

/**
 * Sets the mouseclick event listeners to the left and right arrows
 */
function setListeners() {
    console.log("setting click listeners");

    // Left-arrow click listener
    $(lArrow).click(() => {
        console.log("left arrow clicked");

        // Update the current avatar holder
        setCurAvatar();

        //  If it is not already at the left-most selection
        if (!(curAvatar === allAvatars[0])) {
            // Find match
            findMatch("left");

            // place result after matching index
            $(avatar).attr("src", newAvatar);

            // set greyscale whenever necessary
            setGreyscale();

            console.log("changed avatar img" + $(avatar).attr("src"));
        } else {
            console.log("already the left-most design");
        }
    });

    // Right-arrow click listener
    $(rArrow).click(() => {
        console.log("right arrow clicked");

        // Update the current avatar holder
        setCurAvatar();

        // If it is not already at the right-most selection
        if (!(curAvatar === allAvatars[allAvatars.length - 1])) {
            // Find match
            findMatch("right");

            // place result after matching index
            $(avatar).attr("src", newAvatar);

            // set greyscale whenever necessary
            setGreyscale();

            console.log("changed avatar img" + $(avatar).attr("src"));
        }
    });
}

/* --------------------------------- */
/* HELPER METHODS */
/* --------------------------------- */

/**
 * Attempts to match the current avatar's source to an element
 * from the array of released avatar designs.
 * 
 * When a match is found, set the new avatar holder's source to
 * that of the next or previous element based on the given
 * direction.
 * 
 * @param {String} direction 
 */
function findMatch(direction) {
    for (let i = 0; i < allAvatars.length; i++) {
        console.log("currentIndex: " + i);
        if (curAvatar === allAvatars[i]) {
            // console.log("found match: " + src);
            console.log("found match: " + allAvatars[i]);

            // Set new avatar as the matching source
            if (direction === "left") {
                newAvatar = allAvatars[i - 1];
            } else {
                newAvatar = allAvatars[i + 1];
            }

            console.log("ending for loop");

            // End for-loop
            return;
        } else {
            // console.log("no match: " + src);
            console.log("no match: " + allAvatars[i]);
        }
    }

    // allAvatars.forEach(src => {
    //     if (curAvatar === src) {
    //         console.log("found match: " + src);

    //         // Set new avatar as the matching source
    //         newAvatar = allAvatars[];

    //         // End for-loop
    //         return;
    //     } else {
    //         console.log("no match: " + src);
    //     }
    // });
}

/* --------------------------------- */
/* DOM DOCUMENT READY LISTENER */
/* --------------------------------- */

$(document).ready(() => {
    console.log("ui_select document is ready");
    setAvatars();
    setListeners();
});