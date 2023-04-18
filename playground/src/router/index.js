import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile.vue";
import AboutPage from "../pages/AboutPage.vue";
import AdminPage from "../pages/AdminPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/about",
      component: AboutPage,
    },
    {
      path: "/admin",
      component: AdminPage,
    },
  ],
});

export default router;
