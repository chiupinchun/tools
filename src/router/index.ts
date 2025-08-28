import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Todo from "@/views/Todo.vue";
import NoteEdit from "@/views/note/Edit.vue";

const routes = [
  { path: "/todo", component: Todo },
  { path: "/note", component: NoteEdit },
  { path: "/note/edit", component: NoteEdit },
  { path: "/note/:id/edit", component: NoteEdit },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
