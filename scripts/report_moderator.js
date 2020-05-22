/**
 * Display the post that has been reported by reading data from database.
 */
let items = "";
db.collection("reports").get().then(function (querySnapshot) {
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
        let p7 = document.createElement("p");
        let btn = document.createElement("button");
        let span2 = document.createElement("span");
        let span1 = document.createElement("span");
        let span3 = document.createElement("span");
        var postId = doc.get("report_post");
        //Gets the post information and display it
        getPostInfo(postId, p1, p2, p3, p4, p5, btn, span1, span2, span3, contain, doc.id);
        //Set the style for some elements
        setStyle(contain, p1, p6, btn);

        p4.setAttribute("id", "itemName");
        btn.innerHTML = "Delete";
        p7.innerHTML = "Reason: " + doc.get("report_reason");

        p6.appendChild(btn);
        text.appendChild(p1);
        text.appendChild(p4);
        text.appendChild(p3);
        text.appendChild(p5);
        text.appendChild(p7);
        text.appendChild(p2);
        text.appendChild(p6);
        contain.appendChild(text);
        document.querySelector("#theContainer").appendChild(contain);
    })
})

/**
 * Gets the posts' information and use it to display or delete data on database.
 * I have read the code for deleting data on database from stackoverflow and firebase document.
 * @param {*} postId 
 * @param {*} p1 
 * @param {*} p2 
 * @param {*} p3 
 * @param {*} p4 
 * @param {*} p5 
 * @param {*} btn
 * @param {*} span1
 * @param {*} span3
 * @param {*} contain 
 * @param {*} b 
 */
function getPostInfo(postId, p1, p2, p3, p4, p5, btn, span1, span2, span3, contain, b) {
    postId.get().then(function (doc) {
        var storeInfo = doc.get("post_store");
        var listItem = doc.data().post_items;
        var userInfo = doc.get("user_id");
        getStoreInfo(storeInfo, p3);
        getItemInfo(listItem, p4);
        p1.innerHTML = doc.data().post_name;
        p2.src = doc.get("post_image");
        p2.style.width = "250px";
        p2.style.height = "250px";
        span1.innerHTML = "Posted by ";
        span3.innerHTML = " @ " + doc.get("post_date");
        console.log(storeInfo);
        console.log(listItem);
        getUserInfo(userInfo, p5, span1, span2, span3);

        function removePost() {
            contain.style.display = "none";
            console.log(storeInfo);
            console.log(listItem);
            console.log(postId);
            console.log(b);
            //delete item
            deleteItem(listItem);

            //delete store
            storeInfo.delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

            //delete post
            postId.delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

            //delete the report
            db.collection("reports").doc(b).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

            db.collection("reports").get().then(function (snap) {
                document.querySelector(".totalReport").innerHTML = snap.size;
            });
        }
        btn.onclick = removePost;
    })
}

/**
 * Get store information from store reference in specific post document and display it.
 * @param {*} storeInfo 
 * @param {*} p3 
 */
function getStoreInfo(storeInfo, p3) {
    storeInfo.get().then(function (doc) {
        p3.innerHTML = doc.get("location");
    })
}

/**
 * Get items information from items reference in specific post document and display it.
 * @param {*} listItem 
 * @param {*} p4 
 */
function getItemInfo(listItem, p4) {
    for (let i = 0; i < listItem.length; i++) {
        var name;
        var stock;
        listItem[i].get().then(function (doc) {
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
 * Sets the style for the post elements to display post.
 * @param {*} contain 
 * @param {*} p1 
 * @param {*} p6 
 * @param {*} btn 
 */
function setStyle(contain, p1, p6, btn) {
    contain.style.textAlign = "center";
    contain.style.margin = "15px";
    contain.style.padding = "10px";
    contain.style.borderRadius = "10px";
    p1.style.fontWeight = "bold";
    p6.style.textAlign = "center";
    btn.style.backgroundColor = "tomato";
    btn.style.color = "white";
    btn.style.borderRadius = "7px";
    contain.style.backgroundColor = "white";

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
 * Set the style for some elements.
 */
$(document).ready(function () {
    $(".container").css({
        "margin-top": "100px",
        "margin-bottom": "70px"
    });
    $("#newPost").css({
        "display": "flex",
        "justify-content": "flex-end",
        "padding": "15px"
    });
});

/**
 * Get information of the user who posted the post and display it in modal.
 * @param {*} userInfo 
 * @param {*} p5 
 * @param {*} span1 
 * @param {*} span2 
 * @param {*} span3 
 */
function getUserInfo(userInfo, p5, span1, span2, span3) {
    userInfo.get().then(function (doc) {
        var userName = doc.get("name");

        span2.innerHTML = `<b>` + userName + `</b>`;
        span2.style.color = "#0F52BA";
        span2.setAttribute("value", doc.uid);
        span2.setAttribute("data-toggle", "modal");
        span2.setAttribute("data-target", "#profileModal");
        p5.appendChild(span1);
        p5.appendChild(span2);
        p5.appendChild(span3);
        span2.onclick = function () {
            switch (doc.get("level")) {
                case 1:
                    $("#userAvatar").attr("src", "./images/Avatar/level_1.png");
                    $("#userAvatar").css({
                        "width": "150px",
                        "height": "150px"
                    });
                    break;
                case 2:
                    $("#userAvatar").attr("src", "./images/Avatar/level_2.png");
                    $("#userAvatar").css({
                        "width": "150px",
                        "height": "150px"
                    });
                    break;
                case 3:
                    $("#userAvatar").attr("src", "./images/Avatar/level_3.png");
                    $("#userAvatar").css({
                        "width": "150px",
                        "height": "150px"
                    });
                    break;
                default:
                    $("#userAvatar").attr("src", "./images/Avatar/level_4.png");
                    $("#userAvatar").css({
                        "width": "150px",
                        "height": "150px"
                    });
                    break;
            }
            console.log(userName);
            console.log(doc.get("level"));
            $("#userName").html(userName);
            $("#userLevel").html("<b>" + "Lv." + doc.get("level") + "</b>");
            $("#userLevel").css({
                "color": ""
            });
        }

    })
}