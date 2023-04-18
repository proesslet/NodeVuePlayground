<template>
  <div>
    <h2>Login</h2>
    <form v-on:submit="login">
      <input type="text" name="email" /><br />
      <input type="password" name="password" /><br />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Login",
  computed: {
    isLoggedIn: function () {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    toggleLoggedIn: function (newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
      console.log(this.$store.state.loggedIn);
    },
    allowLogin: function () {
      this.toggleLoggedIn(true);
      router.push("/profile");
    },
    login: function (event) {
      event.preventDefault();
      let self = this;
      let email = event.target.email.value;
      let password = event.target.password.value;
      axios({
        method: "post",
        url: "http://localhost:3000/api/login",
        data: {
          email: email,
          password: password,
        },
        withCredentials: true,
      })
        .then(function (response) {
          console.log(response);
          self.allowLogin();
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
};
</script>

<style>
h2 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
