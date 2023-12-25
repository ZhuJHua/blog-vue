<script setup lang="ts">
import { RouterView } from 'vue-router'
import MessageComponent from '@/components/message/MessageComponent.vue'
</script>

<template>
  <n-message-provider>
    <MessageComponent />
  </n-message-provider>
  <RouterView />
</template>

<style scoped></style>
