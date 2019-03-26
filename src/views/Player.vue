<template lang="html">
  <div class="">
    <h1>PLAYER</h1>
    <h2>Create an Account</h2>
    <div class="container">
      <form method="post">
        <input type="email" v-model="email" placeholder="Email" autocomplete="email" required>
        <br>
        <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" @keyup.enter="createUser()" required>
        <br>
        <button type="button" @click="createPlayer()">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/database.js'
import router from '../router.js'
export default {
  name: 'Player',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    this.$store.commit('getClubs')
  },
  methods: {
    createPlayer () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(function (user) {
          db.collection('users').doc(user.user.uid).set({
            email: user.user.email,
            uid: user.user.uid,
            role: 'Player',
            bookings: []
          })
          router.push('dashboard')
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorCode, ': ', errorMessage)
        })
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(function () {
          router.push('dashboard')
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorCode, ': ', errorMessage)
        })
    }
  }
}
</script>

<style lang="css" scoped>
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
  top: 95px;
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
  top: 200px;
  left: 0;
  width: 100%;
}
</style>
