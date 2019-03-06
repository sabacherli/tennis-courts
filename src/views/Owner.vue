<template lang="html">
  <div class="">
    <h1>OWNER</h1>
    <h2>Create an Account</h2>
    <div class="container">
      <form id="" action="" method="">
        <input type="email" v-model="email" placeholder="Email" autocomplete="email" required>
        <br>
        <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" @keyup.enter="createUser()" required>
        <br>
        <button style="margin-top: 40px" type="button" @click="createOwner()">Register</button>
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
  name: 'Owner',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    createOwner () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(function (user) {
          db.collection('owners').doc(user.user.uid).set({
            uid: user.user.uid,
            role: 'Owner'
          })
          router.push('login')
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
.container {
  position: relative;
  top: 170px;
  left: 0;
  width: 100%;
}
</style>
