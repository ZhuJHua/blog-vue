<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import Vditor from 'vditor'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'
import 'vditor/dist/index.css'

const { theme } = storeToRefs(useDarkStore())
const IPreviewOptions: IPreviewOptions = {
  mode: theme.value === undefined ? 'light' : 'dark',
  anchor: 2,
  theme: {
    current: theme.value === undefined ? 'light' : 'dark'
  }
}
const content =
  '## 清晨之梦\n' +
  '\n' +
  '在晨曦的拥抱中，大地沐浴在柔和的光辉之下。这是一个梦幻般的时刻，仿佛大自然正在为新的一天演奏一场神奇的序曲。\n' +
  '\n' +
  '> "清晨，是大地与天空的一次深情对话。"\n' +
  '\n' +
  '### 自然之美\n' +
  '\n' +
  '湖面如镜，映照出橙红色的天空和悠然飘过的白云。树木在微风中轻轻摇曳，仿佛在和大地共舞。这是自然之美的完美呈现，让人陶醉其中。\n' +
  '\n' +
  '### 鸟儿的歌声\n' +
  '\n' +
  '枝头上，小鸟们跳跃着，欢快地歌唱。它们的歌声如同天籁之音，穿越时光的隧道，将清晨的宁静打破，带来一片生机勃勃的活力。\n' +
  '\n' +
  '#### 沉浸其中\n' +
  '\n' +
  '漫步在这片梦幻的土地上，仿佛置身于仙境。大地释放着芬芳，微风拂过，带着花香的味道，让人陶醉在自然的怀抱中。\n' +
  '\n' +
  '> "大自然是一幅永远不会过时的画卷，而清晨是其中最美的一页。"\n' +
  '\n' +
  '### 与自然共舞的时刻\n' +
  '\n' +
  '- 与微风共舞\n' +
  '- 与阳光共舞\n' +
  '- 与大地共舞\n' +
  '\n' +
  '### 追寻梦境的步伐\n' +
  '\n' +
  '1. 沉浸于清晨的宁静\n' +
  '2. 欣赏大自然的绚烂画卷\n' +
  '3. 听取鸟儿轻轻歌唱的旋律\n' +
  '\n' +
  '**让我们在清晨的梦境中，寻找心灵的宁静。**\n'

const vditor: Ref<HTMLDivElement | null> = ref(null)
onMounted(() => {
  Vditor.preview(document.getElementById('vditor') as HTMLDivElement, content, IPreviewOptions)
})
</script>

<template>
  <div id="vditor"></div>
</template>

<style scoped lang="scss">
#vditor {
  box-sizing: border-box;
}
</style>
