<template>
  <div class="home">
    <div class="container">
      <div v-for="question in questions"
           :key="question.pk">
        <p class="mb-0">Posted by:
          <span class="author-name">{{ question.author }}</span>
        </p>
        <h2>{{ question.content }}</h2>
        <p>Answers: {{ question.answers_count }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service"
export default {
  name: "home",
  data() {
    return {
      questions: []
    }
  },
  methods: {
    getQuestions() {
      let endpoint = "api/questions/";
      apiService(endpoint)
        .then(data => {
          this.questions.push(...data.results)
        })
    }
  },
  created() {
    this.getQuestions()
  }
};
</script>

<style>
.author-name {
  font-weight: bold;
  color: #DC3545;
}
</style>
