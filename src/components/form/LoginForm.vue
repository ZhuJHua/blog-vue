<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/User'
import { Password, User } from '@vicons/carbon'

defineEmits(['changeForm'])
const formRef = ref<FormInst | null>(null)
const { loginParam } = storeToRefs(useLoginStore())

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
      <n-button type="primary" class="btn"> 登录</n-button>
      <n-button text class="btn" @click="$emit('changeForm')"> 没有账号？去注册</n-button>
    </n-space>
  </n-form>
</template>

<style scoped>
.btn {
  width: 100%;
}
</style>
