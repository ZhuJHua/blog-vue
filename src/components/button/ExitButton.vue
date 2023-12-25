<script setup lang="ts">
import { ExitToAppOutlined } from '@vicons/material'
</script>

<template>
  <n-button text class="header-icon">
    <n-icon :component="ExitToAppOutlined" />
  </n-button>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';

.header-icon {
  width: $header-height;
  height: $header-height;
  font-size: $icon-size;
}
</style>
