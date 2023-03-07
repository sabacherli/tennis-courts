import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// this file allows the user to switch between pages without refreshing the page
// this is required because it TennisCourt a single page application
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Register',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
      }
    },
    {
      path: '/owner',
      name: 'Owner',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "owner" */ './views/Owner.vue')
      }
    },
    {
      path: '/player',
      name: 'Player',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "player" */ './views/Player.vue')
      }
    },
    {
      path: '/bookings',
      name: 'Bookings',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "bookings" */ './views/Bookings.vue')
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "bookings" */ './views/Settings.vue')
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        dropdown: () => import(/* webpackChunkName: "dropdown" */ './components/Dropdown.vue'),
        default: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
      }
    }
  ]
})
