// Left and Right Arrow Elements
const lArrow = $("#left_arrow");
const rArrow = $("#right_arrow");

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

// Avatar Holder
var avatar = $("#userProfilePic");

// Current Avatar (Img Source)
var curAvatar = $(avatar).attr("src");




$(document).ready(() => {
    $(lArrow).click(() => {
        //  If it is not already at the left-most selection
        // if (!(curAvatar === allAvatars.level1)) {
        if (!(curAvatar === allAvatars[0])) {
            $(avatar).attr("src", )
        }
    });

    $(rArrow).click(() => {
        // If it is not already at the right-most selection

    });
});