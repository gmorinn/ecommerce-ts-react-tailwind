import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

var firebaseConfig = {
  apiKey: "AIzaSyBbSfDw1SnV4Nd9h5m-jwDMAgDoPPPzB0k",
  authDomain: "starterpack-85abc.firebaseapp.com",
  databaseURL: "https://starterpack-85abc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "starterpack-85abc",
  storageBucket: "starterpack-85abc.appspot.com",
  messagingSenderId: "354625368863",
  appId: "1:354625368863:web:318752b113f868c63e762a"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

  export {
    firebase,
    googleAuthProvider,
  }