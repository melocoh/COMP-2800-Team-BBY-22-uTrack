/** Declares and initializes an empty string items */
let items = "";

/**
 * Reads and displays data of posts collection on database based on the timestamp.
 * I have read the code for deleting data on database from stackoverflow and firebase document.
 */
db.collection("posts").orderBy("timestamp", "desc").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
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
        //delete the data on database. 
        function removePost() {
            contain.style.display = "none";

            //delete report
            deleteReport(doc.get("reported"));

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

            db.collection("reports").get().then(function (snap) {
                document.getElementById("totalReport").innerHTML = snap.size;
            });
        }
        btn.onclick = removePost;

        setStyle(contain, p1, p6, btn);

        p4.setAttribute("id", "itemName");
        p1.innerHTML = doc.data().post_name;
        p2.src = doc.get("post_image");
        p2.style.width = "250px";
        p2.style.height = "250px";
        //need to change it back when slider is fix and have new post.
        // p5.innerHTML = "Posted by " + doc.get(user_post) + "@" + doc.get("post_date");
        p5.innerHTML = "Posted: " + doc.get("post_date");
        btn.innerHTML = "Delete";
        var storeInfo = doc.get("post_store");
        getStoreInfo(storeInfo, p3, p4);

        p6.appendChild(btn);
        text.appendChild(p1);
        text.appendChild(p4);
        text.appendChild(p3);
        text.appendChild(p5);
        text.appendChild(p2);
        text.appendChild(p6);
        contain.appendChild(text);
        document.querySelector("#theContainer").appendChild(contain);
    })
})

/**
 * Get store information from store reference in specific post document and display it.
 * @param {*} storeInfo 
 * @param {*} p3 
 * @param {*} p4 
 */
function getStoreInfo(storeInfo, p3, p4) {
    storeInfo.get().then(function (doc) {
        p3.innerHTML = doc.get("location");
        let storeItems = doc.data().store_items;
        console.log(storeItems);
        getItemInfo(storeItems, p4);
    })
}

/**
 * Get items information from item reference in specific store document and display it.
 * @param {*} storeItems 
 * @param {*} p4 
 */
function getItemInfo(storeItems, p4) {
    for (let i = 0; i < storeItems.length; i++) {
        var name;
        var stock;
        storeItems[i].get().then(function (doc) {
            name = doc.get("item_name");
            stock = doc.get("stock_number");
            var list = document.createElement("li");
            var imageItem;
            if (name == "Face masks") {
                imageItem = "./images/icon_mask.png";
            } else if (name == "Toilet papers") {
                imageItem = "./images/icon_toiletpaper.png";
            } else {
                imageItem = "./images/icon_handsantizer.png";
            }

            // list.innerHTML = items + name + ": " + stock;
            list.innerHTML = `<img src ="` + imageItem + `" style = "width: 70px; height: 70px">` + `<span>` + stock + `<span>`;
            list.style.listStyleType = "none";
            list.style.display = "flex";
            list.style.justifyContent = "space-around";
            list.style.alignItems = "center";
            p4.appendChild(list);
        })
    }
}

/**
 * Set the style for the element contain to display post.
 * @param {*} contain 
 * @param {*} p1
 * @param {*} p6
 * @param {*} btn
 */
function setStyle(contain, p1, p6, btn) {
    contain.style.textAlign = "center";
    contain.style.backgroundColor = "#D6EFFF";
    contain.style.margin = "15px";
    contain.style.padding = "10px";
    contain.style.borderRadius = "10px";
    p1.style.fontWeight = "bold";
    p6.style.textAlign = "center";
    btn.style.backgroundColor = "tomato";
    btn.style.color = "white";
    btn.style.borderRadius = "7px";
}

/**
 * Delete every item document that related to the specific post.
 * @param {*} listItem 
 */
function deleteItem(listItem) {
    for (let i = 0; i < listItem.length; i++) {
        listItem[i].delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
}

/**
 * Delete the report document of the post if it has been reported by other users
 * @param {*} report 
 */
function deleteReport(report) {
    if (report !== undefined) {
        report.delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        })
    }
}

/**
 * Set the style for some elements.
 */
$(document).ready(function () {
    $(".container").css("margin-top", "100px");
    $("#newPost").css({
        "display": "flex",
        "justify-content": "flex-start",
        "padding": "15px"
    });
});

/**
 * Read the total posts that have been reported from database and display it.
 */
db.collection("reports").get().then(function (snap) {
    document.getElementById("totalReport").innerHTML = snap.size;
});

// $("#totalReport").css({
//     "background-color": "white",
//     "color": "black",
//     "padding": "0px 5px",
//     "border": "2px solid white",
//     "borderRadius": "6px"
// });