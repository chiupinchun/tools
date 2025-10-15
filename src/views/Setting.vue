<script lang="ts" setup>
import { useSettingStore } from "@/stores/setting";
import { download } from "@/utils/file";

const setting = useSettingStore();

const pageOptions = ["todo", "note", "setting"];

const shortcutCols = [
  { action: "goTodo", label: "前往待辦清單" },
  { action: "goNote", label: "前往筆記頁" },
  { action: "goSetting", label: "前往設定頁" },
] as const;

function exportData() {
  const settings = JSON.stringify(setting.$state);
  const blob = new Blob([settings], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  download(url, "settings-backup.json");
  URL.revokeObjectURL(url);
}

function importData(fileList: File[]) {
  const file = fileList[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = e.target?.result as string;
      const parsed = JSON.parse(result);
      setting.$patch(parsed);
      alert("匯入成功，設定已更新。");
    } catch (err) {
      alert("匯入失敗：JSON 格式錯誤");
    }
  };
  reader.readAsText(file);
}
</script>

<template>
  <v-container class="py-8 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">設定</h1>

    <v-card class="mb-6 p-4">
      <h2 class="text-lg font-semibold mb-4">預設首頁</h2>
      <v-select v-model="setting.defaultHome" :items="pageOptions" label="選擇進入網站時的預設頁面" variant="outlined" />
    </v-card>

    <v-card class="mb-6 p-4">
      <h2 class="text-lg font-semibold mb-4">下班時間</h2>
      <v-time-picker v-model="setting.offWorkTime" format="24hr" scrollable full-width />
    </v-card>

    <v-card class="mb-6 p-4">
      <h2 class="text-lg font-semibold mb-4">資料備份</h2>
      <div class="flex flex-col sm:flex-row gap-4">
        <v-btn @click="exportData" color="primary">匯出資料</v-btn>
        <v-file-input accept=".json" label="匯入 JSON 資料" @change="importData" variant="outlined" />
      </div>
    </v-card>

    <v-card class="mb-6 p-4">
      <h2 class="text-lg font-semibold mb-4">快捷鍵設定</h2>
      <div class="space-y-4">
        <div v-for="col in shortcutCols" :key="col.action"
          class="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-gray-50 p-4 rounded border">
          <div class="text-sm text-gray-600 font-medium">
            {{ col.label }}
          </div>
          <div class="col-span-2">
            <v-text-field v-model="setting.shortcuts[col.action]" :placeholder="`例如 Alt+${col.action
        .replace(/^go/, '')[0]
        .toLowerCase()}`" density="comfortable" variant="outlined" hide-details class="w-full" />
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
