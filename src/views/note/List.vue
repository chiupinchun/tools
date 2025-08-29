<script lang="ts" setup>
import { useFetch } from "@/api/core";
import { getNotes, type GetNotesPayload, type Note } from "@/api/modules/note";
import { useRouter } from "vue-router";
import PreviewNote from "@/components/note/PreviewNote.vue";
import NoteFilter from "@/components/note/Filter.vue";
import Toolbar from "@/components/note/Toolbar.vue";
import { computed, ref } from "vue";
import type { BaseSortCondition } from "@/types/api";

const router = useRouter();

const getNotesPayload = ref<Partial<GetNotesPayload>>({});

const { data: notes } = useFetch(() => getNotes(getNotesPayload.value), {
  defaultValue: [],
  watch: [getNotesPayload],
});

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
</script>

<template>
  <div class="p-4 space-y-4">
    <NoteFilter @search="(paylaod) => (getNotesPayload = paylaod)" />

    <Toolbar
      v-model:sort="displayConfig.sort"
      v-model:grid-cols="displayConfig.gridCols"
      @create="goToCreate"
    />

    <div class="space-y-4">
      <PreviewNote
        v-for="note in displayedNotes"
        :key="note.id"
        :note="note"
        class="cursor-pointer"
        @click="goToEdit(note)"
      />
    </div>
  </div>
</template>
