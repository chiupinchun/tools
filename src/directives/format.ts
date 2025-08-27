// src/directives/v-capitalize.ts
import type { Directive } from "vue";

export const capitalizeFirst: Directive = {
  mounted(el: HTMLElement) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.value = capitalize(el.value);

      el.addEventListener("input", () => {
        const start = el.selectionStart;
        el.value = capitalize(el.value);
        el.setSelectionRange(start, start); // 保持游標位置
        el.dispatchEvent(new Event("input")); // 觸發 v-model 更新
      });
    } else {
      el.textContent = capitalize(el.textContent || "");
    }
  },
  updated(el: HTMLElement) {
    if (
      !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
    ) {
      el.textContent = capitalize(el.textContent || "");
    }
  },
};

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
