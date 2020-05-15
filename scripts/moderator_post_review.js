// let storeItems;
let items = "";
db.collection("posts").orderBy("timestamp","desc").get().then(function (querySnapshot){
    querySnapshot.forEach(function (doc){
        let contain = document.createElement("div");
        contain.setAttribute("class", "card");
        let text = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("img");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");
        let p6 = document.createElement("div");
        let btn = document.createElement("button");
        var storeInfo = doc.get("post_store");
        var listItem = doc.data().post_items;
        // btn.setAttribute("data-toggle", "modal");
        // btn.setAttribute("data-target", "#basicExampleModal");
        function removePost() {
            contain.style.display = "none";

            //delete item
            deleteItem(listItem);

            //delete store
            storeInfo.delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

            //delete post
            db.collection("posts").doc(doc.id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }
        btn.onclick = removePost;
        
        setStyle(contain);
        p1.style.fontWeight = "bold";
        btn.style.backgroundColor = "tomato";
        btn.style.color = "white";
        btn.style.borderRadius ="7px";
        p6.style.textAlign ="center";

        p4.setAttribute("id","itemName");
        p1.innerHTML = doc.data().post_name;
        p2.src = doc.get("post_image");
        p5.innerHTML = "Posted: " + doc.get("post_date");
        btn.innerHTML = "Delete";
        var storeInfo = doc.get("post_store");
        getStoreInfo(storeInfo,p3,p4);
        
        p6.appendChild(btn);
        text.appendChild(p1);
        text.appendChild(p2);
        text.appendChild(p3);
        text.appendChild(p4);
        text.appendChild(p5);
        text.appendChild(p6);
        contain.appendChild(text);
        document.querySelector("#theContainer").appendChild(contain);
    })
})

function getStoreInfo(storeInfo, p3, p4){
    storeInfo.get().then(function(doc){
        p3.innerHTML = doc.get("location");
        let storeItems = doc.data().store_items;
        console.log(storeItems);
        getItemInfo(storeItems,p4);
    })
}

function getItemInfo(storeItems,p4){
    for (let i = 0; i < storeItems.length; i++){
        var name;
        var stock;
        storeItems[i].get().then(function(doc){
            name = doc.get("item_name");
            stock = doc.get("stock_number");
            var list = document.createElement("li");
            list.innerHTML = items + name + ": " + stock;
            p4.appendChild(list);
        })
    }
}

function setStyle(contain){
    contain.style.backgroundColor = "#D6EFFF";
    contain.style.margin = "15px";
    contain.style.padding = "10px";
    contain.style.borderRadius = "10px";
}

function deleteItem(listItem) {
    for (let i = 0; i < listItem.length; i++) {
        listItem[i].delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
}

$(document).ready(function(){
    $(".container").css("margin-top", "100px");
    $("#newPost").css({"display":"flex", "justify-content":"flex-end", "padding":"15px"});
  });

  /**
 * Read the total posts that have been reported from database and display it.
 */
db.collection("reports").get().then(function(snap){
    document.getElementById("totalReport").innerHTML = snap.size;
});

$("#totalReport").css({"background-color":"white","color":"black", "padding":"0px 5px", "border":"2px solid white","borderRadius":"6px"});
