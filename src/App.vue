<script setup lang="ts">
import { RouterView } from 'vue-router'
import MessageComponent from '@/components/message/MessageComponent.vue'
import { dateZhCN, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'

const { theme } = storeToRefs(useDarkStore())
</script>

<template>
  <n-config-provider
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
  >
    <n-message-provider>
      <MessageComponent />
    </n-message-provider>
  </n-config-provider>
  <RouterView />
</template>

<style scoped></style>
