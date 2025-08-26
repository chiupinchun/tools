<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div class="md:flex">
      <div>
        <v-img src="" :width="300" aspect-ratio="1/1" cover />
      </div>
      <div>
        <p class="w-96 max-w-[90vw] whitespace-pre-line">
          <Typewriter
            :text="currentMessage.text"
            @next="nextMessage"
            :disable-default-skip="!!currentMessage.responses"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Typewriter from "@/components/ui/Typewriter.vue";
import { computed, ref } from "vue";

interface Message {
  text: string;
  responses?: string[];
  onNext?: () => void;
}

const messages: Message[] = [
  {
    text: "Hi～\n很高興見到你，神秘的訪客。",
    responses: ["你是……？", "你丫誰啊？"],
  },
  {
    text: "哈哈哈，我會告訴你我是誰的，但……不是現在。\n你知道的，要了解一個人需要很長的時間。",
  },
  {
    text: "雖然我不是個人就是了，哈哈哈哈哈～",
    responses: ["所以你到底是甚麼？", "所以你丫誰啊？"],
  },
  {
    text: "這個問題",
  },
];

const currentIndex = ref(0);

const currentMessage = computed(() => messages[currentIndex.value]);

const nextMessage = () => {
  if (currentIndex.value < messages.length - 1) {
    currentMessage.value.onNext?.();
    currentIndex.value++;
  }
};
</script>

<style lang="scss" scoped></style>
