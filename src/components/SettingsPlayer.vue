<!-- This component is for the player bookings -->
<template lang="html">
  <div class="container-component">
    <!-- if the bookingResult is not null, then show the following div -->
    <div v-if="playerSettings" class="container-assets">
      <!-- this template is displayed for all bookings in playerSettings -->
      <template v-for="booking in playerSettings">
        <!-- the key directive is required by vue -->
        <div :key="booking.uid" class="div-asset">
          <!-- information on the date, court name and time slot of each booking -->
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
export default {
  name: 'SettingsPlayer',
  computed: {
    ...mapState([
      'userData'
    ])
  },
  // methods are where the functions of a component are listed
  methods: {
  }
}
</script>

<!-- styling scoped to this component -->
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
  float: left;
  margin-left: 40px;
  font-size: 1.2em;
  font-weight: 600;
}
</style>
