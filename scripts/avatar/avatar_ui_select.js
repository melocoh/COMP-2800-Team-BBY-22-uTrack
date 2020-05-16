// Left and Right Arrow Elements
const lArrow = $("#left_arrow");
const rArrow = $("#right_arrow");

// Avatar Holder
var avatar = $("#userProfilePic");
console.log("avatar: " + avatar);

// JSON of Available Avatars
// const allAvatars = {
//     "level1": "./images/Avatar/level_1.png",
//     "level2": "./images/Avatar/level_2.png",
//     "level3": "./images/Avatar/level_3.png",
//     "level4": "./images/Avatar/level_4.png"
// }

const allAvatars = [
    "./images/Avatar/level_1.png",
    "./images/Avatar/level_2.png",
    "./images/Avatar/level_3.png",
    "./images/Avatar/level_4.png"
]

// Current Avatar (Img Source)
var curAvatar;

// New Avatar (Img Source)
var newAvatar;

function findMatch() {
    allAvatars.forEach(src => {
        if (curAvatar === src) {
            console.log("found match: " + src);

            // Set new avatar as the matching source
            newAvatar = src;

            // End for-loop
            return;
        } else {
            console.log("no match: " + src);
        }
    })
}

function setCurAvatar() {
    curAvatar = $(avatar).attr("src");
    console.log("curAvatar src: " + curAvatar);
}

function setListeners() {
    console.log("setting click listeners");
    $(lArrow).click(() => {
        //  If it is not already at the left-most selection
        // if (!(curAvatar === allAvatars.level1)) {
        if (!(curAvatar === allAvatars[0])) {
            // Find match
            findMatch();
            // place result after matching index
            $(avatar).attr("src", newAvatar);
        }
        console.log("left arrow clicked");
    });

    $(rArrow).click(() => {
        // If it is not already at the right-most selection
        if (!(curAvatar === allAvatars[allAvatars.length - 1])) {
            // Find match
            findMatch();
            // place result after matching index
            $(avatar).attr("src", newAvatar);
        }
        console.log("right arrow clicked");
    });
}


$(document).ready(() => {
    console.log("ui_select document is ready");
    // curAvatar = avatar.src;
    // console.log("curAvatar src: " + curAvatar);

    // $(lArrow).click(() => {
    //     //  If it is not already at the left-most selection
    //     // if (!(curAvatar === allAvatars.level1)) {
    //     if (!(curAvatar === allAvatars[0])) {
    //         // Find match
    //         findMatch();
    //         // place result after matching index
    //         $(avatar).attr("src", newAvatar);
    //     }
    // });

    // $(rArrow).click(() => {
    //     // If it is not already at the right-most selection
    //     if (!(curAvatar === allAvatars[allAvatars.length - 1])) {
    //         // Find match
    //         findMatch();
    //         // place result after matching index
    //         $(avatar).attr("src", newAvatar);
    //     }
    // });
});