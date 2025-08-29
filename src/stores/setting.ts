import { defineStore } from "pinia";

interface Settings {
  defaultHome: string;
  offWorkTime: string;
  shortcuts: {
    goTodo: string;
    goNote: string;
    goSetting: string;
  };
}

export const useSettingStore = defineStore("setting", {
  state: (): Settings => ({
    defaultHome: "todo",
    offWorkTime: "",
    shortcuts: {
      goTodo: "",
      goNote: "",
      goSetting: "",
    },
  }),
  persist: {
    key: "setting",
  },
});
