<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDarkStore } from '@/stores/theme'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import type { Article, Category } from '@/type/type'
import { addArticle, getAllCategory, updateArticle } from '@/api/alova'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article'

const { theme } = storeToRefs(useDarkStore())
const { oldArticle } = storeToRefs(useArticleStore())
const vditor = ref()
const router = useRouter()
const route = useRoute()
const categories = ref<Category[]>([{}])
const newArticle = ref<Article>({
  view: 0,
  title: '',
  content: '',
  category: { id: 0 },
  tag: '',
  postTime: Date.now(),
  user: { id: 1 }
})
onMounted(() => {
  getAllCategory().then((response) => {
    categories.value = response.data
  })
  let content = ''
  //如果有id说明是编辑状态
  if (route.params.id) {
    //将旧值赋给对象
    newArticle.value = oldArticle.value
    //编辑器初始化
    content = newArticle.value.content
  }
  vditor.value = new Vditor('vditor', {
    placeholder: '写点什么吧',
    icon: 'material',
    width: '100%',
    value: content,
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

const handleCategory = (value: (string | number)[]) => {
  newArticle.value.category.id = value[0] as number
}
const postArticle = () => {
  newArticle.value.content = vditor.value.getValue()
  //编辑状态
  if (route.params.id) {
    updateArticle(newArticle.value).then((response) => {
      if (response.code === 200) {
        window.$message.success(response.msg)
        router.push('/admin')
      }
    })
  } else {
    addArticle(newArticle.value).then((response) => {
      if (response.code === 200) {
        window.$message.success(response.msg)
        router.push('/admin')
      }
    })
  }
}
</script>

<template>
  <n-space vertical>
    <h2 v-text="route.params.id ? '编辑文章' : '新增文章'" />
    <n-grid responsive="screen" item-responsive cols="12" :x-gap="10" :y-gap="10">
      <n-grid-item span="12 s:9 m:9 l:10">
        <n-space vertical>
          <n-input placeholder="文章标题" v-model:value="newArticle.title"></n-input>
          <div id="vditor"></div>
          <n-button-group class="button-box">
            <n-button>取消发布</n-button>
            <n-button type="primary" @click="postArticle">发布文章</n-button>
          </n-button-group>
        </n-space>
      </n-grid-item>
      <n-grid-item span="12 s:3 m:3 l:2">
        <div class="options-container">
          <n-space vertical>
            <h3>发布日期</h3>
            <n-date-picker
              v-model:value="newArticle.postTime"
              type="datetime"
              clearable
              :default-value="Date.now()"
            />
            <h3>分类</h3>
            <n-card embedded :bordered="false" size="small">
              <n-checkbox-group class="type-box" @update:value="handleCategory" max="1">
                <n-checkbox
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id"
                >
                </n-checkbox>
              </n-checkbox-group>
            </n-card>
            <h3>标签</h3>
            <n-input placeholder="标签" v-model:value="newArticle.tag"></n-input>
          </n-space>
        </div>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped lang="scss">
@import '@/assets/css/variable';

.button-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

.type-box {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
