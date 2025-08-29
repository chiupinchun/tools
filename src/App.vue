<script setup lang="ts">
import { useTheme } from "vuetify";
import Header from "./components/Header.vue";
import { watch } from "vue";
import { useKeyboard } from "./composables/useKeyboard";
import { useSettingStore } from "./stores/setting";
import { useRouter } from "vue-router";

const router = useRouter();

const theme = useTheme();

watch(
  () => theme.global.name.value,
  (newTheme) => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  },
  { immediate: true }
);

const settingStore = useSettingStore();
const { pressedKeys } = useKeyboard();

watch(
  [() => settingStore.shortcuts, pressedKeys],
  ([shortCuts, pressedKeys]) => {
    switch (pressedKeys.join("+")) {
      case shortCuts.goNote:
        router.push("/note");
        break;
      case shortCuts.goSetting:
        router.push("/setting");
        break;
      case shortCuts.goTodo:
        router.push("/todo");
        break;
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
