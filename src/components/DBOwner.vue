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
      <!-- or when pressing the button -->
      <button type="button" @click="addCourt()">Add Court</button>
    </form>
    <div class="container-assets">
      <!-- this template is displayed for all assets in userData.assets -->
      <template v-for="asset in userData.assets">
        <!-- the key directive is required by vue -->
        <div :key="asset.uid" class="div-asset">
          <div class="container-slots">
            <!-- this will loop through the slots of the day -->
            <template v-for="slot in asset.day.slots">
              <!-- the key directive is required by vue -->
              <div :key="slot.uid" class="time-slot">
                <!-- if the slot is booked, display a red background, else a green background -->
                <div v-if="slot.isBooked" class="time-slot time-slot-booked"></div>
                <div v-else class="time-slot-free"></div>
              </div>
            </template>
            <!-- used to indicate the time of day -->
            <div class="container-time">
              <div class="time-delimiter">8</div>
              <div class="time-delimiter">12</div>
              <div class="time-delimiter">16</div>
              <div class="time-delimiter">20</div>
            </div>
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
// moment is a third-party package used to easily handle date and time in javascript
import moment from 'moment'
export default {
  name: 'DBOwner',
  data () {
    return {
      courtName: null
    }
  },
  created () {
    this.$store.commit('setToday')
  },
  computed: {
    ...mapState([
      'userData',
      'time'
    ])
  },
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
        day: null,
        uid: null
      })
        // updates the unique ID with the id of the document firebase created
        .then(function (doc) {
          db.collection('users').doc(userData.uid).collection('assets').doc(doc.id).update({
            uid: doc.id
          })
          // adds the days of the month to the calendar in the database
          const year = moment().format('YYYY')
          const month = moment().format('MM')
          const days = moment().daysInMonth()
          for (let d = 0; d < days; d++) {
            const day = moment().year(year).month(month).subtract(1, 'M').startOf('month').add(d, 'day').format('YYYYMMDD')
            db.collection('users').doc(userData.uid).collection('assets').doc(doc.id).collection('calendar').doc(day).set({
              uid: day,
              slots: []
            })
              .then(function () {
                // for each day it adds the different time slots to the day
                for (let h = 6; h < 22; h++) {
                  const hour = JSON.stringify(h)
                  db.collection('users').doc(userData.uid).collection('assets').doc(doc.id).collection('calendar').doc(day).collection('slots').doc(hour).set({
                    uid: hour,
                    isBooked: false,
                    player: null
                  })
                }
              })
          }
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
      this.$store.commit('setTomorrow')
    },
    setYesterday () {
      // calls the setYesterday function in the vuex state management
      this.$store.commit('setYesterday')
    },
    setToday () {
      // calls the setToday function in the vuex state management
      this.$store.commit('setToday')
    }
  }
}
</script>

<style lang="css" scoped>
input {
  position: relative;
  display: block;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  font-size: 16px;
  font-family: Montserrat;
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
  display: inline-block;
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
  width: calc(100%/4);
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
  width: calc(92.3%/16);
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
  background: rgba(221, 118, 43, 0.78);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
