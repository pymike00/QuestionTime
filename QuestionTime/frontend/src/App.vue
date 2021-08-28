<template>
  <div id="nav">
    <NavbarComponent />
  </div>
  <router-view />
</template>

<script>
import { axios } from "@/common/api.service.js";
import NavbarComponent from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
  methods: {
    async setUserInfo() {
      // add the username of the logged in user to localStorage
      try {
        const response = await axios.get("/api/user/");
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
html,
body {
  height: 100%;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 300;
}

.btn:focus {
  box-shadow: none !important;
}
</style>
