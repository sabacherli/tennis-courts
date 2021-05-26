<!-- This component is for the owner bookings -->
<template lang="html">
  <div class="container-component">
    <!-- if the bookingResult is not null, then show the following div -->
    <div v-if="userData.assets" class="container-assets">
      <!-- this template is displayed for all bookings in ownerAssets -->
      <template v-for="asset in userData.assets">
        <!-- the key directive is required by vue -->
        <div :key="asset.uid" class="div-asset">
          <!-- the name of the court and time of the booking -->
          <p class="asset-name">{{ asset.name }}</p>
          <!-- button to delete the court -->
          <button type="button" @click="deleteCourt(asset)">Delete</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// required to read the computed values
import { mapState } from 'vuex'
// required to interact with the database
import db from '@/database.js'
export default {
  name: 'BookingsOwner',
  // data specific to this component and not stored in the store
  data () {
    return {
      uniqueID: null
    }
  },
  // mutations executed as soon as this component is created
  created () {
    this.$store.commit('setTime')
    this.$store.commit('setToday')
  },
  computed: {
    // data that is made available from the store as soon as the component is computed
    ...mapState([
      'userData'
    ])
  },
  // methods are where the functions of a component are listed
  methods: {
    deleteCourt (asset) {
      var assetID = asset.uid
      var userData = this.userData
      // updates the users information in the database, reducing the number of courts by 1
      db.collection('users').doc(userData.uid).update({
        courts: Number(userData.courts) - 1
      })
      // deletes all days out of the calendar collection in the database
      db.collection('users').doc(userData.uid).collection('assets').doc(assetID).collection('calendar').get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var docID = doc.id
            db.collection('users').doc(userData.uid).collection('assets').doc(assetID).collection('calendar').doc(docID).delete()
          })
        })
      // deletes the selected asset out of the database
      db.collection('users').doc(userData.uid).collection('assets').doc(assetID).delete()
    }
  }
}
</script>

<!-- styling scoped to this component -->
<style lang="css" scoped>
label {
  position: relative;
  display: inline;
  left: -120px;
  text-align: left;
  font-size: 12px;
}
button {
  float: right;
  margin-top: 20px;
}
.container-component {
  position: absolute;
  top: 250px;
  width: 100%;
}
.container-assets {
  width: 80%;
  margin: 0 10% 0 10%;
}
.div-asset {
  margin: 20px;
  height: 60px;
  border-bottom: 2px solid black;
}
.asset-name {
  display: inline-block;
  float: left;
  margin-left: 40px;
  font-size: 1.2em;
  font-weight: 600;
}
</style>
