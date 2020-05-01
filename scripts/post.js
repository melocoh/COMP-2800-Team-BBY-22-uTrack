// Get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

// Listen for file selection
fileButton.addEventListener('change', function (e) {
    // Get file
    var file = e.target.files[0];

    // Create a storage ref
    var storageRef = firebase.storage().ref('items/' + file.name);

    // Upload file
    var task = storageRef.put(file);

    // Update progress bar
    task.on('stage_changed',
        function progress(snapshot) {
            var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader.value = percentage;
        },

        function error(err) {

        },

        function complete() {

        }

    );
});

let itemName = document.getElementById("customCheck1").value;
stock.push({
    item: itemName,
    units: itemQuantity
})


if (document.querySelector('#customCheck2:checked')) {
    items.push(document.getElementById("customCheck2").value);
    let itemQuantity = document.getElementById("inlineFormInputGroup2").value;
    let itemName = document.getElementById("customCheck2").value;
    stock.push({
        item: itemName,
        units: itemQuantity
    })
}

if (document.querySelector('#customCheck3:checked')) {
    items.push(document.getElementById("customCheck3").value);
    let itemQuantity = document.getElementById("inlineFormInputGroup3").value;
    let itemName = document.getElementById("customCheck3").value;
    stock.push({
        item: itemName,
        units: itemQuantity
    })
}



//upload image to storage
//get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    //create a storage ref
    var storageRef = firebase.storage().ref().child('Image/' + file.name);
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