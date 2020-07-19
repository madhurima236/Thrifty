import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyASNJYonskOYrrebkFePYlGR66aA2HxUsY",
  authDomain: "thrifty-c8d4b.firebaseapp.com",
  databaseURL: "https://thrifty-c8d4b.firebaseio.com",
  projectId: "thrifty-c8d4b",
  storageBucket: "thrifty-c8d4b.appspot.com",
  messagingSenderId: "799245680117",
  appId: "1:799245680117:web:afd49522f49519e6fbb4bc",
  measurementId: "G-40DH0JS1QR",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
