<template lang="html">
  <div>
    <h1>DASHBOARD</h1>
    <div class="container">
      <!-- shows the owner's tennis courts and vacancy of courts if a owner is logged in -->
      <div v-if="userData.role === 'Owner'">
        <h2>Rent out your tennis courts</h2>
        <DashboardOwner></DashboardOwner>
      </div>
      <!-- shows the most popular (tennis courts) and search field (for tennis courts) if a player is logged in -->
      <div v-if="userData.role === 'Player'">
        <h2>Book a tennis court</h2>
        <DashboardPlayer></DashboardPlayer>
      </div>
    </div>
  </div>
</template>

<script>
// required to read the computed values (user data)
import { mapState } from 'vuex'
// required to import the vue components
import DashboardOwner from '../components/DashboardOwner.vue'
import DashboardPlayer from '../components/DashboardPlayer.vue'
export default {
  name: 'Dashboard',
  // required to register the components
  components: {
    DashboardOwner,
    DashboardPlayer
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
