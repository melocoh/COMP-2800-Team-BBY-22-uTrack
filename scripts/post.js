/** insert javadoc here */
let checked1 = false;

/** insert javadoc here */
let checked2 = false;

/** insert javadoc here */
let checked3 = false;

/** insert javadoc here */
let items = [];

/** insert javadoc here */
let stock = [];

/** insert javadoc here */
let imgUrl;

/** insert javadoc here */
let itemIDs = [];

/** insert javadoc here */
// let storeId;

/** insert javadoc here */
let curTime;

/** insert javadoc here */
let dateAndTime;

/** insert javadoc here */
let postId;

/** insert javadoc here */
let userPost = [];

/** insert javadoc here */
var storeId;

/** insert javadoc here */
const TIME = 500;

/** insert javadoc here */
const incrementEXP = firebase.firestore.FieldValue.increment(10);

var fileButton = document.getElementById('fileButton');
let userId;
let userName;

//get user id and user name;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userId = db.collection("users/").doc(user.uid);
        console.log(userId);
        userName = user.displayName;
    }
});
//Invoke functions
removeQuantity();
setInterval(function () {
    checkbox();
}, TIME);

/** Firestore Posts Collection Reference */
let postsCollec = db.collection("posts");

/** Firestore Items Collection Reference */
let itemsCollec = db.collection("items");

/** Firestore Stores Collection Reference */
let storesCollec = db.collection("stores");

//check if the check box is checked or not

/**
 * Check if the check box is checked or not to hide the quantity boc
 */
function checkbox() {

    if (document.querySelector('#customCheck1:checked')) {
        checked1 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox1').style.display = "inline";
    } else {
        checked1 = false;
        document.querySelector('#textBox1').style.display = "none";
    }

    if (document.querySelector('#customCheck2:checked')) {
        checked2 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox2').style.display = "inline";
    } else {
        checked2 = false;
        document.querySelector('#textBox2').style.display = "none";
    }

    if (document.querySelector('#customCheck3:checked')) {
        checked3 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox3').style.display = "inline";
    } else {
        checked3 = false;
        document.querySelector('#textBox3').style.display = "none";
    }

    if (!document.querySelector('#customCheck1:checked') &&
        !document.querySelector('#customCheck2:checked') &&
        !document.querySelector('#customCheck3:checked')) {
        removeQuantity();
    }
}

/**
 * Hide the quantity input box.
 */
function removeQuantity() {
    document.querySelector('#quantity').style.display = "none";
}

/**
 * Add the data from user's input to severals collection on database.
 */
function setDataPost() {
    // let locate = document.getElementById("address").value + ", " +
    //     document.getElementById("province").value +
    //     ", " + document.getElementById("zip").value;

    // iterate over each item in the items array and add them to the database
    // for (let i = 0; i < items.length; i++) {
    //     db.collection("items").add({
    //         category: items[i],
    //         item_name: items[i],
    //         stock_number: stock[i]
    //     }).then(function (docRef) {
    //         let itemId = db.collection("items/").doc(docRef.id);
    //         console.log(itemId);
    //         itemIDs.push(itemId);
    //         // TERRIBLE FIX TO BLANK ARRAY OF ITEM REFERENCES:
    //         // add the store and post once the last item has been pushed to itemIDs arrya
    //         if (i == items.length - 1) {
    //             db.collection("stores").add({
    //                 location: locate,
    //                 store_items: itemIDs,
    //                 store_name: document.getElementById("nameStore").value
    //             }).then(function (docRef) {
    //                 storeId = db.collection("stores/").doc(docRef.id);
    //                 // FOR TESTING PURPOSES (attempt to set itemIDs to store_items):
    //                 // storeId.set({
    //                 //     location: locate,
    //                 //     store_items: itemIDs,
    //                 //     store_name: document.getElementById("nameStore").value
    //                 // });
    //                 console.log(storeId);
    //                 db.collection("posts").add({
    //                     post_image: imgUrl,
    //                     post_date: dateAndTime,
    //                     timestamp: curTime,
    //                     post_name: document.getElementById("nameStore").value,
    //                     post_items: itemIDs,
    //                     post_store: storeId
    //                 }).then(function (docRef) {
    //                     postId = db.collection("posts/").doc(docRef.id);
    //                     // userPost.push(postId);
    //                     // firebase.auth().onAuthStateChanged(function (user) {
    //                     //     db.collection("users/").doc(user.id).update({
    //                     //         user_posts: userPost
    //                     //     })
    //                     // })
    //                 }).catch(function (error) {
    //                     console.log("Error adding document: ", error);
    //                 });
    //             });
    //         }
    //     });
    // }

    for (let i = 0; i < items.length; i++) {
        itemsCollec.add({
            category: items[i],
            item_name: items[i],
            stock_number: stock[i]
        }).then(function (itemRef) {
            let itemId = db.collection("items/").doc(itemRef.id);
            console.log("itemID: " + itemId);
            itemIDs.push(itemId);
            // Add the store and post once the last item has been pushed to itemIDs array
            if (i == items.length - 1) {

                // FOR TESTING PURPOSES
                console.log("last item has been added");

                // FOR TESTING PURPOSES
                console.log("updating store");
                console.log("storeID: " + storeId);

                let storeName;

                // update store
                storesCollec.doc(storeId).update({
                    store_items: itemIDs
                });
                // may need to use .then() promise for post addition

                storesCollec.doc(storeId).get().then((storeDoc) => {
                    let storeRef = db.collection("stores/").doc(storeDoc.id);

                    console.log("store name: " + storeDoc.get("store_name"));
                    storeName = storeDoc.get("store_name");

                    // FOR TESTING PURPOSES
                    console.log("adding post");
                    console.log("storeDoc: " + storeDoc);

                    // adding new post
                    postsCollec.add({
                        post_image: imgUrl,
                        post_date: dateAndTime,
                        timestamp: curTime,
                        post_name: storeName,
                        post_items: itemIDs,
                        post_store: storeRef
                    }).then(function (postRef) {
                        postId = postsCollec.doc(postRef.id);
                        // userPost.push(postId);
                        // firebase.auth().onAuthStateChanged(function (user) {
                        //     db.collection("users/").doc(user.id).update({
                        //         user_posts: userPost
                        //     })
                        // })
                    }).catch(function (error) {
                        console.log("Error adding document: ", error);
                    });
                });


                // db.collection("stores").add({
                //     location: locate,
                //     store_items: itemIDs,
                //     store_name: document.getElementById("nameStore").value
                // }).then(function (docRef) {
                //     storeId = db.collection("stores/").doc(docRef.id);
                //     // FOR TESTING PURPOSES (attempt to set itemIDs to store_items):
                //     // storeId.set({
                //     //     location: locate,
                //     //     store_items: itemIDs,
                //     //     store_name: document.getElementById("nameStore").value
                //     // });
                //     console.log(storeId);
                // db.collection("posts").add({
                //     post_image: imgUrl,
                //     post_date: dateAndTime,
                //     timestamp: curTime,
                //     post_name: document.getElementById("nameStore").value,
                //     post_items: itemIDs,
                //     post_store: storeId
                // }).then(function (docRef) {
                //     postId = db.collection("posts/").doc(docRef.id);
                //     // userPost.push(postId);
                //     // firebase.auth().onAuthStateChanged(function (user) {
                //     //     db.collection("users/").doc(user.id).update({
                //     //         user_posts: userPost
                //     //     })
                //     // })
                // }).catch(function (error) {
                //     console.log("Error adding document: ", error);
                // });
                // });
            }
        });
    }
}

/**
 * Get the item information if the item checkbox is checked.
 */
function getItemInfo() {
    if (document.querySelector('#customCheck1:checked')) {
        items.push(document.getElementById("customCheck").value);
        // let itemQuantity = document.getElementById("inlineFormInputGroup1").value;
        let itemQuantity = document.getElementById("slider").value;
        console.log(itemQuantity);
        stock.push(itemQuantity);
    }

    if (document.querySelector('#customCheck2:checked')) {
        items.push(document.getElementById("customCheck2").value);
        // let itemQuantity = document.getElementById("inlineFormInputGroup2").value;
        let itemQuantity = document.getElementById("slider2").value;
        console.log(itemQuantity);
        stock.push(itemQuantity);
    }

    if (document.querySelector('#customCheck3:checked')) {
        items.push(document.getElementById("customCheck3").value);
        // let itemQuantity = document.getElementById("inlineFormInputGroup3").value;
        let itemQuantity = document.getElementById("slider3").value;
        console.log(itemQuantity);
        stock.push(itemQuantity);
    }
}

/**
 * Save information that users entered and update it to database.
 */
function save() {
    console.log("inside save()");
    let promise = new Promise(function (req, res) {
        getItemInfo();
    });
    console.log("begin promise chain");
    promise
        .then(getTimeStamp())
        .then(getAllPost())
        .then(setDataPost())
        .then(updateUser())
        .then(move());
    console.log("end promise chain");
    console.log("end of save()");
    setTimeout(function () {
        window.location.href = "./post.html";
    }, TIME * 4);
}

/**
 * Get the timestamp when the user posts.
 */
function getTimeStamp() {

    // creates new date, formatted "Wed May 06 2020 15:23:38 GMT-0700 (Pacific Daylight Time)""
    var curDate = new Date();

    // extracts the date
    var date = curDate.getDate();

    // extracts the month
    var month = curDate.getMonth();

    // extracts the year
    var year = curDate.getFullYear();

    // ensures that digits are always 2
    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    // formats date to "month/day/year" 
    var monthDateYear = (month + 1) + "/" + date + "/" + year;

    // grabs current timestamp
    curTime = curDate.getTime();

    // formats timestamp to local time
    var newTime = curDate.toLocaleTimeString()

    // formats date and time together
    dateAndTime = curDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

/**
 * Gets all the posts that the user has posted and stores it into an array.
 */
function getAllPost() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("/users/").doc(user.uid).get().then(function (user) {
            let uPostExists = user.get("user_posts");
            console.log("user_posts exists: " + uPostExists);
            if (uPostExists !== undefined) {
                userPost = user.data().user_posts;
                console.log("set userPost to user.data().user_posts");
            } else {
                userPost = [];
                console.log("made blank userPost array");
            }
        })
    });
}

/**
 * Update user posts in users collection on database when users post. 
 */
function updateUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("/users/").doc(user.uid).update({
            user_posts: userPost
        });
    });
}

/**
 * Increase the point every time the user posts and update points into database.
 */
function move() {

    var user = firebase.auth().currentUser;
    let doc = db.collection('/users/').doc(user.uid);

    doc.update({
        points: incrementEXP
    }); // increments points
    updateExp();

    console.log("pressed");
}

/**
 * Update the level when users reach new level and resets the point to 0,
 * and show congratulation message to users.
 */
function updateExp() {
    var user = firebase.auth().currentUser;


    let doc = db.collection('/users/').doc(user.uid).onSnapshot(function (snap) {
        let exp = snap.data().points;

        if (exp >= 100) {
            let level = snap.data().level;

            db.collection('/users/').doc(user.uid).update({
                points: 0
            });
            db.collection('/users/').doc(user.uid).update({
                level: level + 1
            }); // increments level
            $("#lv").html("Level: " + level);
            $("#levelReached").html(level + 1);
            $(".pyro").css({"display":"inline"});
            $("#congratulation").modal("show");
        }

    });
}

/**
 * Store the image that user has uploaded to firebase storage and gets the reference.
 */
// $(document).ready(function () {
//     fileButton.addEventListener('change', function (e) {
//         var file = e.target.files[0];
//         //create a storage ref
//         var storageRef = firebase.storage().ref().child('Image/' + file.name);
//         console.log("post storageRef: " + storageRef);

// //     // store the storeID into the designated variable
// //     storeId = curStoreId;

// //     // FOR TESTING PURPOSES
// //     console.log("storeID in post: " + storeId);
// //     // console.log("current store: " + storesCollec.doc(storeId).get().then((doc) => {

// //     // }));
// //     // console.log("location: " + storesCollec.doc(storeId).get("location"));



// //     // FOR TESTING PURPOSES
// //     console.log("end of getStoreIdToPost()");
// // }



/**
 * Store the image that user has uploaded to firebase storage and gets the reference.
 */
$(document).ready(function () {
    console.log("current window location: " + window.location.href);
    if (window.location.href.includes("/posting.html")) {
        console.log("window location TRUE");
        storeId = localStorage.getItem("storeId");

        fileButton.addEventListener('change', function (e) {
            var file = e.target.files[0];
            //create a storage ref
            var storageRef = firebase.storage().ref().child('Image/' + file.name);
            console.log("post storageRef: " + storageRef);

            var task = storageRef.put(file);

            storageRef.getDownloadURL().then(function (url) {
                console.log("storageRef downloadURL: " + url);
                imgUrl = url;
            });

            //update progress bar
            task.on('state_changed',
                function error(err) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                function complete() {
                    storageRef.getDownloadURL().then(function (url) {
                        console.log("downloadURL: " + url);
                        imgUrl = url;
                    });
                }
            );
        });

        /**
         * Invoke save() when button is clicked.
         */
        document.getElementById("postButton").onclick = function () {
            save();
        };
    }
});