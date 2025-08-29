<script lang="ts" setup>
import { useFetch } from "@/api/core";
import {
  addNote,
  getNoteById,
  updateNote,
  type Note,
} from "@/api/modules/note";
import NoteEditor from "@/components/note/Editor.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const id = computed(() => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  return id && Number(id);
});

const { data: note } = useFetch(
  () => (id.value ? getNoteById(Number(id.value)) : Promise.resolve(null)),
  { watch: [id] }
);

const isSavedDialogOpen = ref(false);

const onSave = async (noteData: Pick<Note, "title" | "content" | "tags">) => {
  const isEdit = !!id.value;
  if (isEdit) {
    await updateNote(id.value, noteData);
  } else {
    const note = await addNote(noteData);
    router.push(`/note/${note.id}/edit`);
  }
  isSavedDialogOpen.value = true;
};

const goBackToList = () => {
  router.push("/note");
};
</script>

<template>
  <NoteEditor :note="note" @cancel="goBackToList" @save="onSave" />

  <v-dialog v-model="isSavedDialogOpen" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h6 text-center">儲存成功</v-card-title>
      <v-card-text>是否要繼續編輯？</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="isSavedDialogOpen = false"
          >繼續編輯</v-btn
        >
        <v-btn color="primary" @click="goBackToList">回到列表</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
