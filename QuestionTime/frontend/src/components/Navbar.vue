<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand"
        >QuestionTime
      </router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-1">
            <router-link
              :to="{ name: 'question-editor' }"
              :params="{ slug: undefined }"
              class="btn btn-danger"
              >Ask Question
            </router-link>
          </li>
          <li class="nav-item">
            <a class="btn btn-outline-secondary" href="/accounts/logout/"
              >Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style>
.my-navbar {
  border-bottom: 1px solid #ddd;
}

.navbar-brand {
  font-weight: bold;
  font-size: 150%;
}

.navbar-brand:hover {
  color: #dc3545 !important;
}
</style>