<template>
  <div class="question-actions">
    <router-link
      :to="{name: 'question-editor', params: {slug: slug}}"
      class="btn btn-sm btn-outline-secondary mr-1"
      >Edit
    </router-link>
    <button
      class="btn btn-sm btn-outline-danger"
      @click="deleteQuestion"
      >Delete
    </button>
  </div>  
</template>

<script>
import { apiService } from "@/common/api.service.js";
export default {
  name: "QuestionActions",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    async deleteQuestion() {
      let endpoint = `/api/questions/${this.slug}/`;
      try {
        await apiService(endpoint, "DELETE");
        this.$router.push("/");
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

