<template>
  <main style="min-height: 50vh; margin-top: 2rem;">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask />

          <!-- List of uncompleted tasks -->
          <Tasks 
            :tasks="uncompletedTasks" 
          />

          <!--- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <button class="btn btn-sm btn-secondary" 
              @click="$event => showCompletedTasks = !showCompletedTasks">
              <span v-if="!showCompletedTasks">Show Completed</span>
              <span v-else>Hide Completed</span>
            </button>
          </div>

          <!-- list of completed tasks -->
          <Tasks 
            :tasks="completedTasks" 
            :show="completedTasksIsVisible && showCompletedTasks"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  // 匯入 hook
  import { onMounted, ref, computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useTaskStore } from "../stores/task";
  import Tasks from "../components/tasks/Tasks.vue"
  import NewTask from "../components/tasks/NewTask.vue"

  const store = useTaskStore()
  const { completedTasks, uncompletedTasks } = storeToRefs(store)
  const { fetchAllTasks, handleAddedTask } = store

  // 呼叫，鉤子
  onMounted(async () => {
    await fetchAllTasks()
  })

  // 定義兩個計算屬性 computed
  // 完成的任務回傳回 false
  const showToggleCompletedBtn = computed(
    () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
  )

  const completedTasksIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
  )

  const showCompletedTasks = ref(false)

</script>