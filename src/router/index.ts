import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Todo from "@/views/Todo.vue";

const routes = [
  { path: "/todo", component: Todo },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
