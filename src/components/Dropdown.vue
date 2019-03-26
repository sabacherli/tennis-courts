<template lang="html">
  <div id="container" class="dropdown">
    <!-- icon shown in the top left corner -->
    <img id="dropdown-icon" class="dropdown-icon" src="../assets/icons8-menu-50.png" alt="Menu">
    <!-- the container that is shifted off the screen at the beginning, which is then moved to left: 0 once the icon is hovered -->
    <div id="dropdown-nav" class="dropdown-nav">
      <!-- navigate to the personal dashboard if the user is logged in -->
      <span v-if="userData !== null" id="dashboard" class="dropdown-item" @click='goDashboard()'>DASHBOARD</span>
      <!-- be able to navigate to the registration process if the user is not logged in -->
      <span v-if="userData === null" id="register" class="dropdown-item" @click='goRegister()'>REGISTER</span>
      <!-- short line in between the menu options -->
      <div class="dropdown-item-break"></div>
      <span v-if="userData !== null && userData.role === 'Player'" id="bookings" class="dropdown-item" @click='goBookings()'>BOOKINGS</span>
      <span v-if="userData !== null && userData.role === 'Owner'" id="bookings" class="dropdown-item" @click='goBookings()'>COURTS</span>
      <!-- short line in between the menu options -->
      <div v-if="userData !== null" class="dropdown-item-break"></div>
      <!-- show the logout option if the user is logged in -->
      <span v-if="userData !== null" id="logout" class="dropdown-item" @click='logout()'>LOGOUT</span>
      <!-- show the login option if the user is not logged in -->
      <span v-if="userData === null" id="login" class="dropdown-item" @click='goLogin()'>LOGIN</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// required for the firebase authentication method
import firebase from 'firebase/app'
import 'firebase/auth'
// required to push the next page inside the firebase callback
import router from '../router'

export default {
  name: 'Dropdown',
  computed: {
    ...mapState([
      'userData'
    ])
  },
  methods: {
    goDashboard () {
      router.push('dashboard')
    },
    goRegister () {
      router.push('/')
    },
    goBookings () {
      router.push('bookings')
    },
    goLogin () {
      router.push('login')
    },
    logout () {
      firebase.auth().signOut()
        .then(function () {
          // to go login page
          router.push('login')
        })
        .catch(function (error) {
          // alert the user if an error occured during the logout process
          alert(error.message)
          // print the error code in the console for knowledgable users to debug
          console.log(error.code)
        })
    }
  }
}
</script>

<style lang="css" scoped>
.dropdown-item {
  font-size: 1.2em;
  font-weight: 600;
  transition: .4s ease-in-out;
}
.dropdown-item-selected {
  text-decoration: underline;
  transition: .4s ease-in-out;
}
.dropdown-item-break {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 14px;
  margin-bottom: 14px;
  width: 12%;
  border: 0px;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 3px;
}
@media (hover:hover) {
  /* Mouse devices */
  .dropdown-nav {
    position: fixed;
    z-index: 1;
    left: -250px;
    height: 100%;
    width: 250px;
    background: white;
    text-align: center;
    opacity: 1;
    padding-top: 160px;
    transition: .8s ease-in-out;
  }
  .dropdown-icon {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    margin-top: 60px;
    margin-left: 60px;
    height: 1.875em;
    width: 1.875em;
    transition: .8s ease-in-out;
  }
  .dropdown:hover .dropdown-nav {
    left: 0;
  }
  .dropdown:hover .dropdown-icon {
    transform: rotate(360deg);
  }
  .dropdown-item:hover {
    cursor: pointer;
    text-decoration: underline;
    transition: .4s ease-in-out;
  }
}
</style>
