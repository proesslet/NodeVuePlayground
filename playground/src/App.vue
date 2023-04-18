<script>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>
