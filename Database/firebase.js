import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDtJzCqMwyFRqsVzNQHVRia5UH7tNtc_Kw",
  authDomain: "thrifty-2dafe.firebaseapp.com",
  databaseURL: "https://thrifty-2dafe.firebaseio.com",
  projectId: "thrifty-2dafe",
  storageBucket: "thrifty-2dafe.appspot.com",
  messagingSenderId: "971399559170",
  appId: "1:971399559170:web:dc4e99f5cde3f0b9a2cf1b",
  measurementId: "G-M1VGXSPCCG"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
