import { defineStore } from "pinia";

// 此函數接收兩個參數
// 第一個參數是唯一名稱
// 第二個參數傳遞一個物件選項，將在其中定義狀態獲取器和操作
// 或者我們也可以傳遞一個定義反應式屬性和方法的函數
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      {
        id: 1,
        name: "First task",
        is_completed: false,
      },
      {
        id: 2,
        name: "Second task",
        is_completed: true,
      },
    ],
    task: {
      id: 1,
      name: "First task",
      is_completed: false,
    },
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.is_completed),
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.is_completed);
    },
  },
});