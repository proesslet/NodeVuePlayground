import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";

import "./assets/main.css";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      loggedIn: false,
    };
  },
  mutations: {
    changeLoggedIn(state, payload) {
      state.loggedIn = payload;
    },
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
