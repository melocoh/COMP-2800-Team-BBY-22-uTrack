let storeItems;
let item = "";
db.collection("posts").orderBy("post_date").get().then(function (querySnapshot){
    querySnapshot.forEach(function (doc){
        let contain = document.createElement("div");
        contain.setAttribute("class", "card");
        let text = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("img");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        // p1.setAttribute("id","itemImage");
        // p2.setAttribute("id","storeName");
        // p3.setAttribute("id","address");
        // p4.setAttribute("id","itemName");
        p1.innerHTML = doc.data().post_name;
        p2.src = doc.data().post_image;
        var storeInfo = doc.data().post_store;
        getStoreInfo(storeInfo,p3);
        getItemInfo(p4);
        text.appendChild(p1);
        text.appendChild(p2);
        text.appendChild(p3);
        text.appendChild(p4);
        contain.appendChild(text);
        body.appendChild(contain);
    })
})

function getStoreInfo(storeInfo,p3){
    storeInfo.get().then(function(doc){
        p3.innerHTML = doc.data().location;
        storeItems = doc.data().store_items;
    })
}

function getItemInfo(p4){
    storeItems.forEach(function(doc){
        item = item + doc.data().item_name + ": " + doc.data().stock_number + "</br>";
    })
    p4.innerHTML = item;
}