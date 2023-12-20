<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRegisterStore } from '@/stores/User'
import { Password, User } from '@vicons/carbon'
import { PasswordFilled } from '@vicons/material'
import { ref } from 'vue'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const { registerParam } = storeToRefs(useRegisterStore())
defineEmits(['changeForm'])

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!registerParam.value.password &&
    registerParam.value.password.startsWith(value) &&
    registerParam.value.password.length >= value.length
  )
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === registerParam.value.password
}

const formRule: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  checkPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}
</script>

<template>
  <n-form ref="formRef" :model="registerParam" size="small" :rules="formRule">
    <n-divider title-placement="center">
      <h2>注册</h2>
    </n-divider>
    <n-form-item label="用户名" path="username">
      <n-input v-model="registerParam.username" placeholder="请输入用户名" clearable>
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input
        v-model="registerParam.password"
        placeholder="请输入密码"
        type="password"
        show-password-on="mousedown"
      >
        <template #prefix>
          <n-icon :component="Password" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="确认密码" path="checkPassword">
      <n-input
        v-model="registerParam.checkPassword"
        placeholder="请再次输入密码"
        type="password"
        show-password-on="mousedown"
      >
        <template #prefix>
          <n-icon :component="PasswordFilled" />
        </template>
      </n-input>
    </n-form-item>
    <n-space vertical>
      <n-button type="primary" class="btn"> 注册</n-button>
      <n-button text class="btn" @click="$emit('changeForm')"> 已有账号？去登录</n-button>
    </n-space>
  </n-form>
</template>

<style scoped>
.btn {
  width: 100%;
}
</style>
