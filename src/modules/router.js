import Vue from "vue";
import VueRouter from "vue-router";
import { getCurrentUser } from "./firebase";

import About from "../views/About.vue";
import Index from "../views/Index.vue";
import Login from "../views/auth/Login.vue";

Vue.use(VueRouter);

const routeNames = {
  about: "about",
  index: "index",
  login: "login",
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: routeNames.index,
      component: Index,
    },
    {
      path: "/login",
      name: routeNames.login,
      component: Login,
      meta: { anonymous: true },
    },
    {
      path: "/about",
      name: routeNames.about,
      component: About,
      meta: { anonymous: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let ok = await checkAuth(to);

  if (ok) {
    next();
  } else {
    console.log("User not logged in, redirecting to login page");
    next({ name: routeNames.login });
  }
});

async function checkAuth(to) {
  let allowAnonymous = to.matched.some((record) => record.meta.anonymous);

  let ok = allowAnonymous || (await getCurrentUser()) != null;

  return ok;
}

export { router, routeNames };
