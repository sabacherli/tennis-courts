<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
button {
  position: relative;
  display: inline-block;
  margin: 0 20px 0 20px;
  font-size: 1em;
  font-weight: 600;
  border: 2px solid black;
  border-radius: 20px 20px;
  padding: 3px 10px 3px 10px;
  background: white;
}
button:hover {
  cursor: pointer;
  box-shadow: 1.5px 1.5px 1px rgba(0,0,0,0.4);
  transition: .2s;
}
button:active {
  cursor: pointer;
  box-shadow: 0px 0px 1px rgba(0,0,0,0.4);
}
input {
  height: 25px;
  width: 400px;
  margin: 5px 0 5px 0;
  padding: 2px 2px 2px 20px;
  font-size: 1em;
  font-weight: 500;
  border: 2px solid black;
  border-radius: 20px 20px;
}
input:focus {

}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
