import Vue from 'vue';
import '@babel/polyfill';
import './assets/reset.scss';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
