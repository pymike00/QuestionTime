import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/question/:slug",
      name: "question",
      // route level code-splitting
      // this generates a separate chunk (QuestionView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/QuestionView.vue"),
      props: true,
    },
    {
      // the ? sign makes the slug parameter optional
      path: "/ask/:slug?",
      name: "question-editor",
      component: () => import("../views/QuestionEditor.vue"),
      props: true,
    },
    {
      path: "/:catchAll(.*)",
      name: "page-not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ]
})

export default router
