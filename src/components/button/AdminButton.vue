<script setup lang="ts">
import { AdminPanelSettingsOutlined } from '@vicons/material'
</script>

<template>
  <n-button text class="header-icon">
    <n-icon :component="AdminPanelSettingsOutlined" />
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
