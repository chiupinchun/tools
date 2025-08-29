import { onBeforeMount, onMounted, ref } from "vue";

export const useKeyboard = () => {
  const pressedKeys = ref<string[]>([]);

  const onKeydown = (e: KeyboardEvent) => {
    if (pressedKeys.value.includes(e.key)) {
      return;
    }
    pressedKeys.value.push(e.key);
  };
  const onKeyup = (e: KeyboardEvent) => {
    pressedKeys.value = pressedKeys.value.filter((key) => key !== e.key);
  };

  onMounted(() => {
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyup);
  });

  onBeforeMount(() => {
    window.removeEventListener("keydown", onKeydown);
    window.removeEventListener("keyup", onKeyup);
  });

  return { pressedKeys };
};
