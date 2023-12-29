<script setup lang="ts"></script>

<template>
  <div class="container">
    <n-result status="500" title="500 服务器错误" description="服务器太便宜了" size="large">
      <template #footer>
        <n-button @click="$router.push('/login')">下次加钱</n-button>
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
