<script setup lang="ts">
import VditorEdit from '@/components/vditor/VditorEdit.vue'
import { ref } from 'vue'

const timestamp = ref()
</script>

<template>
  <n-space vertical>
    <h2>新增文章</h2>
    <n-grid responsive="screen" item-responsive cols="12" :x-gap="10" :y-gap="10">
      <n-grid-item span="12 s:9 m:9 l:10">
        <n-space vertical>
          <n-input placeholder="文章标题"></n-input>
          <VditorEdit />
          <n-button-group class="button-box">
            <n-button>取消发布</n-button>
            <n-button type="primary">发布文章</n-button>
          </n-button-group>
        </n-space>
      </n-grid-item>
      <n-grid-item span="12 s:3 m:3 l:2">
        <div class="options-container">
          <n-space vertical>
            <h3>发布日期</h3>
            <n-date-picker v-model:value="timestamp" type="datetime" clearable />
            <h3>分类</h3>
            <n-card embedded :bordered="false" size="small">
              <n-checkbox-group class="type-box">
                <div v-for="item in 6" :key="item">
                  <n-checkbox>{{ item }}</n-checkbox>
                </div>
              </n-checkbox-group>
            </n-card>
            <h3>标签</h3>
            <n-input placeholder="标签"></n-input>
          </n-space>
        </div>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';

.button-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

.type-box {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
