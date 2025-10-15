import { useSettingStore } from "@/stores/setting"
import { onBeforeUnmount, onMounted } from "vue"
import { useRouter } from "vue-router"

export const useShortcut = () => {
  const settingStore = useSettingStore()
  const router = useRouter()

  let pressedKeys: string[] = []

  const checkShortcut = () => {
    if (!pressedKeys.length) { return }

    switch (pressedKeys.join("+")) {
      case settingStore.shortcuts.goNote:
        router.push("/note");
        break;
      case settingStore.shortcuts.goSetting:
        router.push("/setting");
        break;
      case settingStore.shortcuts.goTodo:
        router.push("/todo");
        break;
    }
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (!pressedKeys.includes(e.key)) {
      pressedKeys.push(e.key)
    }

    checkShortcut()
  }

  const onKeyup = (e: KeyboardEvent) => {
    pressedKeys = pressedKeys.filter(key => key !== e.key)
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('keyup', onKeyup)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('keyup', onKeyup)
  })
}