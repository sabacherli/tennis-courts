<!-- This component is for the owner bookings -->
<template lang="html">
  <div class="container-component">
    <!-- if the bookingResult is not null, then show the following div -->
    <div class="container-assets">
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Change Email</p>
        <!-- button to delete the court -->
        <button v-if="!editingEmail" type="button" @click="editingEmail = !editingEmail">Edit</button>
        <button v-if="editingEmail" type="button" @click="saveEmail()">Save</button>
        <button v-if="editingEmail" type="button" @click="editingEmail = !editingEmail">Cancel</button>
      </div>
      <form v-if="editingEmail" class="div-edit">
        <div class="edit-item">
          <label>New Email</label>
          <input type="text" v-model="userData.email">
        </div>
        <div class="edit-item">
          <label>Enter Password</label>
          <input type="password" v-model="emailPassword" autocomplete="off" @keyup.enter="saveEmail()" required>
        </div>
      </form>
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Change Password</p>
        <!-- button to delete the court -->
        <button v-if="!editingPassword" type="button" @click="editingPassword = !editingPassword">Edit</button>
        <button v-if="editingPassword" type="button" @click="savePassword()">Save</button>
        <button v-if="editingPassword" type="button" @click="editingPassword = !editingPassword">Cancel</button>
      </div>
      <form v-if="editingPassword" class="div-edit">
        <div class="edit-item">
          <label>Current Password</label>
          <input type="password" v-model="oldPassword" autocomplete="off" required>
        </div>
        <div class="edit-item">
          <label>New Password</label>
          <input type="password" v-model="newPassword" autocomplete="new-password" required>
        </div>
        <div class="edit-item">
          <label>Confirm New Password</label>
          <input type="password" v-model="checkPassword" autocomplete="new-password" @keyup.enter="savePassword()" required>
        </div>
      </form>
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Delete Account</p>
        <!-- button to delete the court -->
        <button v-if="!deletingAccount" type="button" @click="deletingAccount = !deletingAccount">Edit</button>
        <button v-if="deletingAccount" type="button" @click="deleteAccount()">Confirm</button>
        <button v-if="deletingAccount" type="button" @click="deletingAccount = !deletingAccount">Cancel</button>
      </div>
      <form v-if="deletingAccount" class="div-edit">
        <div class="edit-item">
          <label>Enter Password</label>
          <input type="password" v-model="deleteConfirmation" autocomplete="off" required>
        </div>
      </form>
      <div class="div-spacer">
      </div>
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Open on</p>
        <!-- button to delete the court -->
        <!-- button to delete the court -->
        <button type="button" @click="editInformation('opensAt')">Import</button>
        <button type="button" @click="editInformation('opensAt')">Subscribe</button>
      </div>
      <div class="div-calendars">
        <p class="asset-name">Default Calendar</p>
        <ToggleSwitch class="toggle-switch" :defaultState="true"></ToggleSwitch>
      </div>
      <div class="div-spacer">
      </div>
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Closed on</p>
        <!-- button to delete the court -->
        <button type="button" @click="editInformation('opensAt')">Import</button>
        <button type="button" @click="editInformation('opensAt')">Subscribe</button>
      </div>
      <div class="div-calendars">
        <p class="asset-name">Zurich Public Holiday</p>
        <ToggleSwitch class="toggle-switch" :defaultState="true"></ToggleSwitch>
      </div>
      <div class="div-spacer">
      </div>
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Advanced bookings</p>
        <!-- button to delete the court -->
        <button type="button" @click="editInformation('opensAt')">Edit</button>
      </div>
      <div class="div-spacer">
      </div>
      <div class="div-asset">
        <!-- the name of the court and time of the booking -->
        <p class="asset-name">Calendar</p>
      </div>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// required to interact with firebase
import firebase from 'firebase/app'
import db from '@/database.js'
// required to call commit inside another function
// import axios from 'axios'
import ToggleSwitch from './ToggleSwitch.vue'
export default {
  name: 'SettingsOwner',
  // required to register the components
  components: {
    ToggleSwitch
  },
  // data specific to this component and not stored in the store
  data () {
    return {
      emailPassword: '',
      oldPassword: '',
      newPassword: '',
      checkPassword: '',
      deleteConfirmation: '',
      editingEmail: false,
      editingPassword: false,
      deletingAccount: false,
      CLIENT_ID: '31727843948-7vdt89ldnj3lv88v4unhbuh5g0hu5rr7.apps.googleusercontent.com',
      API_KEY: 'AIzaSyC0vAuSNH_WTR3Z3VYPC83JHuVrB694q2o',
      DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      SCOPES: 'https://www.googleapis.com/auth/calendar.readonly'
    }
  },
  // mutations executed as soon as this component is created
  created () {
    this.getCalendar()
  },
  computed: {
    // data that is made available from the store as soon as the component is computed
    ...mapState([
      'userData',
      'ownerAssets'
    ])
  },
  // methods are where the functions of a component are listed
  methods: {
    editInformation (item) {
    },
    saveEmail () {
      this.editingEmail = !this.editingEmail
      const user = firebase.auth().currentUser
      db.collection('users').doc(this.userData.uid).update({
        'email': this.userData.email
      })
      var newEmail = this.userData.email
      var emailPassword = this.emailPassword
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        emailPassword
      )
      user.reauthenticateWithCredential(credential)
        .then(function () {
          // User re-authenticated.
          user.updateEmail(newEmail)
            .then(function () {
              // Update successful.
              console.log('Email successfully updated!')
            })
            .catch(function (error) {
              console.log('There is still an error occuring.', error)
            })
        })
        .catch(function (error) {
          // An error happened.
          console.log('Error: ', error)
        })
    },
    savePassword () {
      const user = firebase.auth().currentUser
      const newPassword = this.newPassword
      const checkPassword = this.checkPassword
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.oldPassword
      )
      user.reauthenticateWithCredential(credential)
        .then(function () {
          if (checkPassword === newPassword) {
            const confirmedPassword = newPassword
            user.updatePassword(confirmedPassword)
              .then(function () {
                // Update successful.
                console.log('A new password is set.')
              })
              .catch(function (error) {
                // An error happened.
                console.log(error.message)
              })
          } else {
            alert('The passwords do not match.')
          }
        })
        .catch(function (error) {
          alert(error)
          console.log('Error: ', error)
        })
      this.oldPassword = ''
      this.newPassword = ''
      this.checkPassword = ''
      this.editingPassword = !this.editingPassword
    },
    deleteAccount () {
    },
    async getCalendar () {
      const response = await fetch('https://calendar.google.com/calendar/ical/l018nqs6npgb7v0m50ildll9sc%40group.calendar.google.com/private-ffe4218a1ac3ef7de457fa5d14e7dc67/basic.ics', { headers: {
        'Access-Control-Allow-Origin': '*',
        'mode': 'cors',
        'method': 'GET'
      } }
      )
      console.log(response)
    }
  }
}
</script>

<!-- styling scoped to this component -->
<style lang="css" scoped>
button {
  float: right;
  margin-top: 20px;
}
.container-component {
  position: absolute;
  top: 250px;
  width: 100%;
}
.container-assets {
  width: 80%;
  margin: 0 10% 0 10%;
}
.div-asset {
  margin: 20px;
  height: 60px;
  border-bottom: 2px solid black;
}
.div-calendars {
  margin: 20px;
  height: 60px;
}
.div-edit {
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border-bottom: 2px solid black;
}
.div-spacer {
  margin: 20px;
  height: 60px;
}
.asset-name {
  display: inline-block;
  float: left;
  margin-left: 40px;
  font-size: 1.2em;
  font-weight: 600;
}
.edit-item {
  display: block;
  float: left;
  margin: 20px 20px 20px 40px;
  font-size: 1.2em;
  font-weight: 600;
}
input {
  width: 300px;
  font-size: 1.2em;
  background: transparent;
  border: 0px;
  border-bottom: 2px solid black;
}
input:focus {
  outline: none;
}
::placeholder {
  padding-left: 3px;
}
label {
  margin-right: 20px;
}
.toggle-switch {
  display: inline-block;
  float: right;
  margin: 20px 30px 20px 20px;
}
</style>
