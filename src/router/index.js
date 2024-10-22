import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
// import CategoryView from "@/views/CategoryView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:slug",
    name: "category",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CategoryView.vue"),
  },
  {
    path: "/:categorySlug/:productTitle",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetailView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CartView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUpView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "router-link",
});

export default router;
