<template lang="html">
  <div>
    <!-- content displayed for non-touch devices -->
    <div class="main-content">
      <h1>SETTINGS</h1>
      <div class="container">
        <!-- shows the user's tennis courts if the owner is logged in -->
        <div v-if="userData.role === 'Owner'">
          <h2>Manage your preferences and account</h2>
          <SettingsOwner></SettingsOwner>
        </div>
        <!-- shows the booked tennis courts if a player is logged in -->
        <div v-if="userData.role === 'Player'">
          <h2>Manage your preferences and account</h2>
          <SettingsPlayer></SettingsPlayer>
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
import SettingsOwner from '../components/SettingsOwner.vue'
import SettingsPlayer from '../components/SettingsPlayer.vue'
export default {
  name: 'Settings',
  // required to register the components
  components: {
    SettingsOwner,
    SettingsPlayer
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
