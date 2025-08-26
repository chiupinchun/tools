<template>
  <Typewriter :text="messages[messageIndex]" @next="messageIndex++" auto-next />
</template>

<script lang="ts" setup>
import Typewriter from "@/components/ui/Typewriter.vue";
import { ref } from "vue";

const messages = [
  "早安安安安安安安安安安安安安安安安安安安安",
  "午安安安安安安安安安安安安安安安安安安安安",
  "晚安安安安安安安安安安安安安安安安安安安安",
];

const messageIndex = ref(0);
</script>

<style lang="scss" scoped></style>
