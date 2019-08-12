import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('./views/Reservation.vue')
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('./views/Docs.vue')
    },
    {
      path: '/supply',
      name: 'supply',
      component: () => import('./views/Supply.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    // }
  ]
});
