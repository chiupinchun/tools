<script lang="ts" setup>
import { useFetch } from "@/api/core";
import { getNotes, type Note } from "@/api/modules/note";
import { useRouter } from "vue-router";
import PreviewNote from "@/components/note/PreviewNote.vue";
import NoteFilter from "@/components/note/Filter.vue";

const router = useRouter();
const { data: notes } = useFetch(getNotes, { defaultValue: [] });

const goToEdit = (note: Note) => {
  router.push(`/note/${note.id}/edit`);
};
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <NoteFilter />
    </div>

    <div class="space-y-4">
      <PreviewNote
        v-for="note in notes"
        :key="note.id"
        :note="note"
        class="cursor-pointer"
        @click="goToEdit(note)"
      />
    </div>
  </div>
</template>
