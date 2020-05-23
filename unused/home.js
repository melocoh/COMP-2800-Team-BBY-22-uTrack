// let greeting = document.getElementById("username");
var x = document.getElementById("demo");
let latData;
let lonData;
let position;

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // greeting.innerHTML = "Welcome, " + user.displayName + "!";
        console.log("Welcome, " + user.displayName + "!");
    }
    // display Welcome if user signed in with phone number ( => user name is null)
    else {
        // greeting.innerHTML = "Welcome!";
        console.log("Welcome!");
    }
})

// //get the location of user
// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else { 
//       x.innerHTML = "Geolocation is not supported by this browser.";
//     }
//   }
  
//   function showPosition(position) {
  
//     // saves data in these variables
//     latData = position.coords.latitude;
//     lonData = position.coords.longitude;
//     //write data to database
//     firebase.auth().onAuthStateChanged(function(user){
//       db.collection("users/").doc(user.uid).update({
//           lat: latData,
//           lng: lonData
//       })
//     })
  
//     // test: prints out location tracking
//     x.innerHTML = "Latitude: " + latData + 
//     "<br>Longitude: " + lonData;
  
//   }
  
//   // error messages from geolocation
//   function showError(error) {
//     switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessages = "User denied the request for Geolocation."
//             alert(errorMessages);
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable."
//             alert(errorMessage);
//             break;
//           case error.TIMEOUT:
//             errorMessage = "The request to get user location timed out."
//             alert(errorMessage);
//             break;
//           case error.UNKNOWN_ERROR:
//             errorMessage = "An unknown error occurred."
//             alert(errorMessage);
//             break;
//         }
//   }
  
