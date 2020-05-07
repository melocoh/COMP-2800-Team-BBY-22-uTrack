var colUsers = db.collection("users");
var colItems = db.collection("items");
var colPosts = db.collection("posts");
var colStores = db.collection("stores");

function readLatest() {
    // store doc
    var store = db.collection("stores").doc("mypwpPVth1Obt0wgPIJP");
    // array of items

    // read each item
    store.get().then(function (doc) {
        // var items = doc.get("store_items");
        var items = doc.data().store_items;
        console.log(items);

        for (let i = 0; i < items.length; i++) {
            var curItem;
            console.log(i + 1);
            // console.log(items[i].get("item_name"));
            // items[i].get("item_name")
            items[i].get().then(function (doc) {
                curItem = doc.get("item_name");
                $(".item_name" + (i + 1)).text(curItem);
                console.log(doc.get("item_name"));
            });
            // console.log(curItem);
        }
    })
}