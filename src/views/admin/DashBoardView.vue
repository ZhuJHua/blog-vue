<script setup lang="ts">
import { XNDataTable, XNDataTableColumn } from '@skit/x.naive-ui'

const data = [
  { name: 'Athos', age: 20 },
  { name: 'Porthos', age: 19 },
  { name: 'Aramis', age: 18 }
]
</script>

<template>
  <n-space vertical>
    <n-grid responsive="screen" item-responsive cols="12" :x-gap="10" :y-gap="10">
      <n-grid-item span="12 s:3 m:4 l:6">
        <n-space vertical>
          <n-divider title-placement="left" dashed>概要</n-divider>
          <h3>统计</h3>
          <div class="statistic-box">
            <n-space>
              <n-statistic label="文章数量">
                99
                <template #suffix>篇</template>
              </n-statistic>
              <n-statistic label="分类数量"
                >10
                <template #suffix>个</template>
              </n-statistic>
            </n-space>
          </div>
          <h3>快速开始</h3>
          <n-button type="primary" secondary strong @click="$router.push('/admin/edit')"
            >新建文章
          </n-button>
        </n-space>
      </n-grid-item>
      <n-grid-item span="12 s:9 m:8 l:6">
        <n-space vertical>
          <n-divider title-placement="left" dashed> 做点什么</n-divider>
          <h3>文章列表</h3>
          <x-n-data-table :data="data">
            <x-n-data-table-column type="selection" />
            <x-n-data-table-column key="no" title="NO.">
              <template #render-cell="{ rowIndex }">
                <div>{{ rowIndex + 1 }}</div>
              </template>
            </x-n-data-table-column>
            <x-n-data-table-column key="name" title="Name" />
            <x-n-data-table-column key="age" title="Age" />
            <x-n-data-table-column key="actions" title="Actions">
              <template #render-cell="{ rowData }">
                <button>{{ 'Say hello to ' + rowData.name }}</button>
              </template>
            </x-n-data-table-column>
          </x-n-data-table>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped lang="scss"></style>
