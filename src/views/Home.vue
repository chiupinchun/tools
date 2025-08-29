<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@/stores/setting";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const settingStore = useSettingStore();

watch(
  () => settingStore.defaultHome,
  (path) => {
    router.push(`/${path}`);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
