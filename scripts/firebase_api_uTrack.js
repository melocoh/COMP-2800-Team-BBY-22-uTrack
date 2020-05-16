// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCimHCZmK6rC6_LbZ-wyi0taBEvLCW80O4",
  authDomain: "team22-project2-v2.firebaseapp.com",
  databaseURL: "https://team22-project2-v2.firebaseio.com",
  projectId: "team22-project2-v2",
  storageBucket: "team22-project2-v2.appspot.com",
  messagingSenderId: "446883698615",
  appId: "1:446883698615:web:080a9fa5d5f433352a3a32"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
var storageRef = storage.ref();