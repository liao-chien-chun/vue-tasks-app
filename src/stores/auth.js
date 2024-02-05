import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";


// 第一個參數指定商店名稱
export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref({}) // v-if="errors.email"

  // 定義計算或 getter
  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;  
    } catch (error) {
      user.value = null
    }
  };

  const handleLogin = async (credentials) => {
    // 初始化程式應用的 csrf 保護
    await csrfCookie();
    try {
      await login(credentials);
      await fetchUser();
      errors.value = {}
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  };

  const handleRegister = async (newUser) => {
    try {
      await register(newUser);
      await handleLogin({
        email: newUser.email,
        password: newUser.password,
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  // 指定我們要公開的狀態取的器和操作
  return {
    user,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}); 