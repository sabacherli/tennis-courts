import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0vAuSNH_WTR3Z3VYPC83JHuVrB694q2o",
  authDomain: "tenniscourt-hsg.firebaseapp.com",
  databaseURL: "https://tenniscourt-hsg.firebaseio.com",
  projectId: "tenniscourt-hsg",
  storageBucket: "tenniscourt-hsg.appspot.com",
  messagingSenderId: "31727843948"
}
firebase.initializeApp(config);

const settings = {
  /* your settings... */ timestampsInSnapshots: true
}
firebase.firestore().settings(settings)

// Enables offline data, which is required for PWA's.
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })
// Subsequent queries will use persistence, if it was enabled successfully

export default firebaseApp.firestore()
