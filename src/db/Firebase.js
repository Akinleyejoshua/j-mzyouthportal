import firebase from "firebase/app"
import "firebase/analytics";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCv4qveAg_GwF-ttpi3nc964LwBjgLEc2M",
    authDomain: "mount--zion-youth-portal.firebaseapp.com",
    databaseURL: "https://mount--zion-youth-portal-default-rtdb.firebaseio.com",
    projectId: "mount--zion-youth-portal",
    storageBucket: "mount--zion-youth-portal.appspot.com",
    messagingSenderId: "412664706755",
    appId: "1:412664706755:web:f78107e8d24e6e353cd476",
    measurementId: "G-HRNHWLHHPL"
};

try {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
} catch (error) {
    alert("Connection to the server error");
}

const Firebase = () => {
    let auth = firebase.auth();
    let storage = firebase.storage();
    let db = firebase.database();
    return { auth: auth, storage: storage, db:db }
}

export default Firebase;