import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useLoginStore = defineStore(
  'login',
  () => {
    const loginParam: LoginReq = reactive({
      username: '',
      password: ''
    })
    return {
      loginParam
    }
  },
  {
    persist: true
  }
)

export const useRegisterStore = defineStore('register', () => {
  const registerParam: RegisterReq = reactive({
    username: '',
    password: '',
    checkPassword: '',
    email: ''
  })
  return {
    registerParam
  }
})

interface LoginReq {
  username: string
  password: string
}

interface RegisterReq {
  username: string
  password: string
  checkPassword: string
  email: string
}
