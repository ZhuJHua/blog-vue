<script setup lang="ts">
import { CopyrightRegular } from '@vicons/fa'
import { dateZhCN, NIcon, zhCN } from 'naive-ui'
import { useDarkStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import ThemeButton from '@/components/button/ThemeButton.vue'
import { useRouter } from 'vue-router'
import AdminButton from '@/components/button/AdminButton.vue'

const { theme } = storeToRefs(useDarkStore())
const router = useRouter()
const handleAdmin = () => {
  router.push('/admin')
}
const handleHome = () => {
  router.push('/')
}
</script>

<template>
  <n-config-provider
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
  >
    <div class="container">
      <n-layout position="absolute">
        <n-layout-header class="header" position="absolute" bordered>
          <ThemeButton />
          <n-button text @click="handleHome">首页</n-button>
          <AdminButton @click="handleAdmin" />
        </n-layout-header>
        <n-layout position="absolute" :native-scrollbar="false" class="main-container">
          <n-layout-content class="main-body">
            <RouterView />
          </n-layout-content>
        </n-layout>
        <n-layout-footer class="footer" position="absolute" bordered>
          <n-icon size="14px">
            <CopyrightRegular />
          </n-icon>
          2023丨
          <n-button text tag="a" href="https://beian.miit.gov.cn/" target="_blank">
            赣ICP备2022010939号-3
          </n-button>
        </n-layout-footer>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<style scoped lang="scss">
@import '@/assets/css/color';
@import '@/assets/css/shadow';
@import '@/assets/css/variable';

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
}

.header {
  height: $header-height;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}

.main-container {
  top: $header-height;
  bottom: $footer-height;
}

.main-body {
  margin: 0 auto;
  max-width: $max-width;
  box-sizing: border-box;
  padding: $space-size;
}

.footer {
  height: $footer-height;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
