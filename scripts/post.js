let checked1 = false;
let checked2 = false;
let checked3 = false;
let items = [];
let stock = [];
let imgUrl = localStorage.getItem(0);
// let itemsId;
let itemIDs = [];
let storeId;
let curTime;
let dateAndTime;
let postId;
const TIME = 500;

//invoke functions
removeQuantity();
setInterval(function () {
    checkbox();
}, TIME);

//check if the check box is checked or not
function checkbox() {

    if (document.querySelector('#customCheck1:checked')) {
        checked1 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox1').style.visibility = "visible";
    } else {
        checked1 = false;
        document.querySelector('#textBox1').style.visibility = "hidden";

    }

    if (document.querySelector('#customCheck2:checked')) {
        checked2 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox2').style.visibility = "visible";
    } else {
        checked2 = false;
        document.querySelector('#textBox2').style.visibility = "hidden";
    }

    if (document.querySelector('#customCheck3:checked')) {
        checked3 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox3').style.visibility = "visible";
    } else {
        checked3 = false;
        document.querySelector('#textBox3').style.visibility = "hidden";
    }

    if (!document.querySelector('#customCheck1:checked') &&
        !document.querySelector('#customCheck2:checked') &&
        !document.querySelector('#customCheck3:checked')) {
        removeQuantity();
    }
}

function removeQuantity() {
    document.querySelector('#quantity').style.display = "none";
}

//write data to database

function setDataPost() {
    let locate = document.getElementById("address").value + ", " +
        document.getElementById("province").value +
        ", " + document.getElementById("zip").value;

    // iterate over each item in the items array and add them to the database
    for (let i = 0; i < items.length; i++) {
        db.collection("items").add({
            category: items[i],
            item_name: items[i],
            stock_number: stock[i]
        }).then(function (docRef) {
            let itemId = db.collection("items/").doc(docRef.id);
            console.log(itemId);
            itemIDs.push(itemId);
            // TERRIBLE FIX TO BLANK ARRAY OF ITEM REFERENCES:
            // add the store and post once the last item has been pushed to itemIDs arrya
            if (i == items.length - 1) {
                db.collection("stores").add({
                    location: locate,
                    store_items: itemIDs,
                    store_name: document.getElementById("nameStore").value
                }).then(function (docRef) {
                    storeId = db.collection("stores/").doc(docRef.id);
                    // FOR TESTING PURPOSES (attempt to set itemIDs to store_items):
                    // storeId.set({
                    //     location: locate,
                    //     store_items: itemIDs,
                    //     store_name: document.getElementById("nameStore").value
                    // });
                    console.log(storeId);
                    db.collection("posts").add({
                        post_image: imgUrl,
                        post_date: dateAndTime,
                        timestamp: curTime,
                        post_name: document.getElementById("nameStore").value,
                        post_items: itemIDs,
                        post_store: storeId
                    }).then(function (docRef) {
                        postId = db.collection("posts/").doc(docRef.id);
                        firebase.auth().onAuthStateChanged(function (user) {
                            db.collection("users/").doc(user.id).update({
                                user_posts: postId
                            });
                        })
                    }).catch(function (error) {
                        console.log("Error adding document: ", error);
                    });
                });
            }
        });
    }

    // updating item array of store (because it is blank for some reason)
    // btw doesn't work
    // db.collection("stores").doc(storeId).set({
    //     location: locate,
    //     store_items: itemIDs,
    //     store_name: document.getElementById("nameStore").value
    // });

    // FOR TESTING PURPOSES:
    alert("For testing purposes: POSTED!");
}

//get item info 
function getItemInfo() {
    if (document.querySelector('#customCheck1:checked')) {
        items.push(document.getElementById("customCheck1").value);
        let itemQuantity = document.getElementById("inlineFormInputGroup1").value;
        stock.push(itemQuantity);
        // let itemName = document.getElementById("customCheck1").value;
        // stock.push({
        //     item: itemName,
        //     units: itemQuantity
        // })
    }

    if (document.querySelector('#customCheck2:checked')) {
        items.push(document.getElementById("customCheck2").value);
        let itemQuantity = document.getElementById("inlineFormInputGroup2").value;
        stock.push(itemQuantity);
        // let itemName = document.getElementById("customCheck2").value;
        // stock.push({
        //     item: itemName,
        //     units: itemQuantity
        // })
    }

    if (document.querySelector('#customCheck3:checked')) {
        items.push(document.getElementById("customCheck3").value);
        let itemQuantity = document.getElementById("inlineFormInputGroup3").value;
        stock.push(itemQuantity);
        // let itemName = document.getElementById("customCheck3").value;
        // stock.push({
        //     item: itemName,
        //     units: itemQuantity
        // })
    }
}


//upload image to storage
//get elements
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    //create a storage ref
    var storageRef = firebase.storage().ref().child('Image/' + file.name);
    localStorage.setItem(0, storageRef);
    //upload file
    var task = storageRef.put(file);
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
            task.snapshot.ref.getDownloadURL().then(function (getDownloadURL) {
                console.log('File available at', downloadURL);
                localStorage.setItem(0, downloadURL);
            });
        }
    );
});

function save() {
    getItemInfo();
    getTimeStamp();
    setDataPost();
    setTimeout(function () {
        window.location.href = "./post.html";
    }, TIME * 40);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log("user id: " + user.uid);
            
            /* first try
            var currentPost;
            var updatedPost;
            db.collection("/users/").doc(user.uid).onSnapshot(function (snap) {
                currentPost = snap.data().post; 
                updatedPost = currentPost + 1;
                console.log("snap.data().post: " + snap.data().post);
                console.log("updatedPost: " + updatedPost);
                db.collection("users").doc(user.uid).update({
                    post: updatedPost
                })
            })
            */
           
        } else {
            // No user is signed in.
            console.log("User is not signed in.");
            location.href = './login.html';
            console.log("Page should be re-directed by now.");
        }
    });


}

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

document.getElementById("postButton").onclick = save;