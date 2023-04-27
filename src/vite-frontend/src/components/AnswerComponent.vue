<template>
  <div class="single-answer">
    <p class="text-muted">
      <strong>{{ answer.author }}</strong> &#8901; {{ answer.created_at }}
    </p>

    <div class="mb-2">
      <textarea v-if="editingAnswer" v-model="answer.body" class="form-control" rows="6"></textarea>
      <p v-else style="white-space: pre-wrap;">{{ answer.body }}</p>
      <p v-if="error" class="fw-bold text-danger mt-2">{{ error }}</p>
    </div>

    <div v-if="isAnswerAuthor">
      <button v-if="editingAnswer" class="btn btn-sm btn-warning" @click="updateAnswer">Edit</button>
      <button v-else class="btn btn-sm btn-warning" @click="editingAnswer = true">Edit</button>

      <button class="btn btn-sm btn-danger mx-1" @click="showDeleteConfirmationBtn = !showDeleteConfirmationBtn">
        Delete
      </button>
      <button v-show="showDeleteConfirmationBtn" class="btn btn-sm btn-outline-danger" @click="triggerDeleteAnswer">
        Yes, delete my answer!
      </button>
    </div>
    <div v-else>
      <button type="button" class="btn btn-sm" @click="toggleLike" :class="{
          'btn-warning': userLikedAnswer,
          'btn-outline-danger': !userLikedAnswer,
        }">
        Like Answer&nbsp;
        <span class="badge bg-danger">{{ likesCounter }}</span>
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
import { endpoints } from "@/common/endpoints.js";

export default {
  name: "AnswerComponent",
  props: {
    answer: {
      type: Object,
      required: true,
    },
    requestUser: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDeleteConfirmationBtn: false,
      editingAnswer: false,
      userLikedAnswer: this.answer.user_has_liked_answer,
      likesCounter: this.answer.likes_count,
      error: null
    };
  },
  computed: {
    isAnswerAuthor() {
      // return true if the logged in user is also the author of the answer instance
      return this.answer.author === this.requestUser;
    },
  },
  methods: {
    async updateAnswer() {
      if (!this.answer.body) {
        this.error = "You can't submit an empty answer!";
        return;
      }
      const endpoint = `${endpoints["answersDetail"]}${this.answer.uuid}/`;
      try {
        await axios.put(endpoint, { body: this.answer.body });
        this.editingAnswer = false;
        if (this.error) {
          this.error = null;
        }
      } catch (error) {
        console.log(error.response);
        this.error = error.response.statusText;    
      }
    },
    toggleLike() {
      this.userLikedAnswer === false ? this.likeAnswer() : this.unLikeAnswer();
    },
    async likeAnswer() {
      this.userLikedAnswer = true;
      this.likesCounter += 1;
      const endpoint = `${endpoints["answersLike"]}${this.answer.uuid}/`;
      try {
        await axios.post(endpoint);
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    async unLikeAnswer() {
      this.userLikedAnswer = false;
      this.likesCounter -= 1;
      const endpoint = `${endpoints["answersLike"]}${this.answer.uuid}/`;
      try {
        await axios.delete(endpoint);
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    triggerDeleteAnswer() {
      // emit an event to delete an answer instance
      this.$emit("delete-answer", this.answer);
    },
  },
};
</script>

