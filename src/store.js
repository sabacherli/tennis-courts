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
    searchResult: null,
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
    unsubscribeSlots: null,
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
      state.now = moment()
    },
    // sets the time of today in different formats
    setToday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      // set today as a moment object
      var today = moment()
      state.time.yearAsNumber = today.format('YYYY')
      state.time.monthAsNumber = today.format('MM')
      state.time.monthAsString = today.format('MMMM')
      state.time.dayAsNumber = today.format('DD')
      state.time.dayAsOrdinal = today.format('Do')
      state.time.dayAsString = today.format('dddd')
      state.time.dayAsDate= today.format('YYYYMMDD')
      // get the data for today
      for (let asset in state.userData.assets) {
        db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').where('uid', '==', today.format('YYYYMMDD')).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var day = doc.data()
              // keep a reference to the id of the document to access its subcollections
              let date = doc.id
              // get the slots and add them to the empty array called slots in day
              state.unsubscribeSlots =
              db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                .onSnapshot(function (querySnapshot) {
                  day.slots = []
                  querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    day.slots.push(doc.data())
                  })
                  // assign day with the object retrieved
                  state.userData.assets[asset].day = day
                })
            })
          })
      }
    },
    // sets the time of today in different formats
    searchToday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      // set today as a moment object
      var today = moment()
      state.time.yearAsNumber = today.format('YYYY')
      state.time.monthAsNumber = today.format('MM')
      state.time.monthAsString = today.format('MMMM')
      state.time.dayAsNumber = today.format('DD')
      state.time.dayAsOrdinal = today.format('Do')
      state.time.dayAsString = today.format('dddd')
      state.time.dayAsDate= today.format('YYYYMMDD')
      // get the data for today
      for (let asset in state.searchResult.assets) {
        db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').where('uid', '==', today.format('YYYYMMDD')).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var day = doc.data()
              // keep a reference to the id of the document to access its subcollections
              let date = doc.id
              // get the slots and add them to the empty array called slots in day
              state.unsubscribeSlots =
              db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                .onSnapshot(function (querySnapshot) {
                  day.slots = []
                  querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    day.slots.push(doc.data())
                  })
                  // assign day with the object retrieved
                  state.searchResult.assets[asset].day = day
                })
            })
          })
      }
    },
    // sets the time of tomorrow in different formats
    setTomorrow (state) {
      // unsubscribe from the listener
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      // add 1 day to state.now (this will increase state.now by one, so clicking on tomorrow again will work)
      var tomorrow = state.now.add(1, 'd')
      state.time.yearAsNumber = tomorrow.format('YYYY')
      state.time.monthAsNumber = tomorrow.format('MM')
      state.time.monthAsString = tomorrow.format('MMMM')
      state.time.dayAsNumber = tomorrow.format('DD')
      state.time.dayAsOrdinal = tomorrow.format('Do')
      state.time.dayAsString = tomorrow.format('dddd')
      state.time.dayAsDate= tomorrow.format('YYYYMMDD')
      // get the data for tomorrow
      for (let asset in state.userData.assets) {
        db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').where('uid', '==', tomorrow.format('YYYYMMDD')).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var day = doc.data()
              // keep a reference to the id of the document to access its subcollections
              let date = doc.id
              // get the slots and add them to the empty array called slots in day
              state.unsubscribeSlots =
              db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                .onSnapshot(function (querySnapshot) {
                  day.slots = []
                  querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    day.slots.push(doc.data())
                  })
                  // assign day with the object retrieved
                  state.userData.assets[asset].day = day
                })
            })
          })
      }
    },
    // sets the time of tomorrow in different formats
    searchTomorrow (state) {
      // unsubscribe from the listener
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      // add 1 day to state.now (this will increase state.now by one, so clicking on tomorrow again will work)
      var tomorrow = state.now.add(1, 'd')
      state.time.yearAsNumber = tomorrow.format('YYYY')
      state.time.monthAsNumber = tomorrow.format('MM')
      state.time.monthAsString = tomorrow.format('MMMM')
      state.time.dayAsNumber = tomorrow.format('DD')
      state.time.dayAsOrdinal = tomorrow.format('Do')
      state.time.dayAsString = tomorrow.format('dddd')
      state.time.dayAsDate= tomorrow.format('YYYYMMDD')
      // get the data for tomorrow
      for (let asset in state.searchResult.assets) {
        db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').where('uid', '==', tomorrow.format('YYYYMMDD')).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var day = doc.data()
              // keep a reference to the id of the document to access its subcollections
              let date = doc.id
              // get the slots and add them to the empty array called slots in day
              state.unsubscribeSlots =
              db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                .onSnapshot(function (querySnapshot) {
                  day.slots = []
                  querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    day.slots.push(doc.data())
                  })
                  // assign day with the object retrieved
                  state.searchResult.assets[asset].day = day
                })
            })
          })
      }
    },
    // sets the time of yesterday in different formats
    setYesterday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      // subtract 1 day to state.now (this will decrease state.now by one, so clicking on yesterday again will work)
      var yesterday = state.now.subtract(1, 'd')
      state.time.yearAsNumber = yesterday.format('YYYY')
      state.time.monthAsNumber = yesterday.format('MM')
      state.time.monthAsString = yesterday.format('MMMM')
      state.time.dayAsNumber = yesterday.format('DD')
      state.time.dayAsOrdinal = yesterday.format('Do')
      state.time.dayAsString = yesterday.format('dddd')
      state.time.dayAsDate= yesterday.format('YYYYMMDD')
      // get the data for yesterday
      for (let asset in state.userData.assets) {
        db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').where('uid', '==', yesterday.format('YYYYMMDD')).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var day = doc.data()
              // keep a reference to the id of the document to access its subcollections
              let date = doc.id
              // get the slots and add them to the empty array called slots in day
              state.unsubscribeSlots =
              db.collection('users').doc(state.userData.uid).collection('assets').doc(state.userData.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                .onSnapshot(function (querySnapshot) {
                  day.slots = []
                  querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    day.slots.push(doc.data())
                  })
                  // assign day with the object retrieved
                  state.userData.assets[asset].day = day
                })
            })
          })
      }
    },
    // sets the time of yesterday in different formats
    searchYesterday (state) {
      // unsubscribe from the listener
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      // subtract 1 day to state.now (this will decrease state.now by one, so clicking on yesterday again will work)
      var yesterday = state.now.subtract(1, 'd')
      state.time.yearAsNumber = yesterday.format('YYYY')
      state.time.monthAsNumber = yesterday.format('MM')
      state.time.monthAsString = yesterday.format('MMMM')
      state.time.dayAsNumber = yesterday.format('DD')
      state.time.dayAsOrdinal = yesterday.format('Do')
      state.time.dayAsString = yesterday.format('dddd')
      state.time.dayAsDate= yesterday.format('YYYYMMDD')
      // get the data for yesterday
      for (let asset in state.searchResult.assets) {
        db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').where('uid', '==', yesterday.format('YYYYMMDD')).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              var day = doc.data()
              // keep a reference to the id of the document to access its subcollections
              let date = doc.id
              // get the slots and add them to the empty array called slots in day
              state.unsubscribeSlots =
              db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                .onSnapshot(function (querySnapshot) {
                  day.slots = []
                  querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    day.slots.push(doc.data())
                  })
                  // assign day with the object retrieved
                  state.searchResult.assets[asset].day = day
                })
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
      // unsubscribe from the listeners
      if (state.unsubscribeSlots) {
        state.unsubscribeSlots()
      }
      if (state.unsubscribeAssets) {
        state.unsubscribeAssets()
      }
      //
      var today = moment()
      state.time.yearAsNumber = today.format('YYYY')
      state.time.monthAsNumber = today.format('MM')
      state.time.monthAsString = today.format('MMMM')
      state.time.dayAsNumber = today.format('DD')
      state.time.dayAsOrdinal = today.format('Do')
      state.time.dayAsString = today.format('dddd')
      state.time.dayAsDate = today.format('YYYYMMDD')
      // get the data based on the id that was searched
      db.collection('users').doc(id).get()
        .then(function (doc) {
          state.searchResult = doc.data()
          // keep this reference as well
          state.unsubscribeAssets =
          db.collection('users').doc(id).collection('assets').orderBy('name')
            .onSnapshot(function (querySnapshot) {
              // empty the array of assets before repopulating it
              state.searchResult.assets = []
              // define an empty array that we can fill
              var searchResultAssetsArray = []
              // get all the documents with a forEach loop
              querySnapshot.forEach(function (doc) {
                let data = doc.data()
                searchResultAssetsArray.push(data)
              })
              // push all assets into vuex state management
              for (let asset in searchResultAssetsArray) {
                state.searchResult.assets.push(searchResultAssetsArray[asset])
                // get the data for yesterday
                db.collection('users').doc(id).collection('assets').doc(searchResultAssetsArray[asset].uid).collection('calendar').where('uid', '==', today.format('YYYYMMDD')).get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      var day = doc.data()
                      // keep a reference to the id of the document to access its subcollections
                      let date = doc.id
                      // get the slots and add them to the empty array called slots in day
                      state.unsubscribeSlots =
                      db.collection('users').doc(id).collection('assets').doc(searchResultAssetsArray[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                        .onSnapshot(function (querySnapshot) {
                          querySnapshot.forEach(function (doc) {
                            let data = doc.data()
                            day.slots.push(doc.data())
                          })
                          // assign day with the object retrieved
                          state.searchResult.assets[asset].day = day
                          for (let asset in state.searchResult.assets) {
                            db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').where('uid', '==', today.format('YYYYMMDD')).get()
                              .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                  var day = doc.data()
                                  // keep a reference to the id of the document to access its subcollections
                                  let date = doc.id
                                  // get the slots and add them to the empty array called slots in day
                                  state.unsubscribeSlots =
                                  db.collection('users').doc(state.searchResult.uid).collection('assets').doc(state.searchResult.assets[asset].uid).collection('calendar').doc(date).collection('slots').orderBy('uid')
                                    .onSnapshot(function (querySnapshot) {
                                      day.slots = []
                                      querySnapshot.forEach(function (doc) {
                                        let data = doc.data()
                                        day.slots.push(doc.data())
                                      })
                                      // assign day with the object retrieved
                                      state.searchResult.assets[asset].day = day
                                    })
                                })
                              })
                          }
                        })
                    })
                  })
              }
            })
        })
    }
  }
})
