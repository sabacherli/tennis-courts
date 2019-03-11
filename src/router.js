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
