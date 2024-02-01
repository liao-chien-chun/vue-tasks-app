<template>
  <main style="min-height: 50vh; margin-top: 2rem;">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAddedTask"/>

          <!-- List of uncompleted tasks -->
          <Tasks :tasks="uncompletedTasks" />

          <!--- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <button class="btn btn-sm btn-secondary" 
              @click="$event => showCompletedTasks = !showCompletedTasks">
              <span v-if="!showCompletedTasks">Show Completed</span>
              <span v-else>Hide Completed</span>
            </button>
          </div>

          <!-- list of completed tasks -->
          <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  // 匯入 hook
  import { onMounted, ref, computed } from "vue";
  import { allTasks, createTask } from "../http/task-api";
  import Tasks from "../components/tasks/Tasks.vue"
  import NewTask from "../components/tasks/NewTask.vue"

  // 建立一個保存任務的變數
  const tasks = ref([])

  // 呼叫
  onMounted(async () => {
    // 對 API 回應中的資料進行解構
    const { data } = await allTasks()
    // 任務變數是反應性物件
    tasks.value = data.data
  })

  // 定義兩個計算屬性 computed
  // 完成的任務回傳回 false
  const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))
  const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))
  const showToggleCompletedBtn = computed(
    () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
  )

  const completedTasksIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
  )

  const showCompletedTasks = ref(false)

  const handleAddedTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask)
    tasks.value.unshift(createdTask.data)
  }
</script>