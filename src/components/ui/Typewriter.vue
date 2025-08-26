<template>
  <span>{{ displayedText }}</span>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

interface Props {
  text?: string;
  typingSpeed?: number;
  disableDefaultSkip?: boolean;
  autoNext?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  typingSpeed: 100,
});

interface Emits {
  (event: "next"): void;
}
const emit = defineEmits<Emits>();

const displayedText = ref("");

let typingTimer: number | undefined;

const startTyping = (text: string) => {
  clearInterval(typingTimer);
  displayedText.value = "";

  typingTimer = setInterval(() => {
    const currentLength = displayedText.value.length;
    if (text.length > currentLength) {
      displayedText.value = text.slice(0, currentLength + 1);
    } else if (props.autoNext) {
      emit("next");
    }
  }, props.typingSpeed);
};

watch(
  () => props.text,
  (text) => {
    if (text === undefined) {
      return;
    }

    startTyping(text);
  },
  { immediate: true }
);

const skip = () => {
  if (props.text && displayedText.value !== props.text) {
    displayedText.value = props.text;
  } else {
    emit("next");
  }

  clearTimeout(typingTimer);
};

onMounted(() => {
  if (!props.disableDefaultSkip) {
    document.addEventListener("click", skip);
    // document.addEventListener("keydown", skip);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", skip);
  // document.removeEventListener("keydown", skip);
  clearInterval(typingTimer);
});

defineExpose({
  skip,
});
</script>

<style lang="scss" scoped></style>
