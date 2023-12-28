import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '@/type/type'

export const useArticleStore = defineStore('article', () => {
  const oldArticle = ref<Article>({})
  return { oldArticle }
})
