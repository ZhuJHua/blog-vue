import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const tokenParam: Token = reactive({
      tokenName: '',
      tokenValue: ''
    })

    function isLogin(): boolean {
      return !(tokenParam.tokenValue === '' || tokenParam.tokenValue === undefined)
    }

    return {
      tokenParam,
      isLogin
    }
  },
  {
    persist: true
  }
)

interface Token {
  tokenName: string
  tokenValue: string
}
