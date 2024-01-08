<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from 'vue'
import { getAllArticle, getHitokoto, searchArticleByKeyWord } from '@/api/alova'
import type { Article, Hitokoto } from '@/type/type'
import ArticleCard from '@/components/card/ArticleCard.vue'

const hitokotoData: Ref<Hitokoto> = getHitokoto

//获取文章数据
const articleData = ref<Article[]>([])

//关键词搜索
const keyWord = ref<string>('')
const isSearch = ref<boolean>(false)
watch(keyWord, () => {
  setTimeout(() => {
    if (keyWord.value === '') {
      getAllArticle().then((response) => {
        isSearch.value = false
        articleData.value = response.data
      })
    } else {
      searchArticleByKeyWord(keyWord.value).then((response) => {
        if (response.code === 200) {
          window.$message.success('共有' + response.data.length + '篇相关文章')
          isSearch.value = true
          articleData.value = response.data
        }
      })
    }
  }, 1000)
})
const cardClass = (title: string) => {
  if (title.length < 10) return ''
  return title.length > 20 ? 'l-card' : 'm-card'
}

onMounted(() => {
  getAllArticle().then((response) => {
    articleData.value = response.data
  })
})
</script>

<template>
  <div class="title-container">
    <n-card :bordered="false" title="这里一片荒芜" size="medium">
      <template #header-extra>
        <n-input
          placeholder="想看什么"
          v-model:value="keyWord"
          clearable
          autosize
          style="min-width: 100px;"
        />
      </template>
      {{ hitokotoData.hitokoto }}
    </n-card>
  </div>
  <div class="card-container">
    <ArticleCard
      v-for="item in articleData"
      :key="item.id"
      :article="item"
      :action="{ author: item.user.username!, time: item.postTime, view: item.view }"
      :class="cardClass(item.title)"
      :is-search="isSearch"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/color';
@import '@/assets/css/shadow';
@import '@/assets/css/variable';

.title-container {
  margin-bottom: $space-size;
}

.card-container {
  display: grid;
  gap: $space-size;
  box-sizing: border-box;
  grid-template-columns: repeat(auto-fill, minmax($card-size, 1fr));
  grid-auto-flow: dense;
}

.m-card {
  grid-column: span 2;
}

.l-card {
  grid-column: span 3;
}

$l-card-media: $card-size * 3 + 4 * $space-size;
@media (max-width: $l-card-media) {
  .card-container {
    .l-card {
      grid-column: span 2;
    }
  }
}

$m-card-media: $card-size * 2 + 3 * $space-size;
@media (max-width: $m-card-media) {
  .card-container {
    .l-card {
      grid-column: span 1;
    }

    .m-card {
      grid-column: span 1;
    }
  }
}
</style>
