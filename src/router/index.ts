import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Todo from "@/views/Todo.vue";
import NoteList from "@/views/note/List.vue";
import NoteEdit from "@/views/note/Edit.vue";
import Setting from "@/views/Setting.vue";

const routes = [
  { path: "/todo", component: Todo },
  { path: "/note", component: NoteList },
  { path: "/note/create", component: NoteEdit },
  { path: "/note/:id/edit", component: NoteEdit },
  { path: "/setting", component: Setting },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
