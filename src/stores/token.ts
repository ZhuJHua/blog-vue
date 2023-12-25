import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const tokenParam: Token = reactive({
      tokenName: '',
      tokenValue: ''
    })
    return {
      tokenParam
    }
  },
  {
    persist: true
  }
)

export type Token = {
  tokenName: string
  tokenValue: string
}
