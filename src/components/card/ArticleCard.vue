<script setup lang="ts">
import {
  AccessTimeOutlined,
  ArticleOutlined,
  PersonOutlineOutlined,
  RemoveRedEyeOutlined
} from '@vicons/material'
import type { Article, ArticleInfo } from '@/type/type'

const props = defineProps<{
  article: Article
  action?: ArticleInfo
}>()
</script>

<template>
  <n-card :title="props.article.title" class="article-card">
    <template #header-extra v-if="props.article.category.categoryName">
      <n-space>
        <n-tag :bordered="false" round type="primary"
          >{{ props.article.category.categoryName }}
        </n-tag>
      </n-space>
    </template>
    <n-ellipsis :line-clamp="2" :tooltip="false">
      {{ props.article.content }}
    </n-ellipsis>
    <template #action v-if="action">
      <div class="card-action">
        <div>
          <n-icon :component="PersonOutlineOutlined" />
          <span>&nbsp; {{ action.author }}</span>
          <n-divider vertical />
          <n-icon :component="AccessTimeOutlined" />
          <span>&nbsp; <n-time :time="action.time" :to="Date.now()" type="relative" /></span>
          <n-divider vertical />
          <n-icon :component="RemoveRedEyeOutlined"></n-icon>
          <span>&nbsp;{{ action.view }}</span>
        </div>
        <div>
          <n-button
            text
            class="article-button"
            @click="$router.push('/article/' + props.article.id)"
          >
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
