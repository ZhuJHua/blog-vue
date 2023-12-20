<script setup lang="ts">
import { getData } from '@/api/Alova'

const data = getData

</script>

<template>
<!--  <div class="container">-->
<!--    <n-grid responsive="screen" item-responsive>-->
<!--      <n-grid-item span="0 m:12 l:4">-->
<!--        <div style="background-color: yellow; height: 200px"></div>-->
<!--      </n-grid-item>-->
<!--      <n-grid-item span="0 m:12 l:20">-->
<!--        <div style="background-color: aqua; height: 200px"></div>-->
<!--      </n-grid-item>-->
<!--    </n-grid>-->
<!--  </div>-->
  {{ data.msg }}
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
