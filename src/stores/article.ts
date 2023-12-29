import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '@/type/type'

export const useArticleStore = defineStore('article', () => {
  const oldArticle = ref<Article>({
    category: { id: 0 },
    content: '',
    postTime: 0,
    tag: '',
    title: '',
    user: { id: 1 },
    view: 0
  })
  return { oldArticle }
})
