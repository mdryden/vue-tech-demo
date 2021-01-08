import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../../views/Index.vue";
import Login from "../../views/auth/Login.vue";

Vue.use(VueRouter);

const routeNames = {
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
  ],
});

router.beforeEach(async (to, from, next) => {
  checkAuth(to, next);
});

async function checkAuth(to, next) {
  let allowAnonymous = to.matched.some((record) => record.meta.anonymous);

  let ok = allowAnonymous || false; // TODO: check if user is logged in
  if (!ok) {
    console.log("User not logged in, redirecting to login page");
    next({ name: routeNames.login });
  }

  return ok;
}

export { router, routeNames };
