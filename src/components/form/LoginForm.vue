<script setup lang="ts">
import { ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/User'
import { Password, User } from '@vicons/carbon'

const formRef = ref<FormInst | null>(null)
const { loginParam } = storeToRefs(useLoginStore())
defineEmits(['changeForm'])
</script>

<template>
  <n-form ref="formRef" :model="loginParam">
    <n-divider title-placement="center">
      <h2>登录</h2>
    </n-divider>
    <n-form-item label="用户名">
      <n-input v-model="loginParam.username" placeholder="请输入用户名" clearable>
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="密码">
      <n-input
        v-model="loginParam.password"
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
