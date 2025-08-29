<script lang="ts" setup>
import { useFetch } from "@/api/core";
import { getNotes, type GetNotesPayload, type Note } from "@/api/modules/note";
import { useRouter } from "vue-router";
import PreviewNote from "@/components/note/PreviewNote.vue";
import NoteFilter from "@/components/note/Filter.vue";
import { ref } from "vue";

const router = useRouter();

const getNotesPayload = ref<Partial<GetNotesPayload>>({});

const { data: notes } = useFetch(() => getNotes(getNotesPayload.value), {
  defaultValue: [],
  watch: [getNotesPayload],
});

const goToEdit = (note: Note) => {
  router.push(`/note/${note.id}/edit`);
};
</script>

<template>
  <div class="p-4">
    <NoteFilter
      class="mb-4"
      @search="(paylaod) => (getNotesPayload = paylaod)"
    />

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
