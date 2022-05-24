import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/question/:slug",
    name: "question",
    component: () =>
      import(
        /* webpackChunkName: "question-page" */ "../views/QuestionView.vue"
      ),
    props: true,
  },
  {
    // the ? sign makes the slug parameter optional
    path: "/ask/:slug?",
    name: "question-editor",
    component: () =>
      import(
        /* webpackChunkName: "question-editor" */ "../views/QuestionEditor.vue"
      ),
    props: true,
  },
  {
    path: "/answer/:uuid",
    name: "answer-editor",
    component: () =>
      import(
        /* webpackChunkName: "answer-editor" */ "../views/AnswerEditor.vue"
      ),
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "page-not-found",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
