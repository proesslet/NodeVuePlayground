<template>
  <div>
    <h2>Profile</h2>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios({
        method: "get",
        url: "http://localhost:3000/api/user",
        withCredentials: true,
      })
        .then(function (response) {
          console.log(response);
          self.user = response.data.user;
        })
        .catch((errors) => {
          console.log(errors);
          router.push("/login");
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin-top: 1rem;
}
</style>
