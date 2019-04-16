import Vue from "vue";
import Router from "vue-router";
import AnswerEditor from "./views/AnswerEditor.vue";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
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
      // the ? sign makes the slug parameter optional
      path: "/ask/:slug?",
      name: "question-editor",
      component: QuestionEditor,
      props: true
    },
    {
      path: "/answer/:id",
      name: "answer-editor",
      component: AnswerEditor,
      props: true
    },
    {
      path: "*",
      name: "page-not-found",
      component: NotFound
    }
  ]
});
