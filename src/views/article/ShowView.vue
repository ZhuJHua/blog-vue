<script setup lang="ts">
import VditorShow from '@/components/vditor/VditorShow.vue'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'
import { ref } from 'vue'
import { AccessTimeOutlined, CategoryOutlined, RemoveRedEyeOutlined } from '@vicons/material'

const { theme } = storeToRefs(useDarkStore())
const test = ref()
</script>

<template>
  <n-space vertical>
    <div class="title-box">
      <h1>文章标题</h1>
    </div>
    <div class="info-box">
      <n-icon :component="AccessTimeOutlined" />
      <span>&nbsp;<n-time :time="0" :to="86400000" type="date" /></span>
      <n-divider vertical />
      <n-icon :component="RemoveRedEyeOutlined" />
      <span>&nbsp;999</span>
      <n-divider vertical />
      <n-icon :component="CategoryOutlined" />
      <span>&nbsp;分类</span>
    </div>
    <n-grid responsive="screen" item-responsive cols="12" ref="test">
      <n-grid-item span="12 s:12 m:12 l:12">
        <n-space vertical>
          <VditorShow :key="theme" />
        </n-space>
      </n-grid-item>
      <n-grid-item span="0 s:0 m:0 l:0">
        <div class="anchor-container"></div>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped lang="scss">
.title-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.info-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
</style>
