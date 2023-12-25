<script setup lang="ts">
import { DarkModeOutlined, LightModeOutlined } from '@vicons/material'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'

const { theme } = storeToRefs(useDarkStore())
const { changeTheme } = useDarkStore()
</script>

<template>
  <n-popover placement="bottom" trigger="hover" :keep-alive-on-hover="false" :show-arrow="false">
    <template #trigger>
      <n-button text class="header-icon">
        <n-icon
          :component="theme === undefined ? LightModeOutlined : DarkModeOutlined"
          @click="changeTheme"
        />
      </n-button>
    </template>
    <span v-text="theme === undefined ? '浅色' : '深色'" />
  </n-popover>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';

.header-icon {
  width: $header-height;
  height: $header-height;
  font-size: $icon-size;
}
</style>
