<template lang="html">
  <div>
    <h1>BOOKINGS</h1>
    <div class="container">
      <!-- show the user's tennis courts if the owner is logged in -->
      <div v-if="userData.role === 'Owner'">
        <h2>Monitor the performance of your courts</h2>
        <BOwner></BOwner>
      </div>
      <!-- show the search field if a player is logged in -->
      <div v-if="userData.role === 'Player'">
        <h2>See you booked courts</h2>
        <BPlayer></BPlayer>
      </div>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// required to import the vue components
import BOwner from '../components/BOwner.vue'
import BPlayer from '../components/BPlayer.vue'
export default {
  name: 'Bookings',
  // required to register the components
  components: {
    BOwner,
    BPlayer
  },
  computed: {
    ...mapState([
      'userData'
    ])
  }
}
</script>

<style lang="css" scoped>
h1 {
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 5em;
  color: black;
}
h2 {
  position: relative;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.9em;
  color: darkgray;
}
.container {
  position: absolute;
  top: 260px;
  left: 0;
  width: 100%;
}
</style>
