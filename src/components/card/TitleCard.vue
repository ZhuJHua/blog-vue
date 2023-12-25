<script setup lang="ts">
const props = defineProps<{
  title: string
  extra: string | undefined
  content: string
}>()
</script>

<template>
  <n-card :bordered="false" :title="props.title" size="medium">
    <template #header-extra>
      {{ props.extra }}
    </template>
    {{ props.content }}
  </n-card>
</template>

<style scoped></style>
