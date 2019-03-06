<template lang="html">
  <div class="">
    <h1>TENNIS COURT</h1>
    <h2>A Booking Engine for your Tennis Courts</h2>
    <div class="container">
      <button class="" @click="goPlayer()">Player</button>
      <button class="" @click="goOwner()">Owner</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    goOwner () {
      this.$router.push('owner')
    },
    goPlayer () {
      this.$router.push('player')
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  position: relative;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 5em;
  color: black;
}
h2 {
  position: relative;
  top: 280px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.9em;
  color: darkgray;
}
.container {
  position: relative;
  top: 400px;
  left: 0;
  width: 100%;
}
</style>
