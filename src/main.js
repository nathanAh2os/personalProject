import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes';
import { store } from './store';
import VueGoogleCharts from 'vue-google-charts';

Vue.use(VueGoogleCharts);


Vue.config.productionTip = false

new Vue({
  el: '#app',
  data() {
    return {
      privateTest: store.state
    }
  },
  vuetify,
  router,
  VueGoogleCharts,
  render: h => h(App)
}).$mount('#app')
