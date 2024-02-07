import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  // 設定 RESTful API 的基本 URL
  baseURL: import.meta.env.VITE_BASE_URL,
  // withXSRFToken: true,
  withCredentials: true // 確保攜帶 Cookies
});

// 請求攔截器
api.interceptors.request.use((config) => {
  // 嘗試從 Cookies 中獲取 CSRF Token 值
  const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  
  // 如果 CSRF Token 存在，則添加到請求頭中
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 匯出 axios
export default api