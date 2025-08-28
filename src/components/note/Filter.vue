<script setup lang="ts">
import { ref } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const emit = defineEmits<{
  (
    e: "search",
    payload: {
      keyword: string;
      fromCreated: string | null;
      toCreated: string | null;
      fromUpdated: string | null;
      toUpdated: string | null;
    }
  ): void;
}>();

const keyword = ref("");
const fromCreated = ref<string | null>(null);
const toCreated = ref<string | null>(null);
const fromUpdated = ref<string | null>(null);
const toUpdated = ref<string | null>(null);

const onSearch = () => {
  emit("search", {
    keyword: keyword.value,
    fromCreated: fromCreated.value,
    toCreated: toCreated.value,
    fromUpdated: fromUpdated.value,
    toUpdated: toUpdated.value,
  });
};
</script>

<template>
  <v-card flat class="p-4 space-y-4">
    <v-text-field
      v-model="keyword"
      label="搜尋筆記內容 / 標題 / 標籤"
      prepend-inner-icon="mdi-magnify"
      clearable
      density="comfortable"
      hide-details
      variant="outlined"
    />

    <div class="grid md:grid-cols-2 gap-4">
      <v-date-input
        v-model="fromCreated"
        label="建立時間 起"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details
      />
      <v-date-input
        v-model="toCreated"
        label="建立時間 訖"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details
      />
      <v-date-input
        v-model="fromUpdated"
        label="更新時間 起"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details
      />
      <v-date-input
        v-model="toUpdated"
        label="更新時間 訖"
        density="comfortable"
        variant="outlined"
        clearable
        hide-details
      />
    </div>

    <div class="flex justify-end">
      <v-btn color="primary" @click="onSearch" prepend-icon="mdi-magnify">
        搜尋
      </v-btn>
    </div>
  </v-card>
</template>
