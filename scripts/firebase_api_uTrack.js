// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDKgzVykfhhOfveIBruhWJhGQzO_cbuSdI",
  authDomain: "team22-project2.firebaseapp.com",
  databaseURL: "https://team22-project2.firebaseio.com",
  projectId: "team22-project2",
  storageBucket: "team22-project2.appspot.com",
  messagingSenderId: "593450780921",
  appId: "1:593450780921:web:ea74b2e2ba0beacc257a28"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
var storageRef = storage.ref();