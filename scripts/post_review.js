// let storeItems;
let items = "";
let postlists = [];
let report_index = 0;
let butval;


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
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target", "#basicExampleModal");
        btn.setAttribute("id", report_index);
        btn.setAttribute("value", report_index);
        btn.onclick = function(){
            butval = parseInt(btn.value);
            $(".mess").click(function(){
                        var reason = $(this).val();
                        localStorage.setItem(0, reason);
                        console.log(reason);
                    });
        }

        setStyle(contain);
        p1.style.fontWeight = "bold";
        btn.style.backgroundColor = "tomato";
        btn.style.color = "white";
        btn.style.borderRadius = "7px";
        p6.style.textAlign = "center";

        p4.setAttribute("id", "itemName");
        p1.innerHTML = doc.data().post_name;
        p2.src = doc.get("post_image");
        p2.style.width = "250px";
        p2.style.height ="250px";
        p5.innerHTML = "Posted: " + doc.get("post_date");
        btn.innerHTML = "Report";
        var storeInfo = doc.get("post_store");
        getStoreInfo(storeInfo, p3, p4);

        p6.appendChild(btn);
        text.appendChild(p1);
        text.appendChild(p2);
        text.appendChild(p3);
        text.appendChild(p4);
        text.appendChild(p5);
        text.appendChild(p6);
        contain.appendChild(text);
        document.querySelector("#theContainer").appendChild(contain);

        postlists.push(doc.id);
        console.log(report_index + ": " + doc.id);
        report_index++;
    })
})

console.log(postlists);

function getStoreInfo(storeInfo, p3, p4) {
    storeInfo.get().then(function (doc) {
        p3.innerHTML = doc.get("location");
        let storeItems = doc.data().store_items;
        console.log(storeItems);
        getItemInfo(storeItems, p4);
    })
}

function getItemInfo(storeItems, p4) {
    for (let i = 0; i < storeItems.length; i++) {
        var name;
        var stock;
        storeItems[i].get().then(function (doc) {
            name = doc.get("item_name");
            stock = doc.get("stock_number");
            var list = document.createElement("li");
            list.innerHTML = items + name + ": " + stock;
            p4.appendChild(list);
        })
    }
}

function setStyle(contain) {
    contain.style.backgroundColor = "#D6EFFF";
    contain.style.margin = "15px";
    contain.style.padding = "10px";
    contain.style.borderRadius = "10px";
}

$(document).ready(function () {
    $(".container").css("margin-top", "100px");
    $("#newPost").css({
        "display": "flex",
        "justify-content": "flex-end",
        "padding": "15px"
    });

    $("#submitButton").click(function () {
        
        if (document.querySelector('#termsConditions:checked')) {
            db.collection("reports").add({
                report_post: db.collection("posts/").doc(postlists[butval]),
                report_reason: localStorage.getItem(0),
                // report_user: "user.uid"
            }).then(function (docRef) {
                let reportId = db.collection("reports/").doc(docRef.id);
                console.log(reportId);
            }).catch(function (error) {
                console.log("Error adding document: ", error);
            })

        console.log(butval);
        console.log(localStorage.getItem(0));
        console.log(postlists[butval]);
        }

    });
});
