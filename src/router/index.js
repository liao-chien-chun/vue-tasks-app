import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes"
import { useAuthStore } from "../stores/auth";

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
  const store = useAuthStore()

  if (to.meta.auth && !store.isLoggedIn) {
    return { 
      name: "login",
      // 查看重定向位置
      query: {
        redirect: to.fullPath
      }
    };
  }  
})


export default router