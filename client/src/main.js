import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

import Buefy from 'buefy';
Vue.use(Buefy, { defaultIconPack: 'fas' });

import FullCalendar from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.min.css';
Vue.use(FullCalendar);

import Layout from '@/layouts/default';
Vue.component('Layout', Layout);
import PageContainer from '@/components/PageContainer';
Vue.component('PageContainer', PageContainer);

import { plugin } from 'vue-function-api';
Vue.use(plugin);

import './axios';
import 'dayjs/locale/th';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('th');
// const vm =
new Vue({
  router,
  store,
  render: h => h(App),
  component: {
    Layout
  }
}).$mount('#app');

// console.log(vm.$listeners)
