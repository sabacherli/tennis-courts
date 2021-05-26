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
    var unsubscribeUserData
    var unsubscribeUserDataAssets
    var unsubscribeUserDataBookings
    // set the time of today in different formats
    store.commit('setTime')
    // check if the user authentication state has changed
    firebase.auth().onAuthStateChanged(function (user) {
      // check if the user is now logged in or not
      if (user) {
        var userID = user.uid
        // keep a reference to the snapshot so we can call the callback to stop listenting once the user is logged out
        unsubscribeUserData =
          db.collection('users').doc(userID)
            .onSnapshot(function (doc) {
              store.commit('setUserData', doc.data())
            })
        // keep a reference to the snapshot so we can call the callback to stop listenting once the user is logged out
        unsubscribeUserDataAssets =
          db.collection('users').doc(userID).collection('assets').orderBy('name')
            .onSnapshot(function (querySnapshot) {
              let userDataAssets = []
              querySnapshot.forEach(function (doc) {
                userDataAssets.push(doc.data())
              })
              // push all assets into vuex state management
              store.commit('setUserDataAssets', userDataAssets)
            })
        // keep a reference to the snapshot so we can call the callback to stop listenting once the user is logged out
        unsubscribeUserDataBookings =
          db.collection('users').doc(userID).collection('bookings').where('uid', '>=', moment().format('YYYYMMDD')).orderBy('uid')
            .onSnapshot(function (querySnapshot) {
              let playerBookings = []
              querySnapshot.forEach(function (doc) {
                playerBookings.push(doc.data())
              })
              // push all assets into vuex state management
              store.commit('setPlayerBookings', playerBookings)
            })
      } else {
        // unsubscribe from all the listeners to save bandwidth
        // onSnapshot returns a function to unsubscribe from the listener, but will not be assigned a function on load, hence the if condition checks if there is a function attached
        if (unsubscribeUserData) {
          unsubscribeUserData()
          unsubscribeUserDataAssets()
          unsubscribeUserDataBookings()
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

<!-- this styling is applied throughout all components and views -->
<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  color: black;
  font-family: 'Avenir', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 500;
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
  box-shadow: 0 0 0 30px white inset !important;
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  outline: none;
}
</style>
