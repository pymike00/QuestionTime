<template>
  <div class="single-question mt-2">
    <div class="container">
      <h1>{{ question.content }}</h1>
      <p class="mb-0">Posted by:
        <span class="author-name">{{ question.author }}</span>
      </p>
      <p>{{ question.created_at }}</p>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service.js"
export default {
  name: "Question",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      question: {}
    }
  },
  methods: {
    setPageTitle(title) {
      document.title = title;
    },
    getQuestionData() {
      // get the details of a question instance from the REST API and call setPageTitle
      let endpoint = `/api/questions/${this.slug}/`;
      apiService(endpoint)
        .then(data => {
          this.question = data;
          this.setPageTitle(data.content)
        })
    }
  },
  created() {
    this.getQuestionData()
  }
}
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: #DC3545;
}
</style>

