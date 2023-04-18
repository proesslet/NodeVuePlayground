<template>
  <div id="home">
    <h1>Logged in Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomePage",
  data: function () {
    return {
      users: {},
    };
  },
  methods: {
    getAllUsers() {
      let self = this;
      axios({
        method: "get",
        url: "http://localhost:3000/api/users/loggedin",
        withCredentials: true,
      })
        .then(function (response) {
          console.log(response);
          var result = response.data;
          for (var i = 0; i < result.length; i++) {
            self.users[i] = result[i];
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
