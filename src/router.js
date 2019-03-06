import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Register',
      meta: {
        title: 'Tennis Court',
        metaTags: [
          {
            name: 'Booking Engine',
            content: 'Enable your tennis courts to be booked automatically.'
          }
        ]
      },
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    }
  ]
})
