<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        QuestionTime
      </router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-1">
            <router-link :to="{ name: 'question-editor' }" :params="{ slug: undefined }" class="btn btn-danger">
              Ask Question
            </router-link>
          </li>
          <li class="nav-item">
            <a class="btn btn-outline-secondary" @click="performLogout()" href="#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { axios } from "@/common/api.service.js";
export default {
  name: "NavbarComponent",
  methods: {
    async performLogout() {
      try {
        await axios.post("/accounts/logout/", {});
        // Redirect to the login page after logout
        window.location.href = '/accounts/login/';
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  }
};
</script>

<style>
.my-navbar {
  border-bottom: 1px solid #DDD;
}

.navbar-brand {
  font-weight: bold;
  font-size: 150%;
}

.navbar-brand:hover {
  color: #DC3545 !important;
}
</style>