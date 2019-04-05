<template>
  <div class="example">
    <h1>First Single File Component!</h1>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
export default {
    name: "example",
    data() {
        return {
            message: "Hello World!"
        }
    }
}
</script>


<style scoped>
    h1 {
        color: red;
    }
</style>

