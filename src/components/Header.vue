<template>
  <v-app-bar app flat
    class="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800" height="64">
    <v-container class="d-flex align-center justify-space-between">
      <RouterLink to="/"
        class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition">
        Hato工具包
      </RouterLink>

      <div v-if="offWorkCountdown">下班倒數：{{ offWorkCountdown }}</div>

      <div class="flex gap-10">
        <div class="d-none d-sm-flex items-center space-x-6">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
            class="text-gray-700 dark:text-gray-300 hover:text-primary transition"
            active-class="text-primary font-bold">
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="d-flex align-center space-x-1">
          <v-btn icon variant="text" @click="toggleTheme">
            <v-icon>{{ themeIcon }}</v-icon>
          </v-btn>

          <v-menu location="bottom end">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon class="d-sm-none">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="item in navItems" :key="item.to" :to="item.to" link :active="route.path === item.to">
                <v-list-item-title>{{ item.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref, onBeforeUnmount } from "vue";
import { useTheme } from "vuetify";
import { useSettingStore } from "@/stores/setting";
import { formatTimeDifference } from "@/utils/time";

const route = useRoute();
const theme = useTheme();

const settingStore = useSettingStore();

const offWorkCountdown = ref<string | null>(null)

const setOffWorkCountdown = () => {
  if (!settingStore.offWorkTime) {
    offWorkCountdown.value = null;
    return
  }

  const now = new Date();
  const toDay = now.toLocaleDateString();
  const offworkTime = new Date(`${toDay} ${settingStore.offWorkTime}`);

  if (now > offworkTime) {
    offWorkCountdown.value = "已經該下班了！";
    return
  }

  offWorkCountdown.value = formatTimeDifference(offworkTime, now);
}
setOffWorkCountdown()

const countdownTimer = setInterval(setOffWorkCountdown, 1000)

onBeforeUnmount(() => {
  clearInterval(countdownTimer)
})

const navItems = [
  { to: "/todo", label: "待辦清單" },
  { to: "/note", label: "筆記" },
  { to: "/setting", label: "設定" },
];

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
