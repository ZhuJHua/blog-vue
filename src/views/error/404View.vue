<script setup lang="ts"></script>

<template>
  <div class="container">
    <n-result status="404" title="404 资源不存在" description="生活突然戛然而止" size="large">
      <template #footer>
        <n-button @click="$router.back()">重新活一次</n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
