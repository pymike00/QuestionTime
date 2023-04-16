<template>
  <div class="container mt-3">
    <div v-for="question in questions" :key="question.uuid">
      <div class="card shadow p-2 mb-4 bg-body rounded">
        <div class="card-body">
          <p class="mb-0">
            Posted by:
            <span class="question-author">{{ question.author }}</span>
          </p>
          <h2>
            <router-link
              :to="{ name: 'question', params: { slug: question.slug } }"
              class="question-link"
              >{{ question.content }}
            </router-link>
          </h2>
          <p class="mb-0">Answers: {{ question.answers_count }}</p>
        </div>
      </div>
    </div>
    <div class="my-4">
      <p v-show="loadingQuestions">...loading...</p>
      <button
        v-show="next"
        @click="getQuestions"
        class="btn btn-sm btn-outline-success"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
export default {
  name: "home-view",
  data() {
    return {
      questions: [],
      next: null,
      loadingQuestions: false,
    };
  },
  methods: {
    async getQuestions() {
      // make a GET Request to the questions list endpoint and populate the questions array
      let endpoint = "/api/v1/questions/";
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingQuestions = true;
      try {
        const response = await axios.get(endpoint);
        this.questions.push(...response.data.results);
        this.loadingQuestions = false;
        if (response.data.next) {
          this.next = response.data.next;
        } else {
          this.next = null;
        }
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
  },
  created() {
    document.title = "QuestionTime";
    this.getQuestions();
  },
};
</script>

<style scoped>
.question-author {
  font-weight: bold;
  color: #dc3545;
}

.question-link {
  font-weight: 400;
  color: black;
  text-decoration: none;
}

.question-link:hover {
  color: #343a40;
}
</style>
