import Vue from "vue";
import App from "./App.vue";
import { router } from "./modules/router";
import store from "./modules/store";
import "./modules/firebase";
import { rtdbPlugin } from "vuefire";

Vue.config.productionTip = false;
Vue.use(rtdbPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
