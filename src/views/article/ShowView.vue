<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'
import { onMounted, ref } from 'vue'
import { AccessTimeOutlined, CategoryOutlined, RemoveRedEyeOutlined } from '@vicons/material'
import { useRoute } from 'vue-router'
import type { Article } from '@/type/type'
import { getArticle, updateView } from '@/api/alova'
import VditorShow from '@/components/vditor/VditorShow.vue'
import { useAnchorStore } from '@/stores/anchor'

const { theme } = storeToRefs(useDarkStore())
const { anchorList } = storeToRefs(useAnchorStore())
const route = useRoute()
const article = ref<Article>({
  category: { categoryName: '' },
  content: '',
  postTime: 0,
  tag: '',
  title: '',
  view: 0,
  user: { username: '' }
})

onMounted(() => {
  //先更新文章再更新访问量
  getArticle(Number(route.params.id)).then((response) => {
    article.value = response.data
    updateView(Number(route.params.id))
  })
})
</script>

<template>
  <n-space vertical>
    <div class="title-box">
      <h1>{{ article.title }}</h1>
    </div>
    <div class="info-box">
      <n-icon :component="AccessTimeOutlined" />
      <span>&nbsp;<n-time :time="article.postTime" :to="Date.now()" type="datetime" /></span>
      <n-divider vertical />
      <n-icon :component="RemoveRedEyeOutlined" />
      <span>&nbsp;{{ article.view }}</span>
      <n-divider vertical />
      <n-icon :component="CategoryOutlined" />
      <span>&nbsp;{{ article.category.categoryName }}</span>
    </div>
    <n-grid responsive="screen" item-responsive cols="12">
      <n-grid-item span="12 s:9 m:9 l:9">
        <n-card embedded>
          <VditorShow :key="theme" :content="article.content" />
        </n-card>
      </n-grid-item>
      <n-grid-item span="0 s:3 m:3 l:3">
        <div class="anchor-container">
          <n-card embedded>
            <n-h3>文章目录</n-h3>
            <n-anchor
              :show-rail="true"
              :show-background="true"
              type="rail"
              :ignore-gap="true"
              :bound="50"
            >
              <n-anchor-link
                v-for="item in anchorList"
                :key="item.title"
                :title="item.title"
                :href="item.href"
              />
            </n-anchor>
          </n-card>
        </div>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';

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

.anchor-container {
  padding-left: $space-size;
  box-sizing: border-box;
  position: fixed;
}
</style>
