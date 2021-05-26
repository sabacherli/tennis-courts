<template lang="html">
  <div>
    <!-- content displayed for non-touch devices -->
    <div class="main-content">
      <h1>LOGIN</h1>
      <h2>Log in to your account</h2>
      <div class="container">
        <form method="post">
          <input type="email" v-model="email" placeholder="Email" autocomplete="email" required>
          <br>
          <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" @keyup.enter="login()" required>
          <br>
          <button style="margin-top: 40px" type="button" @click="login()">Login</button>
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
// required to login a user
import firebase from 'firebase/app'
import 'firebase/auth'
// required to call router within the function
import router from '../router.js'
export default {
  name: 'Login',
  // data specific to this view and not stored in the store
  data () {
    return {
      email: '',
      password: ''
    }
  },
  // methods are where the functions of a component are listed
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(function (user) {
          // go to the dashboard page
          router.push('dashboard')
        })
        .catch(function (error) {
          // log the error to the console if there is one
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
