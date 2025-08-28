<template>
  <v-card
    class="transition duration-200 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
    elevation="1"
  >
    <v-card-title class="flex justify-between items-center">
      <span class="font-semibold">
        <v-chip :color="priorityColor" size="small" label>
          {{ todo.priority }}
        </v-chip>
        {{ todo.title }}
      </span>

      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-dots-vertical"
            size="x-small"
            variant="text"
          />
        </template>
        <v-list :min-width="120">
          <v-list-item @click="$emit('edit', todo)">
            <v-list-item-title>編輯</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('delete', todo.id)">
            <v-list-item-title class="text-red-500">刪除</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-text class="text-sm text-gray-600 dark:text-gray-300">
      <p v-if="todo.description" class="whitespace-break-spaces">
        {{ todo.description }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Todo } from "@/api/modules/todo";
import { computed } from "vue";

const props = defineProps<{
  todo: Todo;
}>();

const priorityColor = computed(() => {
  switch (props.todo.priority) {
    case "緊急":
      return "red";
    case "優先":
      return "orange";
    default:
      return "grey";
  }
});
</script>
