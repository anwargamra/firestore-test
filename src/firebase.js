import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";


let config = {
  apiKey: "AIzaSyAtxm_L3bzGCvqdkzyXb49JnEnZ5MJt2p4",
  authDomain: "news-firebase-4f8ca.firebaseapp.com",
  projectId: "news-firebase-4f8ca",
  storageBucket: "news-firebase-4f8ca.appspot.com",
  messagingSenderId: "117223165189",
  appId: "1:117223165189:web:9475a63d2fa32a42a57b6c"
};

firebase.initializeApp(config);
export const storage = firebase.storage();
export default firebase.firestore();

