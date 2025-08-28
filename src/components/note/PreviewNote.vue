<script lang="ts" setup>
import type { Note } from "@/api/modules/note";

interface Props {
  note: Note;
}
defineProps<Props>();
</script>

<template>
  <div
    class="border rounded-lg p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition"
  >
    <div class="flex justify-between items-start mb-2">
      <h2 class="text-lg font-semibold line-clamp-1">{{ note.title }}</h2>
      <span class="text-xs text-gray-500">{{
        new Date(note.createdAt).toLocaleDateString()
      }}</span>
    </div>

    <div class="flex flex-wrap gap-2 mb-3">
      <v-chip
        v-for="tag in note.tags"
        :key="tag"
        size="small"
        color="primary"
        variant="outlined"
        class="text-sm"
      >
        {{ tag }}
      </v-chip>
    </div>

    <div
      class="text-sm text-gray-700 dark:text-gray-300 overflow-hidden max-h-24 whitespace-pre-line"
      style="
        mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
      "
    >
      {{ note.content }}
    </div>
  </div>
</template>

<style scoped></style>
