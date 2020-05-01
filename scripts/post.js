let checked1 = false;
let checked2 = false;
let checked3 = false;
let items = [];
let stock = [];
let imgUrl = localStorage.getItem(0);
let itemsId;
let storeId;
const TIME = 500;

//invoke functions
removeQuantity();
setInterval(function () {
    checkbox();
}, TIME);

//check if the check box is checked or not
function checkbox() {

    if (document.querySelector('#customCheck1:checked')) {
        checked1 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox1').style.visibility = "visible";
    } else {
        checked1 = false;
        document.querySelector('#textBox1').style.visibility = "hidden";

    }

    if (document.querySelector('#customCheck2:checked')) {
        checked2 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox2').style.visibility = "visible";
    } else {
        checked2 = false;
        document.querySelector('#textBox2').style.visibility = "hidden";
    }

    if (document.querySelector('#customCheck3:checked')) {
        checked3 = true;
        document.querySelector('#quantity').style.display = "inline";
        document.querySelector('#textBox3').style.visibility = "visible";
    } else {
        checked3 = false;
        document.querySelector('#textBox3').style.visibility = "hidden";
    }

    if (!document.querySelector('#customCheck1:checked') &&
        !document.querySelector('#customCheck2:checked') &&
        !document.querySelector('#customCheck3:checked')) {
        removeQuantity();
    }
}

function removeQuantity() {
    document.querySelector('#quantity').style.display = "none";
}

//write data to database

function setDataPost(){
    let locate = document.getElementById("address").value + ", " 
                + document.getElementById("province").value 
                + ", " + document.getElementById("zip").value;
    db.collection("items").add({
        category: items,
        item_name: items,
        stock_number: stock
    }).then(function(docRef){
        itemsId= db.collection("items/").doc(docRef.id);
        db.collection("stores").add({
            location: locate,
            store_items: itemsId,
            store_name: document.getElementById("nameStore").value
        }).then(function(docRef){
            storeId = db.collection("stores/").doc(docRef.id);
            db.collection("posts").add({
                post_image: imgUrl,
                // post_date: firebase.database.ServerValue.TIMESTAMP.toDate(),
                post_name: document.getElementById("nameStore").value,
                post_items: itemsId,
                post_store: storeId
            }).then(function(docRef){
                firebase.auth().onAuthStateChanged(function(user){
                    db.collection("users/").doc(user.id).update({
                        user_posts: db.collection("posts/").doc(docRef.id)
                    });
            })
        }).catch(function(error){
            console.log("Error adding document: ", error);
        });
    })
    })
}

//get item info 
function getItemInfo(){
    if (document.querySelector('#customCheck1:checked')) {
        items.push(document.getElementById("customCheck1").value);
        let itemQuantity = document.getElementById("inlineFormInputGroup1").value;
        let itemName = document.getElementById("customCheck1").value;
        stock.push(
            {
                item: itemName,
                units: itemQuantity
            }
        )
    }

    if (document.querySelector('#customCheck2:checked')) {
        items.push(document.getElementById("customCheck2").value);
        let itemQuantity = document.getElementById("inlineFormInputGroup2").value;
        let itemName = document.getElementById("customCheck2").value;
        stock.push(
            {
                item: itemName,
                units: itemQuantity
            }
        )
    }
   
    if (document.querySelector('#customCheck3:checked')) {
        items.push(document.getElementById("customCheck3").value);
        let itemQuantity = document.getElementById("inlineFormInputGroup3").value;
        let itemName = document.getElementById("customCheck3").value;
        stock.push(
            {
                item: itemName,
                units: itemQuantity
            }
        )
    }
}


//upload image to storage
//get elements
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    //create a storage ref
    var storageRef = firebase.storage().ref().child('Image/' + file.name);
    localStorage.setItem(0, storageRef);
    //upload file
    var task = storageRef.put(file);
    //update progress bar
    task.on('state_changed',
        function error(err) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function complete() {
            task.snapshot.ref.getDownloadURL().then(function (getDownloadURL) {
                console.log('File available at', downloadURL);
                localStorage.setItem(0, downloadURL);
            });
        }
    );
});

function save() {
    getItemInfo();
    setDataPost();
}

document.getElementById("postButton").onclick = save;