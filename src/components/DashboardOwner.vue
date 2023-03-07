<!-- This component is for the player owner -->
<template lang="html">
  <div>
    <!-- this unique ID can be used in the search field to directly find this club -->
    <p class="uniqueID">Your club's unique ID is <u>{{ userData.uid }}</u>.</p>
    <p class="instruction">You currently have {{ userData.courts }} courts that can be booked.</p>
    <form>
      <!-- v-model is used to clone the value of the input string -->
      <input type="text" placeholder="e.g. Court 1" v-model="courtName">
      <label>Name</label>
      <br>
      <!-- button to add a new court -->
      <button type="button" @click="addCourt()">Add Court</button>
    </form>
    <p class="instruction" style="margin-top: 160px; margin-bottom: -60px">An overview of the vacancy of your courts.</p>
    <div v-if="userData.courts === 0" style="margin-bottom: 60px"></div>
    <div class="container-assets">
      <!-- this template is displayed for all assets in ownerAssets -->
      <template v-for="asset in ownerAssets">
        <!-- the key directive is required by vue -->
        <div :key="asset.uid" class="div-asset">
          <div class="container-slots">
            <!-- this will loop through the slots of the day -->
            <template v-for="slot in 16">
              <!-- the key directive is required by vue -->
              <div :key="slot" class="time-slot">
                <!-- if the slot is booked, display a red background, else a green background -->
                <div v-if="asset.day.some(e => e.slot === slot + 5)" class="time-slot-booked"></div>
                <div v-else class="time-slot-free"></div>
                <div class="time-delimiter">{{ slot + 5 }}h</div>
              </div>
            </template>
          </div>
          <!-- the name of the court -->
          <p class="asset-name">{{ asset.name }}</p>
        </div>
      </template>
    </div>
    <div class="container-buttons">
      <!-- the buttons allow to change the day that is displayed, while the span shows the current date that is shown -->
      <button @click="setYesterday()">Yesterday</button>
      <span @click="setToday()" class="span-time">{{ time.dayAsString }}, the {{ time.dayAsOrdinal }} of {{ time.monthAsString }}, {{ time.yearAsNumber }}</span>
      <button @click="setTomorrow()">Tomorrow</button>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// required to interact with the database
import db from '@/database.js'
// required to call commit inside another function
import store from '../store.js'
export default {
  name: 'DashboardOwner',
  // data specific to this component and not stored in the store
  data () {
    return {
      courtName: null
    }
  },
  // mutations executed as soon as this component is created
  created () {
    setTimeout(function () {
      store.commit('setToday')
    }, 500)
  },
  computed: {
    ...mapState([
      'userData',
      'ownerAssets',
      'time'
    ])
  },
  // methods are where the functions of a component are listed
  methods: {
    addCourt () {
      var userData = this.userData
      var courtName = this.courtName
      // increases the court count by 1
      db.collection('users').doc(userData.uid).update({
        courts: Number(userData.courts) + 1
      })
      // creates a new document in the assets collection with the name and an empty unique ID of the court
      db.collection('users').doc(userData.uid).collection('assets').add({
        name: courtName,
        day: [],
        uid: null
      })
        // updates the unique ID with the id of the document firebase created
        .then(function (doc) {
          db.collection('users').doc(userData.uid).collection('assets').doc(doc.id).update({
            uid: doc.id
          })
        })
      // resets the court name
      this.courtName = null
    },
    deleteCourt (court) {
      var userData = this.userData
      // removes the court document from the owners database
      db.collection('users').doc(userData.uid).collection('assets').doc(court.uid).delete()
    },
    setTomorrow () {
      // calls the setTomorrow function in the vuex state management
      store.commit('setTomorrow')
    },
    setYesterday () {
      // calls the setYesterday function in the vuex state management
      store.commit('setYesterday')
    },
    setToday () {
      // calls the setToday function in the vuex state management
      store.commit('setToday')
    }
  }
}
</script>

<!-- styling scoped to this component -->
<style lang="css" scoped>
input {
  position: relative;
  display: block;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  font-size: 1.2em;
  background: transparent;
  border: 0px;
  border-bottom: 2px solid black;
}
input:focus {
  border-bottom: 3px solid black;
  outline: none;
}
::placeholder {
  padding-left: 3px;
}
label {
  position: relative;
  display: inline;
  left: -130px;
  text-align: left;
  font-size: .8em;
}
button {
  margin-bottom: 50px;
}
.uniqueID {
  margin-bottom: 160px;
  color: darkgray;
  font-size: .8em;
  font-weight: 500;
}
.instruction {
  margin-bottom: 60px;
  font-size: 1.8em;
  font-weight: 500;
}
.container-assets {
  width: 80%;
  margin: 0 10% 0 10%;
}
.div-asset {
  margin: 20px;
  height: 300px;
  border-bottom: 2px solid black;
}
.asset-name {
  float: left;
  margin-left: 40px;
  font-size: 1.2em;
  font-weight: 600;
}
.container-buttons {
  position: relative;
  top: 50px;
  left: 0;
  width: 100%;
}
.span-time {
  margin: 0 20px 0 20px;
  font-size: 1em;
  font-weight: 600;
  border-bottom: 2px solid black;
  padding: 3px 10px 3px 10px;
}
/* signal that the span is clickable by changing the shadow and the cursor */
.span-time:hover {
  cursor: pointer;
  box-shadow: 0 4px 2px -2px rgba(0,0,0,0.4);
  transition: .2s;
}
/* create the illusion of pressing the span */
.span-time:active {
  box-shadow: none;
  transition: .2s;
}
.container-time {
  padding-top: 10px;
}
.time-delimiter {
  position: relative;
  display: inline-block;
  margin-top: 10px;
  font-size: .8em;
  font-weight: 600;
}
.container-slots {
  position: relative;
  top: calc(300px - 50px);
}
.time-slot {
  display: inline-block;
  margin: 3px;
  height: 50px;
  width: calc(90%/16);
}
.time-slot-free {
  position: relative;
  bottom: 3px;
  height: 50px;
  width: 100%;
  background: rgba(23, 171, 87, 0.6);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.time-slot-booked {
  position: relative;
  bottom: 3px;
  height: 50px;
  width: 100%;
  background: rgb(176, 43, 43);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
