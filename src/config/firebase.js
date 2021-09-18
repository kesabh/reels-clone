import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBet_uCT4hIlTdgjktL2O-QcBYxnSS_oF0",
  authDomain: "react-login-f0733.firebaseapp.com",
  projectId: "react-login-f0733",
  storageBucket: "react-login-f0733.appspot.com",
  messagingSenderId: "261114723968",
  appId: "1:261114723968:web:dfbb28b7f2127da7383065",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

export let firebaseStorage = firebaseApp.storage() ; 
export let firebaseDB = firebaseApp.firestore() ; 
export default firebaseAuth;
