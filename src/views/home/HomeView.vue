<script setup lang="ts">
import { CopyrightRegular } from '@vicons/fa'
</script>

<template>
  <div class="container">
    <n-layout position="absolute">
      <n-layout-header class="header" position="absolute" bordered>header</n-layout-header>
      <n-layout position="absolute" :native-scrollbar="false" class="main-container">
        <n-layout-content content-style="padding: 20px;" class="main-body"> </n-layout-content>
      </n-layout>
      <n-layout-footer class="footer" position="absolute" bordered>
        <n-button text>
          <template #icon>
            <n-icon size="14px">
              <CopyrightRegular />
            </n-icon>
          </template>
        </n-button>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/color';
@import '@/assets/css/shadow';

$header-height: 50px;
$footer-height: 20px;
$max-width: 1200px;

.common-layout {
  width: 100vw;
  height: 100vh;
  background-repeat: repeat;
  background-image: url('@/assets/img/leaves-pattern.webp');
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: $basic-white;
  box-shadow:
    $left-shadow $darker-border,
    $right-shadow $darker-border;
}

.header {
  height: $header-height;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container {
  top: $header-height;
  bottom: $footer-height;
}

.main-body {
  margin: 0 auto;
  max-width: $max-width;
}

.card-container {
  display: grid;
  gap: 20px;
  box-sizing: border-box;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.footer {
  height: $footer-height;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
