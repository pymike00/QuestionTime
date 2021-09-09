<template>
  <div class="mt-3">
    <router-link
      :to="{ name: 'question-editor', params: { slug: slug } }"
      class="btn btn-sm btn-warning me-1"
      >Edit
    </router-link>
    <button class="btn btn-sm btn-danger" @click="deleteQuestion">
      Delete
    </button>
    <hr />
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
export default {
  name: "QuestionActions",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  methods: {
    async deleteQuestion() {
      const endpoint = `/api/v1/questions/${this.slug}/`;
      try {
        await axios.delete(endpoint);
        this.$router.push({
          name: "home",
        });
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
  },
};
</script>

