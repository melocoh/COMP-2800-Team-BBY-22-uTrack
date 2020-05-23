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
 * @param {Firebase.Reference} store 
 */
function initReadModal(store) {
    // pushes stores into local array of stores
    storeList.push(store);

    // sets current store holder to the passed store
    curStore = store;

    // sort by latest post relevant to store
    findAndSortPosts();
}

/**
 * Updates the modal information based on the given store
 * @param {Number} cardIndex 
 */
function getStore(cardIndex) {
    console.log("getting store...");

    // get the current store reference relative to its position in the array
    curStore = storeList[cardIndex - 1];

    // gets current store's id
    curStoreId = curStore.id;

    console.log("cardIndex: " + cardIndex);
    console.log("curStore: " + curStore);

    readStoreLogo();

    readStockStatus();

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
    // gets the current store's id
    curStoreId = db.collection("stores/").doc(curStore.id);

    console.log("curStoreId: " + curStoreId);

    // gets the latest post reference
    let relevantPost = db.collection("posts").where("post_store", "==", curStoreId).orderBy("timeStamp", "desc").limit(1);
    
    console.log("relevantPost: " + relevantPost);
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
    // gets the array of item references from current store reference
    let items = curStore.data().store_items;

    console.log("reading items;" + items);

    // loops through all 3 types of items
    for (let i = 0; i < maxItems; i++) {
        // holds the current item based on index
        let curItem;
        
        console.log(i + 1);

        // checks to see if item references do exist
        if (items.length > 0 && i < items.length) {
            // sets value to the associated HTML element
            items[i].get().then(function (doc) {
                // get item name
                curItem = doc.get("item_name");
                
                // place text into associated HTML element
                $(".item" + (i + 1)).text(curItem);

                console.log(doc.get("item_name"));
            });
        } else {
            // placeholder text value for associated HTML element
            $(".item" + (i + 1)).text("Out of Stock");
        }
    }
}

/**
 * Reads the current store's supply status
 */
function readStockStatus() {
    // code is very similar to readItemName() so refer to it for comments

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
}

/**
 * Initializes the mouseclick event listener for the "Upload Post" button
 * in the map marker modal
 */
function initUploadButton() {
    $("#uploadPostButton").click(() => {
        console.log("clicked upload post button");

        // sets the current store id to the local storage (to be accessed by post.js)
        localStorage.setItem("storeId", curStoreId);

        console.log("before window location change to post.html");

        // change window location to post page
        window.location.href = "./posting2.html";

        console.log("after window location change to post.html: haha unreachable code.");
    });
}

$(document).ready(() => {
    // initialize upload post button for map marker modal
    initUploadButton();
});