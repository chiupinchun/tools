import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import { useUserStore } from "@/stores/user";
import Signup from "@/views/Signup.vue";

const routes = [
  { path: "/signup", component: Signup },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  if (!userStore.isLogin && to.path !== "/signup") {
    return "/signup";
  }
});

export { router };
