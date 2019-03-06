<template lang="html">
  <div class="">
    <h1>LOGIN</h1>
    <h2>Log in to your account</h2>
    <div class="container">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {

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
</style>
