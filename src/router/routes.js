import TasksPage from "../pages/TasksPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";

const routes = [
  {
    // 定義路徑
    path: "/tasks",
    // 與元件映射
    component: TasksPage,
    // 也可以使用 name 屬性來命名該路線
    name: "tasks",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
  },
];

// 導出他讓其他文件可用
export default routes