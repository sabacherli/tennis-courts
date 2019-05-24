<!-- This component is for the player dashboard -->
<template lang="html">
  <div class="container-component">
    <div class="container-filters">
      <!-- this displays the filter for each object in playerFilters -->
      <template v-for="filter in playerFilters">
        <!-- the key directive is required by vue -->
        <div :key="filter.uid" class="div-filter" @click="selectFilter(filter)">
          <!-- this span displays the text -->
          <span>{{ filter.text }}</span>
          <!-- this div is for the underlining of the filter -->
          <div v-if="filter.isActive" class="div-underline"></div>
        </div>
      </template>
    </div>
    <!-- is the popular clubs filter is active, then show the popular clubs -->
    <div v-if="playerFilters[0].isActive" class="container-clubs">
      <!-- this template is displayer for all popular clubs -->
      <template v-for="club in popularClubs">
        <div :key="club.uid" class="div-club">
          <span class="club-name">Unique ID: {{ club.uid }}</span>
          <span class="club-courts">Courts: {{ club.courts }}</span>
          <button type="button" class="check-availability" @click="checkAvailability(club)">Check Availability</button>
        </div>
      </template>
    </div>
    <!-- if the search filter is active, then show the search field -->
    <div v-if="playerFilters[1].isActive">
      <p class="instruction">Enter the ID of a known tennis club:</p>
      <form>
        <!-- the v-model is used to retrieve the input data -->
        <input type="text" placeholder="e.g. wPpDZo3Qrdz3Pkh2G6XW" v-model="uniqueID">
        <label>Unique ID</label>
        <br>
        <button type="button" @click="searchClub()">Search</button>
      </form>
      <div class="container-assets">
        <!-- this template is displayed for all assets in userData.assets -->
        <template v-for="asset in searchResultAssets">
          <!-- the key directive is required by vue -->
          <div :key="asset.uid" class="div-asset">
            <div class="container-slots">
              <!-- this will loop through the slots of the day -->
              <template v-for="slot in 16">
                <!-- the key directive is required by vue -->
                <div :key="slot" class="time-slot">
                  <!-- if the slot is booked, display a red background, else a green background -->
                  <div v-if="asset.day.some(e => e.slot === slot + 5)" class="time-slot-booked"></div>
                  <div v-else class="time-slot-free" @click="bookCourt(asset, slot)"></div>
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
        <button @click="searchYesterday()">Yesterday</button>
        <span @click="searchToday()" class="span-time">{{ time.dayAsString }}, the {{ time.dayAsOrdinal }} of {{ time.monthAsString }}, {{ time.yearAsNumber }}</span>
        <button @click="searchTomorrow()">Tomorrow</button>
      </div>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// moment is a third-party package used to easily handle date and time in javascript
import moment from 'moment'
// required to interact with the database
import db from '@/database.js'
// required to call commit from within firebase callback
import store from '../store.js'
export default {
  name: 'DashboardPlayer',
  // data specific to this component and not stored in the store
  data () {
    return {
      uniqueID: null
    }
  },
  // mutations executed as soon as this component is created
  created () {
    this.$store.commit('getClubs')
  },
  computed: {
    ...mapState([
      'userData',
      'searchResultAssets',
      'searchID',
      'playerFilters',
      'popularClubs',
      'time'
    ])
  },
  // methods are where the functions of a component are listed
  methods: {
    selectFilter (filter) {
      // commits the selectFilter function with the payload of the clicked filter in vuex
      store.commit('selectFilter', filter)
      // required to retrieve today's date
      store.commit('searchToday')
    },
    checkAvailability (club) {
      var id = club.uid
      // get the data for that court
      store.commit('searchClub', id)
      // display it in the search section
      store.commit('setFilter')
    },
    searchClub () {
      // declare the payload variable and commit the mutation
      var id = this.uniqueID
      store.commit('searchClub', id)
    },
    bookCourt (asset, slot) {
      // declare the required variables
      var docID = this.searchID
      var assetID = asset.uid
      var assetName = asset.name
      var dayID = this.time.dayAsDate
      var monthID = this.time.monthAsNumber
      var slotID = slot + 5
      var userID = this.userData.uid
      // change the boolean isBooked to true and add the current user as the player
      db.collection('users').doc(docID).collection('assets').doc(assetID).collection('calendar').doc(dayID + slotID).set({
        isBooked: true,
        player: userID,
        month: monthID,
        day: dayID,
        slot: Number(slotID),
        uid: dayID + slotID,
        asset: assetID
      })
      // add booking to user's bookings collection
      db.collection('users').doc(userID).collection('bookings').doc(dayID + slotID + assetName).set({
        court: assetName,
        date: moment(dayID, 'YYYYMMDD').format('MMMM Do YYYY'),
        time: Number(slotID),
        day: dayID,
        uid: dayID + slotID + assetName,
        doc: docID,
        asset: assetID
      })
    },
    searchTomorrow () {
      // calls the searchTomorrow function in the vuex state management
      this.$store.commit('searchTomorrow')
    },
    searchYesterday () {
      // calls the searchYesterday function in the vuex state management
      this.$store.commit('searchYesterday')
    },
    searchToday () {
      // calls the searchToday function in the vuex state management
      this.$store.commit('searchToday')
    }
  }
}
</script>

<!-- styling scoped to this component -->
<style lang="css" scoped>
@keyframes expand {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
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
  left: -120px;
  text-align: left;
  font-size: 12px;
}
button {
  margin-bottom: 50px;
}
.container-component {
  position: absolute;
  top: 250px;
  width: 100%;
}
.div-filter {
  display: inline-block;
  padding: 10px;
}
.div-underline {
  border-bottom: 1px solid black;
  animation: expand .4s;
  animation-fill-mode: forwards;
}
.instruction {
  margin-bottom: 75px;
  font-size: 1.8em;
  font-weight: 500;
}
.div-filter:hover {
  cursor: pointer;
}
.container-clubs {
  width: 80%;
  margin: 0 10% 0 10%;
}
.div-club {
  margin-top: 60px;
  height: 50px;
  border-bottom: 2px solid black;
}
.club-name {
  float: left;
  margin-left: 40px;
  width: 450px;
  font-size: 1.2em;
  font-weight: 600;
}
.club-courts {
  position: relative;
  right: 100px;
  font-size: 1.2em;
  font-weight: 600;
}
.container-buttons {
  position: relative;
  top: 50px;
  left: 0;
  width: 100%;
}
.check-availability {
  position: absolute;
  right: 200px;
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
.time-slot-free:hover {
  cursor: pointer;
  background: rgba(23, 171, 87, 0.9);
  box-shadow: 2px 2px 2px rgba(0,0,0,0.4);
}
.time-slot-free:active {
  box-shadow: none;
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
