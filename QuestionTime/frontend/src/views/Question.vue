<template>
  <div class="single-question mt-2">
    <div v-if="question" class="container">
      <h1>{{ question.content }}</h1>
      <QuestionActions
        v-if="isQuestionAuthor"
        :slug="question.slug"
      />
      <p class="mb-0">Posted by:
        <span class="author-name">{{ question.author }}</span>
      </p>
      <p>{{ question.created_at }}</p>
      <hr>
      <div v-if="userHasAnswered">
        <p class="answer-added">You've written an answer!</p>
      </div>
      <div v-else-if="showForm">
        <form class="card" @submit.prevent="onSubmit">
          <div class="card-header px-3">
            Answer the Question
          </div>
          <div class="card-block">
            <textarea 
              v-model="newAnswerBody"
              class="form-control"
              placeholder="Share Your Knowledge!"
              rows="5"
            ></textarea>
          </div>
          <div class="card-footer px-3">
            <button type="submit" class="btn btn-sm btn-success">Submit Your Answer</button>
          </div>
        </form>
        <p v-if="error" class="error mt-2">{{ error }}</p>
      </div>
      <div v-else>
        <button
          class="btn btn-sm btn-success"
          @click="showForm = true"
          >Answer the Question
        </button>
      </div>
      <hr>
    </div>
    <div v-else>
      <h1 class="error text-center">404 - Question Not Found</h1>
    </div>
    <div v-if="question" class="container">
      <AnswerComponent 
        v-for="answer in answers"
        :answer="answer"
        :requestUser="requestUser"
        :key="answer.id"
        @delete-answer="deleteAnswer"
      />
      <div class="my-4">
        <p v-show="loadingAnswers">...loading...</p>
        <button
          v-show="next"
          @click="getQuestionAnswers"
          class="btn btn-sm btn-outline-success"
          >Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";
import QuestionActions from "@/components/QuestionActions.vue";
export default {
  name: "Question",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    AnswerComponent,
    QuestionActions
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
      requestUser: null
    }
  },
  computed: {
    isQuestionAuthor() {
      // return true if the logged in user is also the author of the question instance
      return this.question.author === this.requestUser;
    }
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
    getQuestionData() {
      // get the details of a question instance from the REST API and call setPageTitle
      let endpoint = `/api/questions/${this.slug}/`;
      apiService(endpoint)
        .then(data => {
          if (data) {
            this.question = data;
            this.userHasAnswered = data.user_has_answered;
            this.setPageTitle(data.content)
          } else {
            this.question = null;
            this.setPageTitle("404 - Page Not Found")
          }

        })
    },
    getQuestionAnswers() {
      // get a page of answers for a single question from the REST API's paginated 'Questions Endpoint'
      let endpoint = `/api/questions/${this.slug}/answers/`;
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingAnswers = true;
      apiService(endpoint)
        .then(data => {
          this.answers.push(...data.results);
          this.loadingAnswers = false;
          if (data.next) {
            this.next = data.next;
          } else {
            this.next = null;
          }
        })
    },
    onSubmit() {
      // Tell the REST API to create a new answer for this question based on the user input, then update some data properties
      if (this.newAnswerBody) {
        let endpoint = `/api/questions/${this.slug}/answer/`;
        apiService(endpoint, "POST", { body: this.newAnswerBody })
          .then(data => {
            this.answers.unshift(data)
          })
        this.newAnswerBody = null;
        this.showForm = false;
        this.userHasAnswered = true;
        if (this.error) {
          this.error = null;
        }
      } else {
        this.error = "You can't send an empty answer!";
      }
    },
    async deleteAnswer(answer) {
      // delete a given answer from the answers array and make a delete request to the REST API
      let endpoint = `/api/answers/${answer.id}/`;
      try {
        await apiService(endpoint, "DELETE")
        this.$delete(this.answers, this.answers.indexOf(answer))
        this.userHasAnswered = false;
      }
      catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    this.getQuestionData()
    this.getQuestionAnswers()
    this.setRequestUser()
  }
}
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: #DC3545;
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
