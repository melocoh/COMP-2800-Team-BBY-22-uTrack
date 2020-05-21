/** Firestore Store Logos Folder Reference */
var storageRef = firebase.storage().ref().child("store_logos");

/** Array of valid stores */
var storeList = [];

/** Holds current store object */
let curStore;

/** Holds Firebase Document ID of current store */
let curStoreId;

/** Holds the latest post uploaded for that store */
let latestPost;

/** Determines the number of iterations for reading items and stocks */
const maxItems = 3;

/**
 * Pushes stores into the storeList array
 * @param {} store 
 */
function initReadModal(store) {
    storeList.push(store);
    curStore = store;
    // console.log("curStore: " + curStore);
    // sort by latest post relevant to store
    findAndSortPosts();

    // show the store logo
    // readStoreLogo();

    // // show the item names
    // readItemName();

    // // show the item stocks
    // readStockStatus();
}

/**
 * Updates the modal information based on the given store
 * @param {} cardIndex 
 */
function getStore(cardIndex) {
    // add to onAttach and onDetach for markers.js
    // $("#reportButton").css("display", "none");

    console.log("getting store...");
    curStore = storeList[cardIndex - 1];
    curStoreId = curStore.id;
    console.log("cardIndex: " + cardIndex);
    console.log("curStore: " + curStore);

    // sort by latest post relevant to store
    // findAndSortPosts();

    readStoreLogo();

    // readItemName();

    readStockStatus();

    // readUserProfile();

    console.log("finished getting store...");
}

/**
 * Reads the latest store to be added
 */
function readLatest() {
    console.log("reading latest");
    curStoreId = curStore.id;
    console.log("curStoreId: " + curStoreId);
}

/**
 * Finds and sorts store posts for the latest one
 */
function findAndSortPosts() {

    curStoreId = db.collection("stores/").doc(curStore.id);
    console.log("curStoreId: " + curStoreId);

    let relevantPost = db.collection("posts").where("post_store", "==", curStoreId).orderBy("timeStamp", "desc").limit(1);
    console.log("relevantPost: " + relevantPost);
    latestPost = relevantPost;
    console.log("latestPost: " + latestPost);
}

/**
 * Reads the current store's logo and puts into the modal
 */
function readStoreLogo() {
    // holds store logo
    let storeLogo;
    // holds current store's name
    let storeName = curStore.get("store_name");

    // select a logo based on name
    switch (storeName) {
        case "Walmart":
            storeLogo = storageRef.child("walmart.png");
            break;
        case "Superstore":
            storeLogo = storageRef.child("superstore.png");
            break;
        case "Save-on-Foods":
            storeLogo = storageRef.child("saveonfoods.png");
            break;
        case "Costco":
            storeLogo = storageRef.child("costco.png");
            break;
    }

    // get the download url then modify the associated HTML element
    storeLogo.getDownloadURL().then(function (url) {
        $(".storeLogos").attr("src", url);
        console.log(url);
    }).catch(function (error) {
        console.log(error);
    })
}

/**
 * Reads the current store's item names
 */
function readItemName() {
    // read each item

    // OLD:
    // curStore.get().then(function (doc) {

    // var items = doc.get("store_items");
    let items = curStore.data().store_items;
    console.log("reading items;" + items);

    for (let i = 0; i < maxItems; i++) {
        let curItem;
        console.log(i + 1);
        // console.log(items[i].get("item_name"));
        // items[i].get("item_name")
        if (items.length > 0 && i < items.length) {
            items[i].get().then(function (doc) {
                curItem = doc.get("item_name");
                $(".item" + (i + 1)).text(curItem);
                console.log(doc.get("item_name"));
            });
        } else {
            $(".item" + (i + 1)).text("Out of Stock");
        }

        // console.log(curItem);
    }
    // })
}

/**
 * Reads the current store's supply status
 */
function readStockStatus() {
    // curStore.get().then(function (doc) {
    let items = curStore.data().store_items;
    console.log("reading stock status; " + items);

    for (let i = 0; i < maxItems; i++) {
        let curItem;

        if (i < items.length) {
            items[i].get().then(function (doc) {
                curItem = doc.get("stock_number");
                $(".stock" + (i + 1)).text(curItem);
                console.log(doc.get("stock_number"));
            });
        } else {
            $(".stock" + (i + 1)).text("N/A");
        }

    }
    // })
}

/**
 * Reads the user information of latest post (OLD)
 */
function readUserProfile() {
    console.log("beginning of readUserProfile()");
    // modal HTML elements
    let modalUPic = $("#modalProfPic");
    let modalUName = $("#modalFirstName");

    // firebase user id reference
    let userRef;
    // firebase user name reference
    let userName;
    // firebase user level reference
    let userLevel;


    if (latestPost !== undefined) {
        console.log("extracting user from latest post");
        // extract the user of latest post
        latestPost.get().then(function (docRef) {
            userRef = docRef.get("user_id");
            console.log("userRef: " + userRef);

            console.log("extracting user information");
            // extract user information
            userRef.get().then(function (docRef) {
                userLevel = docRef.get("level");
                console.log("userLevel: " + userLevel);

                userName = docRef.displayName;
                console.log("userName: " + userName);

                console.log("setting user name in modal");
                $(modalUName).text(userName);
            });
        });
    }

    console.log("end of readUserProfile()");
}

/**
 * 
 */
function initUploadButton() {
    $("#uploadPostButton").click(() => {
        // FOR TESTING PURPOSES
        console.log("clicked upload post button");

        // calls function from post.js to pass store id
        // insert function here (this function stores the id into a global variable)
        // getStoreIdToPost(curStoreId);
        localStorage.setItem("storeId", curStoreId);

        // FOR TESING PURPOSES
        console.log("before window location change to post.html");

        // change window location to post page
        window.location.href = "./posting2.html";

        // FOR TESTING PURPOSES
        console.log("after window location change to post.html: haha unreachable code.");
    });
}

$(document).ready(() => {
    // initialize upload post button for map marker modal
    initUploadButton();
});