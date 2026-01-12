<script setup lang="ts">
import type { BaseSortCondition } from "@/types/api";

const sort = defineModel<BaseSortCondition>("sort", {
  required: true,
});
const gridCols = defineModel<number>("grid-cols", { required: true });

const emit = defineEmits<{
  (e: "create"): void;
}>();

const sortOptions: {
  label: string;
  value: BaseSortCondition;
}[] = [
  {
    label: "建立時間（新 → 舊）",
    value: { field: "createdAt", order: "desc" },
  },
  { label: "建立時間（舊 → 新）", value: { field: "createdAt", order: "asc" } },
  {
    label: "更新時間（新 → 舊）",
    value: { field: "updatedAt", order: "desc" },
  },
  { label: "更新時間（舊 → 新）", value: { field: "updatedAt", order: "asc" } },
];
</script>

<template>
  <v-card flat class="p-4 space-y-4">
    <div
      class="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4"
    >
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        class="w-full md:w-auto"
        @click="emit('create')"
      >
        新增筆記
      </v-btn>

      <div
        class="flex flex-col md:flex-row items-stretch md:items-center gap-4 flex-wrap md:justify-end"
      >
        <v-select
          v-model="sort"
          :items="sortOptions"
          item-title="label"
          item-value="value"
          label="排序"
          density="compact"
          hide-details
          variant="outlined"
          class="w-full md:w-56"
        />

        <v-btn-toggle
          v-model="gridCols"
          density="compact"
          class="w-full md:w-auto space-x-2 max-sm:hidden"
        >
          <v-btn :value="1" icon rounded
            ><v-icon>mdi-view-agenda</v-icon></v-btn
          >
          <v-btn :value="2" icon rounded
            ><v-icon>mdi-view-grid-outline</v-icon></v-btn
          >
          <v-btn :value="4" icon rounded><v-icon>mdi-view-grid</v-icon></v-btn>
        </v-btn-toggle>
      </div>
    </div>
  </v-card>
</template>
