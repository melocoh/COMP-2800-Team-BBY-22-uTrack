let curStore;

function initReadModal(store) {
    curStore = store;
    console.log(curStore);
    // sort by latest post relevant to store
    findAndSortPosts();

    // show the item names
    readItemName();

    // show the item stocks
    readStockStatus();
}

function readLatest() {
    console.log("reading latest");
    let storeId = curStore.id;
    console.log("storeID: " + storeId);
}

function findAndSortPosts() {
    let storeId = curStore.id;
    console.log("storeID: " + storeId);

    let relevantPosts = db.collection("posts").where("post_store", "==", storeId).orderBy("timeStamp", "desc");
    console.log(relevantPosts);
}

let maxItems = 3;

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