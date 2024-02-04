<template>
  <div class="relative">
    <input
      type="text"
      class="form-control form-control-lg padding-right-lg"
      placeholder="+ Add new task. Press enter to save."
      @keydown.enter="addNewTask"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useTaskStore } from "../../stores/task";

// 實例化商店
const store = useTaskStore()
// 從商店中解構
const { handleAddedTask } = store


  // 使用反應函數
  const newTask = reactive({
    name: '',
    is_completed: false
  })


  const addNewTask = async(event) => {
    if (event.target.value.trim()) {
      newTask.name = event.target.value
      event.target.value = ''
      await handleAddedTask(newTask)
    }
  }
</script>