<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { marked } from "marked";
import type { Note } from "@/api/modules/note";
import { deepClone } from "@/utils/clone";
import { useTheme } from "vuetify";

const props = defineProps<{ note?: Note | null }>();

const emit = defineEmits<{
  (e: "save", note: Note): void;
  (e: "cancel"): void;
}>();

const theme = useTheme();
const darkMode = computed(() => theme.global.name.value === "dark");

const defaultNote: Note = {
  id: Date.now(),
  title: "",
  content: "",
  tags: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const mode = ref<"edit" | "preview">("edit");
const localNote = reactive<Note>(deepClone(props.note ?? defaultNote));

watch(
  () => props.note,
  (newVal) => {
    if (newVal) {
      Object.assign(localNote, deepClone(newVal));
    }
  }
);

const htmlContent = computed(() => marked.parse(localNote.content));

const onSave = () => {
  emit("save", {
    ...localNote,
    updatedAt: Date.now(),
  });
};
</script>

<template>
  <v-card
    flat
    class="w-full p-6 space-y-6 rounded-lg shadow-md bg-white dark:bg-gray-900"
  >
    <v-text-field
      v-model="localNote.title"
      label="標題"
      variant="outlined"
      hide-details
      class="text-lg font-semibold"
      :class="[
        'transition-colors duration-300',
        darkMode ? 'text-gray-200' : 'text-gray-800',
      ]"
    />

    <div class="flex justify-end">
      <v-btn-toggle
        v-model="mode"
        divided
        density="comfortable"
        class="rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm"
      >
        <v-btn
          value="edit"
          :class="[
            'font-medium transition-colors duration-200',
            mode === 'edit'
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400',
          ]"
        >
          編輯
        </v-btn>
        <v-btn
          value="preview"
          :class="[
            'font-medium transition-colors duration-200',
            mode === 'preview'
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400',
          ]"
        >
          預覽
        </v-btn>
      </v-btn-toggle>
    </div>

    <div v-if="mode === 'edit'">
      <v-textarea
        v-model="localNote.content"
        label="內容（Markdown）"
        auto-grow
        rows="10"
        variant="outlined"
        class="note-editor-input rounded-lg"
        :class="darkMode ? 'dark' : ''"
      />
    </div>

    <div
      v-else
      class="max-w-none rounded-lg p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      style="min-height: 240px; overflow-y: auto"
      v-html="htmlContent"
    ></div>

    <v-combobox
      v-model="localNote.tags"
      label="自訂標籤"
      multiple
      chips
      clearable
      hide-details
      variant="outlined"
      class="note-editor-input rounded-lg"
      :class="darkMode ? 'dark' : ''"
    />

    <div class="flex justify-end gap-4 mt-6">
      <v-btn
        variant="text"
        @click="$emit('cancel')"
        class="font-medium text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
      >
        取消
      </v-btn>
      <v-btn color="primary" @click="onSave" class="font-semibold px-6">
        儲存
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
@reference "tailwindcss";

.note-editor-input:not(.dark) {
  @apply bg-white text-gray-900 border-gray-300;
}

.note-editor-input.dark {
  @apply bg-gray-800 text-gray-100 border-gray-700;
}
</style>
