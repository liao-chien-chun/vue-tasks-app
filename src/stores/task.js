import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks } from "../http/task-api";




const tmp = {
  state: () => ({
  }),

  getters: {
  },

  actions: {
    
  },
};

// 此函數接收兩個參數
// 第一個參數是唯一名稱
// 第二個參數傳遞一個物件選項，將在其中定義狀態獲取器和操作
// 或者我們也可以傳遞一個定義反應式屬性和方法的函數
export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([])

  const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed))
  const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed));

  const fetchAllTasks = async() =>  {
      const { data } = await allTasks();
      tasks.value = data.data;
  }

  // return object  include we want public property and method
  return {
    tasks, completedTasks, uncompletedTasks, fetchAllTasks
  }
});