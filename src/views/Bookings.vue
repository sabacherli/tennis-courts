<template lang="html">
  <div>
    <!-- content displayed for non-touch devices -->
    <div class="main-content">
      <h1 v-if="userData.role === 'Owner'">COURTS</h1>
      <h1 v-if="userData.role === 'Player'">BOOKINGS</h1>
      <div class="container">
        <!-- shows the user's tennis courts if the owner is logged in -->
        <div v-if="userData.role === 'Owner'">
          <h2>Remove courts from being bookable</h2>
          <BookingsOwner></BookingsOwner>
        </div>
        <!-- shows the booked tennis courts if a player is logged in -->
        <div v-if="userData.role === 'Player'">
          <h2>See your booked courts</h2>
          <BookingsPlayer></BookingsPlayer>
        </div>
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
// required to read the computed values
import { mapState } from 'vuex'
// required to import the vue components
import BookingsOwner from '../components/BookingsOwner.vue'
import BookingsPlayer from '../components/BookingsPlayer.vue'
export default {
  name: 'Bookings',
  // required to register the components
  components: {
    BookingsOwner,
    BookingsPlayer
  },
  computed: {
    ...mapState([
      'userData'
    ])
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
}
</style>
