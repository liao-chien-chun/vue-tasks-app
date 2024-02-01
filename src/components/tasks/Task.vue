<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        :class="completedClass"
        type="checkbox"
        :checked="task.is_completed"
      />
      <div
        class="ms-2 flex-grow-1"
        :class="completedClass"
        title="Double click the text to edit or remove"
        @dblclick="$event => isEdit = true"
      >
        <div class="relative" v-if="isEdit">
          <input class="editable-task" type="text" @keyup.esc="$event => isEdit = false" v-focus/>
        </div>
        <span v-else="">{{ task.name }}</span>
      </div>
      <!-- <div class="task-date">24 Feb 12:00</div> -->
    </div>
    <TaskActions @edit="($event) => (isEdit = true)" v-show="!isEdit" />
  </li>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskActions from "./TaskActions.vue";

const props = defineProps({
  task: Object,
});

// 定義反應變數
const isEdit = ref(false);

// 邏輯作為計算屬性放在腳本
const completedClass = computed(() =>
  props.task.is_completed ? "completed" : ""
);

const vFocus = {
  mounted: (el) => el.focus()
}
</script>
