let displayLevel = document.getElementById("lv");
let displayPoint = document.getElementById("userBar");

// Display greeting if signed in.
firebase.auth().onAuthStateChanged(function (user) {

    const userRef = db.collection("/users/").doc(user.uid);
    // const increment = firebase.firestore.FieldValue.increment(1);

    if (user) {
        userRef.onSnapshot(function (snap) {

            displayLevel.innerHTML = "<b>Level</b> : " + snap.data().level;
            displayPoint.innerHTML = snap.data().points + "%";

        })
    } else {

    }

})


  const incrementEXP = firebase.firestore.FieldValue.increment(10);
 
  function move() {
     
      var user = firebase.auth().currentUser;
      let doc = db.collection('/users/').doc(user.uid);
     
      doc.update({ points: incrementEXP}); // increments points
      updateExp();
       
      console.log("pressed");
    }
    
    function updateExp() {
      let elem = document.getElementById("userBar");
      var user = firebase.auth().currentUser;
      
  
      let doc = db.collection('/users/').doc(user.uid).onSnapshot(function (snap) {
        let exp = snap.data().points;
  
        elem.style.width = exp + "%";
        elem.innerHTML = exp + "%";
  
        if (exp > 100){
          let level = snap.data().level;

          db.collection('/users/').doc(user.uid).update({ points: 0});
          db.collection('/users/').doc(user.uid).update({ level: level + 1});  // increments level
           $("#lv").html("Level: "+ level);
        }
  
      });
    }
  
    // function updateLevel() {
    //   var user = firebase.auth().currentUser;
    //   let doc = db.collection('/users/').doc(user.uid).onSnapshot(function (snap) {
    //     let level = snap.data().level;
    //     $("#lv").html("Level: "+ level);
    //   });
    // }


// // script for progressbar
// let curexp = 0; 
// let curlev = 1;

// function move() {
//     let level = document.getElementById("lv")
//     let elem = document.getElementById("userBar");
//     progress();

//     function progress() {
//         if (curexp < 100) {

//             curexp += 10;
//             elem.style.width = curexp + "%";
//             elem.innerHTML = curexp + "%";
//             // level.innerHTML = "Level " + curlev;
//         } else {
//             curlev++;
//             curexp = 0;
//             elem.style.width = 2 + "%";
            
//             elem.innerHTML = curexp + "%";
//         }
//     }
// }

// function reload() {
//     var i = 0;
//     if (i == 0) {
//         i = 1;
//         var elem = document.getElementById("myBar");
//         var width = 0;
//         var id = setInterval(frame, 10);

//         function frame() {
//             if (width >= 100) {
//                 clearInterval(id);
//                 i = 0;
//             } else {
//                 width++;
//                 elem.style.width = width + "%";
//                 elem.innerHTML = width + "%";
//             }
//         }
//     }
// }