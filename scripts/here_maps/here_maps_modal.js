// Firestore Store Logos Folder Reference
var storageRef = firebase.storage().ref().child("store_logos");

// Array of valid stores
let storeList = [];

// Holds current store object
let curStore;

// Holds Firebase Document ID of current store
let storeId;

// Determines the number of iterations for reading items and stocks
const maxItems = 3;

/**
 * Pushes stores into the storeList array
 * @param {} store 
 */
function initReadModal(store) {
    // storeList.push(store);
    curStore = store;
    // console.log("curStore: " + curStore);
    // sort by latest post relevant to store
    findAndSortPosts();

    // show the store logo
    readStoreLogo();

    // show the item names
    readItemName();

    // show the item stocks
    readStockStatus();
}

/**
 * Reads the latest store to be added
 */
function readLatest() {
    console.log("reading latest");
    storeId = curStore.id;
    console.log("storeID: " + storeId);
}

/**
 * Finds and sorts store posts for the latest one
 */
function findAndSortPosts() {

    storeId = curStore.id;
    console.log("storeID: " + storeId);

    let relevantPosts = db.collection("posts").where("post_store", "==", storeId).orderBy("timeStamp", "desc");
    console.log(relevantPosts);
}

/**
 * Reads the current store's logo and puts into the modal
 */
function readStoreLogo() {
    let storeLogo;
    let storeName = curStore.get("store_name");
    switch(storeName) {
        case "Walmart":
            storeLogo = storageRef.child("");
            break;
        case "Superstore":
            storeLogo = storageRef.child("");
            break;
    }
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
                $(".item_name" + (i + 1)).text(curItem);
                console.log(doc.get("item_name"));
            });
        } else {
            $(".item_name" + (i + 1)).text("Out of Stock");
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
                $(".stock_status" + (i + 1)).text(curItem);
                console.log(doc.get("stock_number"));
            });
        } else {
            $(".stock_status" + (i + 1)).text("N/A");
        }

    }
    // })
}