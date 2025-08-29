<script setup lang="ts">
import type { GetNotesPayload } from "@/api/modules/note";
import { deepClone } from "@/utils/clone";
import { ref } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const emit = defineEmits<{
  (e: "search", payload: GetNotesPayload): void;
}>();

const getDefaultForm = (): GetNotesPayload => ({
  keyword: "",
  fromCreated: null,
  toCreated: null,
  fromUpdated: null,
  toUpdated: null,
});

const searchForm = ref<GetNotesPayload>(getDefaultForm());

const resetForm = () => {
  searchForm.value = getDefaultForm();
};

const onSearch = () => {
  emit("search", deepClone(searchForm.value));
};
</script>

<template>
  <v-card flat class="p-4 space-y-4">
    <v-text-field
      v-model="searchForm.keyword"
      label="搜尋筆記內容 / 標題 / 標籤"
      prepend-inner-icon="mdi-magnify"
      clearable
      density="comfortable"
      hide-details
      variant="outlined"
    />

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-grow grid md:grid-cols-2 gap-4">
        <v-date-input
          v-model="searchForm.fromCreated"
          label="建立時間 起"
          density="comfortable"
          variant="outlined"
          clearable
          hide-details
        />
        <v-date-input
          v-model="searchForm.toCreated"
          label="建立時間 訖"
          density="comfortable"
          variant="outlined"
          clearable
          hide-details
        />
        <v-date-input
          v-model="searchForm.fromUpdated"
          label="更新時間 起"
          density="comfortable"
          variant="outlined"
          clearable
          hide-details
        />
        <v-date-input
          v-model="searchForm.toUpdated"
          label="更新時間 訖"
          density="comfortable"
          variant="outlined"
          clearable
          hide-details
        />
      </div>

      <div
        class="flex-grow flex flex-col md:flex-row md:justify-end md:items-end gap-4"
      >
        <v-btn
          color="warning"
          @click="resetForm"
          prepend-icon="mdi-close-circle"
          class="w-full md:w-[unset]"
          variant="outlined"
        >
          清除
        </v-btn>

        <v-btn
          color="primary"
          @click="onSearch"
          prepend-icon="mdi-magnify"
          class="w-full md:w-[unset]"
        >
          搜尋
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
