import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes"

export default createRouter({
  // routes: routes,
  // 也可簡化成
  routes,
  history: createWebHistory()
});