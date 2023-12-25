<script setup lang="ts">
import {
  AccessTimeOutlined,
  ArticleOutlined,
  PersonOutlineOutlined,
  RemoveRedEyeOutlined
} from '@vicons/material'
import type { ArticleInfo } from '@/type/type'

const props = defineProps<{
  title?: string
  extra?: string
  content?: string
  footer?: string
  action?: ArticleInfo
}>()
</script>

<template>
  <n-card :title="props.title" class="article-card">
    <template #header-extra v-if="extra">
      <n-space>
        <n-tag :bordered="false" round type="primary">{{ props.extra }}</n-tag>
      </n-space>
    </template>
    <n-ellipsis :line-clamp="2" :tooltip="false">
      {{ props.content }}
    </n-ellipsis>
    <template #footer v-if="footer"> {{ props.footer }}</template>
    <template #action v-if="action">
      <div class="card-action">
        <div>
          <n-icon :component="PersonOutlineOutlined" />
          <span>&nbsp; {{ action.author }}</span>
          <n-divider vertical />
          <n-icon :component="AccessTimeOutlined" />
          <span>&nbsp; <n-time :time="0" :to="action.time" type="relative" /></span>
          <n-divider vertical />
          <n-icon :component="RemoveRedEyeOutlined"></n-icon>
          <span>&nbsp;{{ action.view }}</span>
        </div>
        <div>
          <n-button text class="article-button">
            <n-icon :component="ArticleOutlined" />
          </n-button>
        </div>
      </div>
    </template>
  </n-card>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';

.card-action {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.card-action {
  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }

  .article-button {
    font-size: $icon-size;
  }
}
</style>
