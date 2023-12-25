<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'

const { theme } = storeToRefs(useDarkStore())

const vditor = ref()

onMounted(() => {
  let content = ''
  vditor.value = new Vditor('vditor', {
    placeholder: '写点什么吧',
    icon: 'material',
    width: '100%',
    mode: 'wysiwyg',
    minHeight: 500,
    theme: theme.value === undefined ? 'classic' : 'dark',
    preview: {
      theme: {
        current: theme.value === undefined ? 'light' : 'dark'
      }
    },
    counter: {
      enable: true
    },
    input: (value) => {
      content = value
    },
    after: () => {
      vditor.value.setValue(content)
    }
  })
})
watch(theme, () => {
  vditor.value.setTheme(
    theme.value === undefined ? 'classic' : 'dark',
    theme.value === undefined ? 'light' : 'dark'
  )
})
const postArticle = async () => {}
</script>

<template>
  <div id="vditor"></div>
</template>

<style scoped></style>
