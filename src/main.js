import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes';
import { store } from './store';
import VueGoogleCharts from 'vue-google-charts';
import VueKonva from 'vue-konva';

Vue.use(VueKonva);
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
  VueKonva,
  render: h => h(App)
}).$mount('#app')
