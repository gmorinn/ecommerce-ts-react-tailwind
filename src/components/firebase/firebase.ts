import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_API_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_API_DATABASEURL,
  projectId: process.env.REACT_APP_API_PROJECTID,
  storageBucket: process.env.REACT_APP_API_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_API_APPID
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

  export {
    firebase,
    googleAuthProvider,
  }