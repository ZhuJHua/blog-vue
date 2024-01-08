<script setup lang="ts">
import { nextTick, onMounted, onUpdated, type Ref, ref, toRefs } from 'vue'
import Vditor from 'vditor'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'
import 'vditor/dist/index.css'
import type { Anchor } from '@/type/type'
import { useAnchorStore } from '@/stores/anchor'

const { theme } = storeToRefs(useDarkStore())
const { anchorList } = storeToRefs(useAnchorStore())
const props = defineProps<{
  content: string
}>()
let CDN = 'https://cdn.jsdelivr.net/npm/vditor@3.9.8'
const IPreviewOptions: IPreviewOptions = {
  cdn: CDN,
  mode: theme.value === undefined ? 'light' : 'dark',
  anchor: 2,
  theme: {
    current: theme.value === undefined ? 'light' : 'dark',
    path: `${CDN}/dist/css/content-theme`
  },
  hljs: {
    style: theme.value === undefined ? 'xcode' : 'native',
    lineNumber: true
  },
  emojiPath: `${CDN}/dist/images/emoji`,
  //渲染回调
  after() {
    useAnchorStore().$reset()
    anchorList.value = []
    //渲染完成后获取导航
    for (let child of vditor.value!.children) {
      //遍历获得h标签
      if (child.tagName.startsWith('H')) {
        let anchor: Anchor = {
          title: child.textContent!,
          href: '#' + child.id
        }
        anchorList.value.push(anchor)
      }
    }
  }
}
const { content } = toRefs(props)

const vditor: Ref<HTMLDivElement | null> = ref(null)
onMounted(() => {
  Vditor.preview(vditor.value!, content.value, IPreviewOptions)
})

onUpdated(() => {
  Vditor.preview(vditor.value!, content.value, IPreviewOptions)
})
nextTick(() => {})
</script>

<template>
  <div ref="vditor" :key="content"></div>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';
</style>
