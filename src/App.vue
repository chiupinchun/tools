<script setup lang="ts">
import { useTheme } from "vuetify";
import Header from "./components/Header.vue";
import { watch } from "vue";
import { useShortcut } from '@/composables/useShortcut'

const theme = useTheme();

watch(
  () => theme.global.name.value,
  (newTheme) => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  },
  { immediate: true }
);

useShortcut()
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
