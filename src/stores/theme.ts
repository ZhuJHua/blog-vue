import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'

export const useDarkStore = defineStore(
  'theme',
  () => {
    const theme = ref()

    function changeTheme() {
      theme.value = theme.value === undefined ? darkTheme : undefined
    }

    return { theme, changeTheme }
  },
  {
    persist: true
  }
)
