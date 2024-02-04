import axios from "axios";

axios.default.withCredentials = true

const api = axios.create({
  // 設定 RESTful API 的基本 URL
  baseURL: import.meta.env.VITE_BASE_URL
});

// 匯出 axios
export default api