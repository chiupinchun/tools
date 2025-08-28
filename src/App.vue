<script setup lang="ts">
import { useTheme } from "vuetify";
import Header from "./components/Header.vue";
import { watch } from "vue";

const theme = useTheme();

watch(
  () => theme.global.name.value,
  (newTheme) => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  },
  { immediate: true }
);
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
