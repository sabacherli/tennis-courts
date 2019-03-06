<template lang="html">
  <div class="">
    <h1>PLAYER</h1>
    <h2>Create an Account</h2>
    <div class="container">
      <form id="" action="" method="">
        <input type="email" v-model="email" placeholder="Email" autocomplete="email" required>
        <br>
        <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" @keyup.enter="createUser()" required>
        <br>
        <button style="margin-top: 40px" type="button" @click="createPlayer()">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    createPlayer () {
      
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  position: fixed;
  top: 20%;
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
