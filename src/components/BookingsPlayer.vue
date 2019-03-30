<!-- This component is for the player bookings -->

<template lang="html">
  <div class="container-component">
    <!-- if the bookingResult is not null, then show the following div -->
    <div v-if="userData.bookings" class="container-assets">
      <!-- this template is displayed for all bookings in userData.bookings -->
      <template v-for="booking in userData.bookings">
        <!-- the key directive is required by vue -->
        <div :key="booking.uid" class="div-asset">
          <!-- the name of the court and time of the booking -->
          <p class="asset-name">{{ booking.date }}</p>
          <p class="asset-name">{{ booking.court }}</p>
          <p class="asset-name">{{ booking.time }} - {{ booking.time + 1 }} o'clock</p>
          <button type="button" @click="cancelBooking(booking)">Cancel</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// required to interact with the database
import db from '@/database.js'
export default {
  name: 'BookingsPlayer',
  data () {
    return {
      uniqueID: null
    }
  },
  created () {
    this.$store.commit('setTime')
  },
  computed: {
    ...mapState([
      'userData'
    ])
  },
  // methods are where the functions of a component are listed
  methods: {
    cancelBooking (booking) {
      // declare the required variables
      var docID = booking.doc
      var assetID = booking.asset
      var userID = this.userData.uid
      var bookingID = booking.uid
      var eventID = booking.day + booking.time
      // remove booking to owners's calendar collection
      db.collection('users').doc(docID).collection('assets').doc(assetID).collection('calendar').doc(eventID).delete()
      // remove booking to user's bookings collection
      db.collection('users').doc(userID).collection('bookings').doc(bookingID).delete()
    }
  }
}
</script>

<style lang="css" scoped>
label {
  position: relative;
  display: inline;
  left: -120px;
  text-align: left;
  font-size: 12px;
}
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
.asset-name {
  display: inline-block;
  float: left;
  margin-left: 40px;
  font-size: 1.2em;
  font-weight: 600;
}
</style>
