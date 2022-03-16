<template>
  <div class="single-question mt-2">
    <div v-if="question" class="container">
      <h1>{{ question.content }}</h1>
      <p class="mb-0">
        Posted by:
        <span class="author-name">{{ question.author }}</span>
      </p>
      <p>{{ question.created_at }}</p>

      <QuestionActions v-if="isQuestionAuthor" :slug="question.slug" />

      <div v-if="userHasAnswered">
        <p class="answer-added">You've written an answer!</p>
      </div>
      <div v-else-if="showForm">
        <form @submit.prevent="onSubmit">
          <p>Answer the Question</p>
          <textarea
            v-model="newAnswerBody"
            class="form-control"
            placeholder="Share Your Knowledge!"
            rows="10"
          ></textarea>
          <button type="submit" class="btn btn-success my-3">
            Submit Your Answer
          </button>
        </form>
        <p v-if="error" class="error mt-2">{{ error }}</p>
      </div>

      <div v-else>
        <button class="btn btn-success" @click="showForm = true">
          Answer The Question
        </button>
      </div>
      <hr />
    </div>
    <div v-else>
      <h1 class="error text-center">404 - Question Not Found</h1>
    </div>
    <div v-if="question" class="container">
      <AnswerComponent
        v-for="answer in answers"
        :answer="answer"
        :requestUser="requestUser"
        :key="answer.uuid"
        @delete-answer="deleteAnswer"
      />
      <div class="my-4">
        <p v-show="loadingAnswers">...loading...</p>
        <button
          v-show="next"
          @click="getQuestionAnswers"
          class="btn btn-sm btn-outline-success"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";
import QuestionActions from "@/components/QuestionActions.vue";
export default {
  name: "QuestionView",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    AnswerComponent,
    QuestionActions,
  },
  data() {
    return {
      question: {},
      answers: [],
      next: null,
      loadingAnswers: false,
      newAnswerBody: null,
      error: null,
      userHasAnswered: false,
      showForm: false,
      requestUser: null,
    };
  },
  computed: {
    isQuestionAuthor() {
      // return true if the logged in user is also the author of the question instance
      return this.question.author === this.requestUser;
    },
  },
  methods: {
    setPageTitle(title) {
      // set a given title string as the webpage title
      document.title = title;
    },
    setRequestUser() {
      // the username has been set to localStorage by the App.vue component
      this.requestUser = window.localStorage.getItem("username");
    },
    async getQuestionData() {
      // get the details of a question instance from the REST API and call setPageTitle
      const endpoint = `/api/v1/questions/${this.slug}/`;
      try {
        const response = await axios.get(endpoint);
        this.question = response.data;
        this.userHasAnswered = response.data.user_has_answered;
        this.setPageTitle(response.data.content);
      } catch (error) {
        console.log(error.response);
        this.question = null;
        this.setPageTitle(error.response.statusText);
      }
    },
    async getQuestionAnswers() {
      // get a page of answers for a single question from the REST API's paginated 'Questions Endpoint'
      let endpoint = `/api/v1/questions/${this.slug}/answers/`;
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingAnswers = true;
      try {
        const response = await axios.get(endpoint);
        this.answers.push(...response.data.results);
        this.loadingAnswers = false;
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
    async onSubmit() {
      // Tell the REST API to create a new answer for this question
      // based on the user input, then update some data properties
      if (!this.newAnswerBody) {
        this.error = "You can't send an empty answer!";
        return;
      }
      const endpoint = `/api/v1/questions/${this.slug}/answer/`;
      try {
        const response = await axios.post(endpoint, {
          body: this.newAnswerBody,
        });
        this.answers.unshift(response.data);
        this.newAnswerBody = null;
        this.showForm = false;
        this.userHasAnswered = true;
        if (this.error) {
          this.error = null;
        }
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    async deleteAnswer(answer) {
      // delete a given answer from the answers array and make a delete request to the REST API
      const endpoint = `/api/v1/answers/${answer.uuid}/`;
      try {
        await axios.delete(endpoint);
        this.answers.splice(this.answers.indexOf(answer), 1);
        this.userHasAnswered = false;
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
  },
  created() {
    this.getQuestionData();
    this.getQuestionAnswers();
    this.setRequestUser();
  },
};
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: #dc3545;
}

.answer-added {
  font-weight: bold;
  color: green;
}

.error {
  font-weight: bold;
  color: red;
}
</style>
