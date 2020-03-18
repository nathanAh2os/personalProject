//Firebase Initialization

/* The core Firebase JS SDK is always required and must be listed first
    <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js"></script>

    TODO: Add SDKs for Firebase products that you want to use
https://firebase.google.com/docs/web/setup#available-libraries 
<script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-analytics.js"></script> */

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCuF3qoomKTc4dq9X3jLhfA5UedrNFR-Jg",
    authDomain: "tft-tracker.firebaseapp.com",
    databaseURL: "https://tft-tracker.firebaseio.com",
    projectId: "tft-tracker",
    storageBucket: "tft-tracker.appspot.com",
    messagingSenderId: "647192344964",
    appId: "1:647192344964:web:c5f09dbbc6be8622ee45d1",
    measurementId: "G-W7SP45H3YX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var fb = firebase.firestore();

export default fb;
