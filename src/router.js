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
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/owner',
      name: 'Owner',
      component: () => import(/* webpackChunkName: "owner" */ './views/Owner.vue')
    },
    {
      path: '/player',
      name: 'Player',
      component: () => import(/* webpackChunkName: "player" */ './views/Player.vue')
    }
  ]
})
