<template>
  <div id="app">
    <router-view :key="rerender" name="dropdown"></router-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
// moment is a third-party package used to easily handle date and time in javascript
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/database.js'
import store from './store'
export default {
  created () {
    // define the variables
    var unsubscribe
    var unsubscribeAssets
    var unsubscribeBookings
    // if the variable has already been assigned a callback to unsubscribe, then unsubscribe from the listener
    if (unsubscribe) {
      unsubscribe()
      unsubscribeAssets()
      unsubscribeBookings()
    }
    // set the time of today in different formats
    store.commit('setTime')
    // check if the user authentication state has changed
    firebase.auth().onAuthStateChanged(function (user) {
      // check if the user is now logged in or not
      if (user) {
        var userID = user.uid
        // keep a reference to the snapshot so we can call the callback to stop listenting once the user is logged out
        unsubscribe =
        db.collection('users').doc(userID)
          .onSnapshot(function (doc) {
            let userData = doc.data()
            store.commit('setUserData', userData)
            // keep this reference as well
            unsubscribeAssets =
            db.collection('users').doc(userID).collection('assets').orderBy('name')
              .onSnapshot(function (querySnapshot) {
                // empty the array of assets before repopulating it
                store.commit('emptyUserDataAssets')
                // define an empty array that we can fill
                let userDataAssetsArray = []
                // get all the documents with a forEach loop
                querySnapshot.forEach(function (doc) {
                  let data = doc.data()
                  userDataAssetsArray.push(data)
                })
                // push all assets into vuex state management
                store.commit('setUserDataAssets', userDataAssetsArray)
              })
            // keep this reference as well
            unsubscribeBookings =
            db.collection('users').doc(userID).collection('bookings').where('uid', '>=', moment().format('YYYYMMDD')).orderBy('uid')
              .onSnapshot(function (querySnapshot) {
                // empty the array of assets before repopulating it
                store.commit('emptyUserDataBookings')
                // define an empty array that we can fill
                let userDataBookingsArray = []
                // get all the documents with a forEach loop
                querySnapshot.forEach(function (doc) {
                  let data = doc.data()
                  userDataBookingsArray.push(data)
                })
                // push all assets into vuex state management
                store.commit('setUserDataBookings', userDataBookingsArray)
              })
          })
      } else {
        // unsubscribe from all the listeners to save bandwidth
        // onSnapshot returns a function to unsubscribe from the listener, but will not be assign a function on load, hence the if condition checks if there is a function attached
        if (unsubscribe) {
          unsubscribe()
          unsubscribeAssets()
          unsubscribeBookings()
        }
        // remove the userData
        store.commit('emptyUserData')
      }
    })
  },
  computed: {
    ...mapState([
      'rerender'
    ])
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  color: black;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 500;
}
body {
}
button {
  position: relative;
  display: inline-block;
  margin: 0 20px 0 20px;
  font-size: 1em;
  font-weight: 600;
  border: 2px solid black;
  border-radius: 20px 20px;
  padding: 3px 10px 3px 10px;
  background: white;
}
button:hover {
  cursor: pointer;
  box-shadow: 1.5px 1.5px 1px rgba(0,0,0,0.4);
  transition: .2s;
}
button:active {
  cursor: pointer;
  box-shadow: 0px 0px 1px rgba(0,0,0,0.4);
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
