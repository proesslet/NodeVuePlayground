<template>
  <header>
    <h1>My Website</h1>
    <nav id="desktop-nav">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </li>
        <li v-if="isLoggedIn" id="dropdown">
          <p id="dropdown-button">Account</p>

          <ul id="dropdown-content">
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
            <li @click="logout">Logout</li>
          </ul>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
import router from "../router";
import axios from "axios";
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.state.loggedIn;
    },
  },
  data: function () {
    return {
      user: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    toggleLoggedIn: function (newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
      console.log(this.$store.state.loggedIn);
    },
    getUserData: function () {
      let self = this;
      // If the user is logged in, get their data
      axios({
        method: "get",
        url: "http://localhost:3000/api/user",
        withCredentials: true,
      })
        .then(function (response) {
          if (response.data.user) {
            self.user = response.data.user;
            self.toggleLoggedIn(true);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    logout: function () {
      let self = this;
      axios({
        method: "post",
        url: "http://localhost:3000/api/logout",
        withCredentials: true,
      })
        .then(function (response) {
          console.log(response);
          self.toggleLoggedIn(false);
          router.push("/login");
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped>
header {
  display: flex;
  margin: 0 auto;
  align-items: center;
  width: 75%;
}
h1 {
  font-size: 1.5rem;
}

nav {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 1rem;
}

li {
  margin: 0 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}
a {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.5rem;
  margin: 1rem;
}

#dropdown {
  position: relative;
}

#dropdown-button {
  cursor: pointer;
  font-size: 1.5rem;
}

#dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-background);
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

#dropdown-content li {
  color: var(--color-text);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

#dropdown-content li:hover {
  background-color: #494949;
}

#dropdown:hover #dropdown-content {
  display: block;
}
</style>
