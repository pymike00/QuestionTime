import Vue from "vue";
import Router from "vue-router";
import AnswerEditor from "./views/AnswerEditor.vue";
import Home from "./views/Home.vue";
import Question from "./views/Question.vue";
import QuestionEditor from "./views/QuestionEditor.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      // with props: true, the slug parameter gets passed as a prop to the component
      path: "/question/:slug",
      name: "question",
      component: Question,
      props: true
    },
    {
      path: "/ask",
      name: "question-editor",
      component: QuestionEditor
    },
    {
      path: "/answer/:id",
      name: "answer-editor",
      component: AnswerEditor,
      props: true
    },   
  ]
});
