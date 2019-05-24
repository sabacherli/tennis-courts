<template lang="html">
  <div>
    <!-- content displayed for non-touch devices -->
    <div class="main-content">
      <h1>TENNIS COURT</h1>
      <h2>A Booking Engine for your Tennis Courts</h2>
      <div class="container">
        <button @click="goPlayer()">Player</button>
        <button @click="goOwner()">Owner</button>
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
export default {
  name: 'Register',
  // methods are where the functions of a component are listed
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
    position: relative;
    top: 160px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 5em;
    color: black;
  }
  h2 {
    position: relative;
    top: 95px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.9em;
    color: darkgray;
  }
  .container {
    position: relative;
    top: 170px;
    left: 0;
    width: 100%;
  }
}
</style>
