// Import Vue
import Vue from "vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify, {
  theme: {
    primary: "#3f51b5",
    secondary: "#fff",
    accent: "#1A237E"
  }
});

import InstantSearch from 'vue-instantsearch';
Vue.use(InstantSearch);

import VueObserveVisibility from 'vue-observe-visibility';
Vue.use(VueObserveVisibility);

import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

// Import App Custom Styles
//import AppStyles from "./assets/sass/main.scss"

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});