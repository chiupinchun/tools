<!-- components/BaseHeader.vue -->
<template>
  <v-app-bar
    app
    flat
    class="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800"
    height="64"
  >
    <v-container class="d-flex align-center justify-space-between">
      <!-- 左側 Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition"
      >
        Hato工具包
      </RouterLink>

      <!-- 導覽列（大螢幕顯示） -->
      <div class="d-none d-sm-flex items-center space-x-6">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-gray-700 dark:text-gray-300 hover:text-primary transition"
          active-class="text-primary font-bold"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <!-- 功能區域（右側） -->
      <div class="d-flex align-center space-x-1">
        <!-- 主題切換按鈕 -->
        <v-btn icon variant="text" @click="toggleTheme">
          <v-icon>{{ themeIcon }}</v-icon>
        </v-btn>

        <!-- 行動裝置選單按鈕 -->
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon class="d-sm-none">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              link
              :active="route.path === item.to"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useTheme } from "vuetify";

const route = useRoute();
const theme = useTheme();

// 導覽列項目（未來可擴充）
const navItems = [
  { to: "/todo", label: "待辦清單" },
  { to: "/note", label: "筆記" },
];

// 切換深淺色主題
const toggleTheme = () => {
  theme.change(theme.global.name.value === "light" ? "dark" : "light");
};

const themeIcon = computed(() =>
  theme.global.name.value === "light"
    ? "mdi-weather-night"
    : "mdi-white-balance-sunny"
);
</script>

<style scoped></style>
