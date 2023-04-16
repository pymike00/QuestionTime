<template>
  <div class="container mt-3">
    <h1 class="not-found">{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      message: "404 - Not Found",
    };
  },
  created() {
    document.title = this.message;
  }
};
</script>

<style>
.not-found {
  color: red;
  text-align: center;
}
</style>

