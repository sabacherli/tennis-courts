import firebase from 'firebase/app'
import 'firebase/firestore'

// configuation details for firestore
const config = {
  apiKey: 'AIzaSyC0vAuSNH_WTR3Z3VYPC83JHuVrB694q2o',
  authDomain: 'tenniscourt-hsg.firebaseapp.com',
  databaseURL: 'https://tenniscourt-hsg.firebaseio.com',
  projectId: 'tenniscourt-hsg',
  storageBucket: 'tenniscourt-hsg.appspot.com',
  messagingSenderId: '31727843948'
}
const firebaseApp = firebase.initializeApp(config)

// required so timestamps are read properly
const settings = {
  timestampsInSnapshots: true
}
firebase.firestore().settings(settings)

export default firebaseApp.firestore()
