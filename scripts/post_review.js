// let storeItems;
let items = "";
db.collection("posts").get().then(function (querySnapshot){
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
        // p2.src = doc.data().post_image;
        var storeInfo = doc.data().post_store;
        getStoreInfo(storeInfo,p3);
        // getItemInfo(p4);
        text.appendChild(p1);
        text.appendChild(p2);
        text.appendChild(p3);
        text.appendChild(p4);
        contain.appendChild(text);
        document.querySelector("#theContainer").appendChild(contain);
    })
})

function getStoreInfo(storeInfo, p3, p4){
    storeInfo.get().then(function(doc){
        p3.innerHTML = doc.data().location;
        let storeItems = doc.data().store_items;
        console.log(storeItems);
        getItemInfo(storeItems, p4);
    })
}

function getItemInfo(storeItems, p4){
    // storeItems.forEach(function(doc){
    //     item = item + doc.data().item_name + ": " + doc.data().stock_number + "</br>";
    // })
    // p4.innerHTML = item;

    // storeItems.forEach(myFunction);
    for (let i = 0; i < storeItems.length; i++){
        storeItems[i].get().then(function(doc){
            items = items + doc.get(item_name) + ": " + doc.get(stock_number) + "</br>";
        })
    }
    p4.innerHTML = items;
    // function myFunction(item){
    //     item.get().then(function(doc){
    //         items = items + doc.data().item_name + ": " + doc.data().stock_number + "</br>";
    //     })
    // }
}