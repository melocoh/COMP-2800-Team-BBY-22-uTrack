// Firestore Store Logos Folder Reference
var storageRef = firebase.storage().ref().child("store_logos");

// Array of valid stores
var storeList = [];

// Holds current store object
let curStore;

// Holds Firebase Document ID of current store
let curStoreId;

// Determines the number of iterations for reading items and stocks
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
    console.log("getting store...");
    curStore = storeList[cardIndex - 1];
    curStoreId = curStore.id;
    console.log("cardIndex: " + cardIndex);
    console.log("curStore: " + curStore);

    // sort by latest post relevant to store
    // findAndSortPosts();

    readStoreLogo();

    readItemName();

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

    curStoreId = curStore.id;
    console.log("curStoreId: " + curStoreId);

    let relevantPosts = db.collection("posts").where("post_store", "==", curStoreId).orderBy("timeStamp", "desc");
    console.log(relevantPosts);
}

/**
 * Reads the current store's logo and puts into the modal
 */
function readStoreLogo() {
    let storeLogo;
    let storeName = curStore.get("store_name");
    switch (storeName) {
        case "Walmart":
            storeLogo = storageRef.child("logo_walmart.jpg");
            break;
        case "Superstore":
            storeLogo = storageRef.child("logo_superstore.jpg");
            break;
        case "Save-on-Foods":
            storeLogo = storageRef.child("logo_saveonfoods.jpg");
            break;
        case "Costco":
            storeLogo = storageRef.child("logo_costco.jpg");
            break;
    }

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
        if (i < items.length) {
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
        window.location.href = "./posting.html";

        // FOR TESTING PURPOSES
        console.log("after window location change to post.html: haha unreachable code.");
    });
}

$(document).ready(() => {
    // initialize upload post button for map marker modal
    initUploadButton();
});