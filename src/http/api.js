import axios from "axios";

const api = axios.create({
  // 設定 RESTful API 的基本 URL
  baseURL: "http://localhost:8000/api/v1"
})

// 匯出 axios
export default api