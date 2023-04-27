<template>
  <div id="nav">
    <NavbarComponent />
  </div>
  <router-view />
</template>

<script>
import { axios } from "@/common/api.service.js";
import { endpoints } from "@/common/endpoints.js";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
  },
  methods: {
    async setUserInfo() {
      // add the username of the current user to localStorage
      try {
        const response = await axios.get(endpoints["usersDetail"]);
        const requestUser = response.data["username"];
        window.localStorage.setItem("username", requestUser);
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
  },
  created() {
    this.setUserInfo();
  },
};
</script>

<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 300;
}

.btn:focus {
  box-shadow: none !important;
}
</style>
