<script setup lang="ts">
import draggable from "vuedraggable";
import {
  type Todo,
  type TodoStatus,
  type GroupedTodos,
} from "@/api/modules/todo";

const statusList: TodoStatus[] = ["new", "doing", "done"];

interface Props {
  data: GroupedTodos;
}
defineProps<Props>();

interface Emits {
  (event: "add", status: TodoStatus): void;
  (event: "clear-done"): void;
  (event: "drag-end"): void;
}
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div
      v-for="status in statusList"
      :key="status"
      class="bg-gray-100 dark:bg-neutral-800 p-4 rounded shadow-sm"
    >
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold flex items-center gap-2 capitalize">
          {{ status }}
        </h2>

        <v-btn
          v-if="status !== 'done'"
          prepend-icon="mdi-plus"
          color="primary"
          variant="flat"
          size="small"
          class="text-white text-xs"
          @click="emit('add', status)"
        >
          新增任務
        </v-btn>

        <v-btn
          v-if="status === 'done' && data.done.length > 0"
          prepend-icon="mdi-delete"
          size="small"
          @click="emit('clear-done')"
          color="red"
          variant="flat"
          class="text-white"
        >
          清除全部
        </v-btn>
      </div>

      <draggable
        :list="data[status]"
        group="tasks"
        itemKey="id"
        @end="emit('drag-end')"
        class="space-y-2"
      >
        <template #item="{ element }">
          <div class="cursor-pointer">
            <slot name="item" :todo-item="element as Todo" />
          </div>
        </template>
      </draggable>

      <div
        v-if="data[status].length === 0"
        class="text-gray-400 text-sm italic py-4 text-center"
      >
        無任務
      </div>
    </div>
  </div>
</template>
