<template lang="html">
  <div class="container-component">
    <div class="container-filters">
      <!-- this displays the filter for each object in playerFilters -->
      <template v-for="filter in playerFilters">
        <!-- the key directive is required by vue -->
        <div :key="filter.uid" class="div-filter" @click="selectFilter(filter)">
          <!-- this span displays the text -->
          <span>{{ filter.text }}</span>
          <!-- this div is for the underlining of the filter -->
          <div v-if="filter.isActive" class="div-underline"></div>
        </div>
      </template>
    </div>
    <!-- is the popular clubs filter is active, then show the popular clubs -->
    <div v-if="playerFilters[0].isActive" class="container-clubs">
      <!-- this template is displayer for all popular clubs -->
      <template v-for="club in popularClubs">
        <div :key="club.uid" class="div-club">
          <span class="club-name">Unique ID: {{ club.uid }}</span>
          <span class="club-courts">Courts: {{ club.courts }}</span>
          <button type="button" class="check-availability" @click="checkAvailability()">Check Availability</button>
        </div>
      </template>
    </div>
    <!-- is the search filter is active, then show the search field -->
    <div v-if="playerFilters[1].isActive">
      <p class="instruction">Enter the ID of a know tennis club:</p>
      <form>
        <!-- the v-model is used to retrieve the input data -->
        <input type="text" placeholder="e.g. wPpDZo3Qrdz3Pkh2G6XW" v-model="uniqueID">
        <label>Unique ID</label>
        <br>
        <button type="button" @click="searchClub()">Search</button>
      </form>
      <!-- if the searchResult is not null, then show the following div -->
      <div v-if="searchResult">

      </div>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// required to interact with the database
import db from '@/database.js'
// requred to call commit from within firebase callback
import store from '../store.js'
export default {
  name: 'DBPlayer',
  data () {
    return {
      uniqueID: null
    }
  },
  created () {
    this.$store.commit('getClubs')
  },
  computed: {
    ...mapState([
      'userData',
      'searchResult',
      'playerFilters',
      'popularClubs'
    ])
  },
  methods: {
    selectFilter (filter) {
      // commits the selectFilter function with the payload of the clicked filter in vuex
      store.commit('selectFilter', filter)
    },
    checkAvailability (asset) {

    },
    searchClub () {
      var id = this.uniqueID
      store.commit('searchClub', id)
    }
  }
}
</script>

<style lang="css" scoped>
@keyframes expand {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
input {
  position: relative;
  display: block;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  font-size: 16px;
  font-family: Montserrat;
  background: transparent;
  border: 0px;
  border-bottom: 2px solid black;
}
input:focus {
  border-bottom: 3px solid black;
  outline: none;
}
::placeholder {
  padding-left: 3px;
}
label {
  position: relative;
  display: inline;
  left: -120px;
  text-align: left;
  font-size: 12px;
}
button {
  margin-bottom: 50px;
}
.container-component {
  position: absolute;
  top: 250px;
  width: 100%;
}
.div-filter {
  display: inline-block;
  padding: 10px;
}
.div-underline {
  border-bottom: 1px solid black;
  animation: expand .4s;
  animation-fill-mode: forwards;
}
.instruction {
  margin-bottom: 75px;
  font-size: 1.8em;
  font-weight: 500;
}
.div-filter:hover {
  cursor: pointer;
}
.container-clubs {
  width: 80%;
  margin: 0 10% 0 10%;
}
.div-club {
  margin-top: 60px;
  height: 50px;
  border-bottom: 2px solid black;
}
.club-name {
  float: left;
  margin-left: 40px;
  width: 450px;
  font-size: 1.2em;
  font-weight: 600;
}
.club-courts {
  position: relative;
  right: 100px;
  font-size: 1.2em;
  font-weight: 600;
}
.check-availability {
  position: absolute;
  right: 200px;
}
.time-slot-free {
  position: relative;
  bottom: 3px;
  height: 50px;
  width: 100%;
  background: rgba(23, 171, 87, 0.6);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.time-slot-free:hover {
  cursor: pointer;
  background: rgba(23, 171, 87, 0.9);
  box-shadow: 2px 2px 1px rgba(0,0,0,0.4);
  transition: .2s;
}
.time-slot-free:active {
  box-shadow: none;
  transition: .2s;
}
.time-slot-booked {
  position: relative;
  bottom: 3px;
  height: 50px;
  width: 100%;
  background: rgba(221, 118, 43, 0.78);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
