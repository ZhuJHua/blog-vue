<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/user'
import { Password, User } from '@vicons/carbon'
import { toLogin } from '@/api/alova'
import type { Result, Token, UserInfo } from '@/type/type'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'

defineEmits(['changeForm'])
const formRef = ref<FormInst | null>(null)
const { loginParam } = storeToRefs(useLoginStore())
const { tokenParam } = storeToRefs(useTokenStore())
const router = useRouter()
const formRule: FormRules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})
const handleLogin = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      let user: UserInfo = {
        username: loginParam.value.username,
        password: loginParam.value.password
      }
      toLogin(user).then((response: Result<Token>) => {
        //将token写到pinia
        tokenParam.value.tokenName = response.data.tokenValue
        tokenParam.value.tokenValue = response.data.tokenValue
        router.push('/admin')
        if (response.code === 200) {
          window.$message.success('登录成功')
        }
      })
    } else {
      window.$message.info('请输入用户名或密码')
    }
  })
}
</script>

<template>
  <n-form ref="formRef" :model="loginParam" :rules="formRule">
    <n-divider title-placement="center">
      <h2>登录</h2>
    </n-divider>
    <n-form-item label="用户名" path="username">
      <n-input v-model:value="loginParam.username" placeholder="请输入用户名" clearable>
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input
        v-model:value="loginParam.password"
        placeholder="请输入密码"
        type="password"
        show-password-on="mousedown"
      >
        <template #prefix>
          <n-icon :component="Password" />
        </template>
      </n-input>
    </n-form-item>
    <n-space vertical>
      <n-button type="primary" class="btn" @click="handleLogin"> 登录</n-button>
      <n-button text class="btn" @click="$emit('changeForm')"> 没有账号？去注册</n-button>
    </n-space>
  </n-form>
</template>

<style scoped>
.btn {
  width: 100%;
}
</style>
