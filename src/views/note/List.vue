<script lang="ts" setup>
import { useFetch } from "@/api/core";
import {
  deleteNote,
  getNotes,
  type GetNotesPayload,
  type Note,
} from "@/api/modules/note";
import { useRouter } from "vue-router";
import PreviewNote from "@/components/note/PreviewNote.vue";
import NoteFilter from "@/components/note/Filter.vue";
import Toolbar from "@/components/note/Toolbar.vue";
import { computed, ref } from "vue";
import type { BaseSortCondition } from "@/types/api";

const router = useRouter();

const getNotesPayload = ref<Partial<GetNotesPayload>>({});

const { data: notes, refresh } = useFetch(
  () => getNotes(getNotesPayload.value),
  {
    defaultValue: [],
    watch: [getNotesPayload],
  }
);

const displayConfig = ref<{
  sort: BaseSortCondition;
  gridCols: number;
}>({
  sort: { field: "updatedAt", order: "desc" },
  gridCols: 2,
});

const displayedNotes = computed(() => {
  const { field, order } = displayConfig.value.sort;
  const direction = order === "asc" ? 1 : -1;
  return notes.value.sort((prev, next) => {
    return (+new Date(prev[field]) - +new Date(next[field])) * direction;
  });
});

const goToCreate = () => {
  router.push("/note/create");
};

const goToEdit = (note: Note) => {
  router.push(`/note/${note.id}/edit`);
};

const noteToDelete = ref<Note | null>(null);
const isDeleteNoteModalShow = computed({
  get: () => !!noteToDelete.value,
  set: (value: boolean) => {
    if (!value) {
      noteToDelete.value = null;
    }
  },
});

const onDelete = () => {
  if (noteToDelete.value) {
    deleteNote(noteToDelete.value.id);
  }

  isDeleteNoteModalShow.value = false;
  refresh();
};
</script>

<template>
  <div class="p-4 space-y-4">
    <NoteFilter @search="(paylaod) => (getNotesPayload = paylaod)" />

    <Toolbar
      v-model:sort="displayConfig.sort"
      v-model:grid-cols="displayConfig.gridCols"
      @create="goToCreate"
    />

    <div
      :class="`grid gap-4 max-sm:grid-cols-1`"
      :style="{
        gridTemplateColumns: `repeat(${displayConfig.gridCols}, minmax(0, 1fr))`,
      }"
    >
      <PreviewNote
        v-for="note in displayedNotes"
        :key="note.id"
        :note="note"
        class="cursor-pointer"
        @click="goToEdit(note)"
        @delete="noteToDelete = note"
      />
    </div>
  </div>

  <v-dialog v-model="isDeleteNoteModalShow" max-width="400">
    <v-card>
      <v-card-title> 確定要刪除嗎？ </v-card-title>
      <v-card-text> 刪除後將無法復原。 </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="isDeleteNoteModalShow = false"
          >取消</v-btn
        >
        <v-btn color="red" @click="onDelete">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
