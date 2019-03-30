import Vue from 'vue'
import Vuex from 'vuex'
// moment is a third-party package used to easily handle date and time in javascript
import moment from 'moment'
// needed to interact with the database
import db from '@/database.js'

Vue.use(Vuex)
// it has to be required before use
Vue.use(Vuex, moment)

export default new Vuex.Store({
  // in state, the variables are defined
  state: {
    userData: null,
    searchResultAssets: null,
    searchID: null,
    playerFilters: [
      {
        text: 'Most Popular',
        isActive: true,
        uid: 1
      },
      {
        text: 'Search',
        isActive: false,
        uid: 2
      }
    ],
    popularClubs: [],
    now: null,
    time: {
      yearAsNumber: null,
      monthAsNumber: null,
      monthAsString: null,
      dayAsNumber: null,
      dayAsOrdinal: null,
      dayAsString: null,
      dayAsDate: null
    },
    unsubscribeEvents: [],
    unsubscribeSlots: null,
    unsubscribeBookings: null,
    unsubscribeAssets: null
  },
  // mutations are the functions that mutate the state variables
  mutations: {
    // user data is populated with the data from firebase
    setUserData (state, userData) {
      state.userData = userData
    },
    // user data is set to null, which is checked when decide whether to show the logout in the menu or not
    emptyUserData (state) {
      state.userData = null
    },
    // empties the userData.assets array to avoid pushing the same asset into the array if data changes in the back-end
    emptyUserDataAssets (state) {
      state.userData.assets.length = 0
    },
    // pushes each asset into the userData.assets array
    setUserDataAssets (state, userDataAssetsArray) {
      for (let asset in userDataAssetsArray) {
        state.userData.assets.push(userDataAssetsArray[asset])
      }
    },
    // empties the userData.bookings array to avoid pushing the same booking into the array if data changes in the back-end
    emptyUserDataBookings (state) {
      state.userData.bookings.length = 0
    },
    // pushes each booking into the userData.bookings array
    setUserDataBookings (state, userDataBookingsArray) {
      for (let booking in userDataBookingsArray) {
        state.userData.bookings.push(userDataBookingsArray[booking])
      }
    },
    // sets all filters as false before setting the clicked filter as true
    selectFilter (state, filter) {
      for (let f in state.playerFilters) {
        state.playerFilters[f].isActive = false
      }
      filter.isActive = true
    },
    setFilter (state) {
      // set the search filter active and all the rest false
      for (let f in state.playerFilters) {
        if (state.playerFilters[f].text === 'Search') {
          state.playerFilters[f].isActive = true
        } else {
          state.playerFilters[f].isActive = false
        }
      }
    },
    // this time is set on creation of the website
    setTime (state) {

    },
    // sets the time of today in different formats
    setToday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeEvents.length > 0) {
        for (let func in state.unsubscribeEvents) {
          state.unsubscribeEvents[func]()
        }
      }
      // set today as a moment object
      state.now = moment()
      var today = state.now
      state.time.yearAsNumber = today.format('YYYY')
      state.time.monthAsNumber = today.format('MM')
      state.time.monthAsString = today.format('MMMM')
      state.time.dayAsNumber = today.format('DD')
      state.time.dayAsOrdinal = today.format('Do')
      state.time.dayAsString = today.format('dddd')
      state.time.dayAsDate = today.format('YYYYMMDD')
      // get the data for today
      for (let asset in state.userData.assets) {
        // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
        state.unsubscribeEvents[asset] =
        db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').where('day', '==', today.format('YYYYMMDD')).orderBy('slot')
          .onSnapshot(function (querySnapshot) {
            // empty the array of day before repopulating it
            state.userData.assets[asset].day = []
            // get all the documents with a forEach loop
            querySnapshot.forEach(function (doc) {
              var booking = doc.data()
              state.userData.assets[asset].day.push(booking)
            })
          })
      }
    },
    searchToday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeEvents.length > 0) {
        for (let func in state.unsubscribeEvents) {
          state.unsubscribeEvents[func]()
        }
      }
      // set today as a moment object
      state.now = moment()
      var today = state.now
      state.time.yearAsNumber = today.format('YYYY')
      state.time.monthAsNumber = today.format('MM')
      state.time.monthAsString = today.format('MMMM')
      state.time.dayAsNumber = today.format('DD')
      state.time.dayAsOrdinal = today.format('Do')
      state.time.dayAsString = today.format('dddd')
      state.time.dayAsDate = today.format('YYYYMMDD')
      // get the data for today
      for (let asset in state.searchResultAssets) {
        // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
        state.unsubscribeEvents[asset] =
        db.collection('users').doc(state.searchID).collection('assets').doc(state.searchResultAssets[asset].uid).collection('calendar').where('day', '==', today.format('YYYYMMDD')).orderBy('slot')
          .onSnapshot(function (querySnapshot) {
            // empty the array of day before repopulating it
            state.searchResultAssets[asset].day = []
            // get all the documents with a forEach loop
            querySnapshot.forEach(function (doc) {
              var booking = doc.data()
              state.searchResultAssets[asset].day.push(booking)
            })
          })
      }
    },
    setTomorrow (state) {
      // unsubscribe from the listener
      if (state.unsubscribeEvents.length > 0) {
        for (let func in state.unsubscribeEvents) {
          state.unsubscribeEvents[func]()
        }
      }
      // add 1 day to state.now (this will increase state.now by one, so clicking on tomorrow again will work)
      var tomorrow = state.now.add(1, 'd')
      state.time.yearAsNumber = tomorrow.format('YYYY')
      state.time.monthAsNumber = tomorrow.format('MM')
      state.time.monthAsString = tomorrow.format('MMMM')
      state.time.dayAsNumber = tomorrow.format('DD')
      state.time.dayAsOrdinal = tomorrow.format('Do')
      state.time.dayAsString = tomorrow.format('dddd')
      state.time.dayAsDate = tomorrow.format('YYYYMMDD')
      // get the data for tomorrow
      for (let asset in state.userData.assets) {
        // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
        state.unsubscribeEvents[asset] =
        db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').where('day', '==', tomorrow.format('YYYYMMDD')).orderBy('slot')
          .onSnapshot(function (querySnapshot) {
            // empty the array of day before repopulating it
            state.userData.assets[asset].day = []
            // get all the documents with a forEach loop
            querySnapshot.forEach(function (doc) {
              var booking = doc.data()
              state.userData.assets[asset].day.push(booking)
            })
          })
      }
    },
    searchTomorrow (state) {
      // unsubscribe from the listener
      if (state.unsubscribeEvents.length > 0) {
        for (let func in state.unsubscribeEvents) {
          state.unsubscribeEvents[func]()
        }
      }
      // add 1 day to state.now (this will increase state.now by one, so clicking on tomorrow again will work)
      var tomorrow = state.now.add(1, 'd')
      state.time.yearAsNumber = tomorrow.format('YYYY')
      state.time.monthAsNumber = tomorrow.format('MM')
      state.time.monthAsString = tomorrow.format('MMMM')
      state.time.dayAsNumber = tomorrow.format('DD')
      state.time.dayAsOrdinal = tomorrow.format('Do')
      state.time.dayAsString = tomorrow.format('dddd')
      state.time.dayAsDate = tomorrow.format('YYYYMMDD')
      // get the data for tomorrow
      for (let asset in state.searchResultAssets) {
        // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
        state.unsubscribeEvents[asset] =
        db.collection('users').doc(state.searchID).collection('assets').doc(state.searchResultAssets[asset].uid).collection('calendar').where('day', '==', tomorrow.format('YYYYMMDD')).orderBy('slot')
          .onSnapshot(function (querySnapshot) {
            // empty the array of day before repopulating it
            state.searchResultAssets[asset].day = []
            // get all the documents with a forEach loop
            querySnapshot.forEach(function (doc) {
              var booking = doc.data()
              state.searchResultAssets[asset].day.push(booking)
            })
          })
      }
    },
    setYesterday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeEvents.length > 0) {
        for (let func in state.unsubscribeEvents) {
          state.unsubscribeEvents[func]()
        }
      }
      // subtract 1 day to state.now (this will decrease state.now by one, so clicking on yesterday again will work)
      var yesterday = state.now.subtract(1, 'd')
      state.time.yearAsNumber = yesterday.format('YYYY')
      state.time.monthAsNumber = yesterday.format('MM')
      state.time.monthAsString = yesterday.format('MMMM')
      state.time.dayAsNumber = yesterday.format('DD')
      state.time.dayAsOrdinal = yesterday.format('Do')
      state.time.dayAsString = yesterday.format('dddd')
      state.time.dayAsDate = yesterday.format('YYYYMMDD')
      // get the data for yesterday
      for (let asset in state.userData.assets) {
        // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
        state.unsubscribeEvents[asset] =
        db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').where('day', '==', yesterday.format('YYYYMMDD')).orderBy('slot')
          .onSnapshot(function (querySnapshot) {
            // empty the array of day before repopulating it
            state.userData.assets[asset].day = []
            // get all the documents with a forEach loop
            querySnapshot.forEach(function (doc) {
              var booking = doc.data()
              state.userData.assets[asset].day.push(booking)
            })
          })
      }
    },
    searchYesterday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeEvents.length > 0) {
        for (let func in state.unsubscribeEvents) {
          state.unsubscribeEvents[func]()
        }
      }
      // subtract 1 day to state.now (this will decrease state.now by one, so clicking on yesterday again will work)
      var yesterday = state.now.subtract(1, 'd')
      state.time.yearAsNumber = yesterday.format('YYYY')
      state.time.monthAsNumber = yesterday.format('MM')
      state.time.monthAsString = yesterday.format('MMMM')
      state.time.dayAsNumber = yesterday.format('DD')
      state.time.dayAsOrdinal = yesterday.format('Do')
      state.time.dayAsString = yesterday.format('dddd')
      state.time.dayAsDate = yesterday.format('YYYYMMDD')
      // get the data for yesterday
      for (let asset in state.searchResultAssets) {
        // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
        state.unsubscribeEvents[asset] =
        db.collection('users').doc(state.searchID).collection('assets').doc(state.searchResultAssets[asset].uid).collection('calendar').where('day', '==', yesterday.format('YYYYMMDD')).orderBy('slot')
          .onSnapshot(function (querySnapshot) {
            // empty the array of day before repopulating it
            state.searchResultAssets[asset].day = []
            // get all the documents with a forEach loop
            querySnapshot.forEach(function (doc) {
              var booking = doc.data()
              state.searchResultAssets[asset].day.push(booking)
            })
          })
      }
    },
    getClubs (state) {
      // empty the array to avoid doubles
      state.popularClubs = []
      // get all documents where the role of the document is owner and order the query by the amoung of courts - this requires an indexing of the project in firebase
      db.collection('users').where('role', '==', 'Owner').orderBy('courts').get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let club = doc.data()
            // push each document into the state array popularClubs
            state.popularClubs.push(club)
          })
        })
    },
    searchClub (state, id) {
      // set today as a date variable
      var today = moment()
      state.searchID = id
      // set the variations of today
      state.time.yearAsNumber = today.format('YYYY')
      state.time.monthAsNumber = today.format('MM')
      state.time.monthAsString = today.format('MMMM')
      state.time.dayAsNumber = today.format('DD')
      state.time.dayAsOrdinal = today.format('Do')
      state.time.dayAsString = today.format('dddd')
      state.time.dayAsDate = today.format('YYYYMMDD')
      // get the data
      db.collection('users').doc(id).collection('assets').orderBy('name').get()
        .then(function (querySnapshot) {
          // empty the array of assets before repopulating it
          state.searchResultAssets = []
          // define an empty array that we can fill
          var searchResultAssetsArray = []
          // get all the documents with a forEach loop
          querySnapshot.forEach(function (doc) {
            let data = doc.data()
            searchResultAssetsArray.push(data)
          })
          // push all assets into vuex state management
          for (let asset in searchResultAssetsArray) {
            // keep a reference to this listener to stop listenting once no longer needed (saves bandwidth)
            state.unsubscribeEvents[asset] =
            db.collection('users').doc(id).collection('assets').doc(searchResultAssetsArray[asset].uid).collection('calendar').where('day', '==', today.format('YYYYMMDD')).orderBy('slot')
              .onSnapshot(function (querySnapshot) {
                // empty the array of day before repopulating it
                searchResultAssetsArray[asset].day = []
                // get all the documents with a forEach loop
                querySnapshot.forEach(function (doc) {
                  var booking = doc.data()
                  searchResultAssetsArray[asset].day.push(booking)
                })
              })
            // push the data into searchResultAssets
            state.searchResultAssets.push(searchResultAssetsArray[asset])
          }
        })
    }
  }
})
