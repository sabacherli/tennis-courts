<template lang="html">
  <div>
    <!-- content displayed for non-touch devices -->
    <div class="main-content">
      <h1>OWNER</h1>
      <h2>Create an Account</h2>
      <div class="container">
        <form method="post">
          <input type="email" v-model="email" placeholder="Email" autocomplete="email" required>
          <br>
          <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" @keyup.enter="createOwner()" required>
          <br>
          <button type="button" @click="createOwner()">Register</button>
        </form>
      </div>
    </div>
    <!-- error displayed for touch devices -->
    <div class="error-msg">
      <h2>Error</h2>
      <p>This site is only available on devices without touch capability</p>
    </div>
  </div>
</template>

<script>
// required to create a user
import firebase from 'firebase/app'
import 'firebase/auth'
// required to interact with the database
import db from '@/database.js'
// required to call router within the function
import router from '../router.js'
export default {
  name: 'Owner',
  // data specific to this view and not stored in the store
  data () {
    return {
      email: '',
      password: ''
    }
  },
  // methods are where the functions of a component are listed
  methods: {
    createOwner () {
      // creates a new account with email and password and logs in the user
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(function (user) {
          // then creates a new document in the users collection
          db.collection('users').doc(user.user.uid).set({
            email: user.user.email,
            uid: user.user.uid,
            role: 'Owner',
            courts: 0,
            opensAt: '07 00',
            closesAt: '22 00',
            slotDuration: '45',
            assets: []
          })
          // changes the page to the dashboard page
          router.push('dashboard')
        })
        .catch(function (error) {
          // log errors to the console with code and message
          var errorCode = error.code
          var errorMessage = error.message
          alert(errorCode, ': ', errorMessage)
        })
    }
  }
}
</script>

<!-- styling scoped to this component -->
<style lang="css" scoped>
@media (hover:none) {
  /* Touch devices */
  .error-msg {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
  }
  .main-content {
    display: none;
  }
}
@media (hover:hover) {
  /* Mouse devices */
  .error-msg {
    display: none;
  }
  h1 {
    position: relative;
    top: 160px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 5em;
    color: black;
  }
  h2 {
    position: relative;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.9em;
    color: darkgray;
  }
  button {
    margin-top: 40px;
  }
  input {
    margin: 5px 0 5px 0;
    padding: 2px 2px 2px 20px;
    height: 25px;
    width: 400px;
    font-size: 1em;
    font-weight: 500;
    border: 2px solid black;
    border-radius: 20px 20px;
  }
  input:focus {
    background-color: rgba(181, 181, 181, 0.25);
  }
  .container {
    position: relative;
    top: 170px;
    left: 0;
    width: 100%;
  }
}
</style>
