import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Anchor } from '@/type/type'

export const useAnchorStore = defineStore('anchor', () => {
  const anchorList = ref<Anchor[]>([{ title: '', href: '' }])

  return { anchorList }
})
