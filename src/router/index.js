import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes"

const router =  createRouter({
  // routes: routes,
  // 也可簡化成
  routes,
  history: createWebHistory(),
  // linkActiveClass: 'active'
});

// 全域
// to  目標位置, from 當前位置
router.beforeEach((to, from) => {
  console.log("Global before each", to, from)
  // return false
  if (to.path === '/tasks') {
    return { name: "login" };
  }  
})


export default router