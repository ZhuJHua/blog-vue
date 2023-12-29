<script setup lang="ts">
import { XNDataTable, XNDataTableColumn } from '@skit/x.naive-ui'
import {
  addCategory,
  addSensitiveWord,
  creatGetter,
  delArticle,
  delCategory,
  delSensitiveWord,
  getAllArticle,
  getAllCategory,
  getAllSensitiveWord,
  handleFlushEs,
  updateCategory
} from '@/api/alova'
import type { Article, Category, Result, Sensitive } from '@/type/type'
import { onMounted, ref, watch } from 'vue'
import { updateState } from 'alova'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import { useRouter } from 'vue-router'

const router = useRouter()

const articles = ref<Article[]>([])
const categories = ref<Category[]>([{}])
const sensitiveWord = ref<string[]>([])

//编辑文章，旧文章store
const { oldArticle } = storeToRefs(useArticleStore())
//新增分类
const newCategory = ref<Category>({ categoryName: '' })
const showAddCategory = ref<boolean>(false)
const handleInfo = (info: string) => {
  window.$message.info(info)
}
const flushEs = () => {
  handleFlushEs().then((response) => {
    window.$message.success('刷新成功')
  })
}
const handlePost = (rowData: Article) => {
  //每次点击编辑前先清空store
  useArticleStore().$reset()
  //将旧文章数据赋给store
  oldArticle.value = rowData
  //跳转到edit，携带id作为标识
  router.push('/admin/edit/' + rowData.id)
}
//删文章
const handleDel = (aid: number) => {
  delArticle(aid).then((response) => {
    updateState(creatGetter<Result<Article[]>>('http://localhost/article'), (oldList) => {
      const index = oldList.data.findIndex(({ id }) => id === aid)
      oldList.data.splice(index, 1)
      return oldList
    })
    handleInfo(response.msg)
  })
}
//删分类
const handleDelCategory = (cid: number) => {
  delCategory(cid).then((response) => {
    updateState(creatGetter<Result<Category[]>>('http://localhost/category'), (oldList) => {
      const index = oldList.data.findIndex(({ id }) => id === cid)
      oldList.data.splice(index, 1)
      return oldList
    })
    handleInfo(response.msg)
  })
}
const handleSaveCategory = (rowData: Category) => {
  updateCategory(rowData).then((response) => {
    if (response.code === 200) {
      window.$message.success(response.msg)
    }
    //更新列表
    updateState(creatGetter<Result<Category[]>>('http://localhost/category'), (newList) => {
      const index = newList.data.findIndex(({ id }) => id === rowData.id)
      newList.data.splice(index, 1, rowData)
      return newList
    })
  })
}

const handleAddCategory = () => {
  addCategory(newCategory.value).then((response) => {
    if (response.code === 200) {
      window.$message.success(response.msg)
      closeAddInput()
    }
    updateState(creatGetter<Result<Category[]>>('http://localhost/category'), (newList) => {
      newList.data.splice(categories.value.length, 0, newCategory.value)
      return newList
    })
    router.go(0)
  })
}
const openAddInput = () => {
  //显示添加条
  newCategory.value = {}
  showAddCategory.value = true
}
const closeAddInput = () => {
  //关闭添加条
  newCategory.value = {}
  showAddCategory.value = false
}
//挂载回调
onMounted(() => {
  //获取文章
  getAllArticle().then((response) => {
    articles.value = response.data
  })
  //获取分类
  getAllCategory().then((response) => {
    categories.value = response.data
  })
  //获取敏感词
  getAllSensitiveWord().then((response) => {
    sensitiveWord.value = response.data
    //敏感词修改回调
    watch(sensitiveWord, (newValue, oldValue) => {
      if (newValue.length > oldValue.length) {
        //添加敏感词
        let sensitive: Sensitive = {
          sensitiveWord: newValue[oldValue.length]
        }
        addSensitiveWord(sensitive).then((response) => {
          window.$message.success(response.msg)
        })
      } else {
        //删除敏感词
        delSensitiveWord(oldValue[newValue.length]).then((response) => {
          window.$message.success(response.msg)
        })
      }
    })
  })
})
</script>

<template :key="handleUpdate.value">
  <n-space vertical>
    <n-grid responsive="screen" item-responsive cols="12" :x-gap="10" :y-gap="10">
      <n-grid-item span="12 s:3 m:4 l:5">
        <n-space vertical>
          <n-divider title-placement="center">概要</n-divider>
          <h3>统计</h3>
          <div class="statistic-box">
            <n-space>
              <n-statistic label="文章数量">
                {{ articles.length }}
                <template #suffix>篇</template>
              </n-statistic>
              <n-statistic label="分类数量"
                >{{ categories.length }}
                <template #suffix>个</template>
              </n-statistic>
            </n-space>
          </div>
          <h3>快速开始</h3>
          <n-space>
            <n-button type="primary" secondary strong @click="$router.push('/admin/edit')"
              >新建文章
            </n-button>
            <n-button type="info" secondary strong @click="openAddInput">新建分类</n-button>
            <n-button type="default" secondary strong @click="flushEs">更新索引</n-button>
          </n-space>
          <n-input-group v-if="showAddCategory">
            <n-input placeholder="请输入分类名" v-model:value="newCategory.categoryName" />
            <n-popconfirm @positive-click="closeAddInput" @negative-click="handleInfo('已取消')">
              <template #trigger>
                <n-button type="error" tertiary>关闭</n-button>
              </template>
              确认取消吗？
            </n-popconfirm>
            <n-popconfirm
              @positive-click="handleAddCategory"
              @negative-click="handleInfo('已取消')"
            >
              <template #trigger>
                <n-button type="primary" tertiary>添加</n-button>
              </template>
              确认添加吗
            </n-popconfirm>
          </n-input-group>
          <h3>敏感词</h3>
          <n-dynamic-tags v-model:value="sensitiveWord" type="warning" />
        </n-space>
      </n-grid-item>
      <n-grid-item span="12 s:9 m:8 l:7">
        <n-space vertical>
          <n-divider title-placement="center">做点什么</n-divider>
          <n-tabs type="segment" animated default-value="article">
            <n-tab-pane name="article" tab="文章">
              <x-n-data-table :data="articles">
                <x-n-data-table-column key="title" title="标题" />
                <x-n-data-table-column key="category" title="分类">
                  <template #render-cell="{ rowData }">
                    <span v-text="rowData.category.categoryName" />
                  </template>
                </x-n-data-table-column>
                <x-n-data-table-column key="postTime" title="日期">
                  <template #render-cell="{ rowData }">
                    <n-time :time="rowData.postTime" :to="Date.now()" type="date" />
                  </template>
                </x-n-data-table-column>
                <x-n-data-table-column key="action" title="操作">
                  <template #render-cell="{ rowData }">
                    <n-button-group>
                      <n-popconfirm
                        @positive-click="handleDel(rowData.id)"
                        @negative-click="handleInfo('已取消')"
                      >
                        <template #trigger>
                          <n-button type="error">删除</n-button>
                        </template>
                        确定要删除吗？
                      </n-popconfirm>
                      <n-button @click="handlePost(rowData)" type="primary">编辑</n-button>
                    </n-button-group>
                  </template>
                </x-n-data-table-column>
              </x-n-data-table>
            </n-tab-pane>
            <n-tab-pane name="category" tab="分类">
              <x-n-data-table :data="categories">
                <x-n-data-table-column key="categoryName" title="名称">
                  <template #render-cell="{ rowData }">
                    <n-input v-model:value="rowData.categoryName" />
                  </template>
                </x-n-data-table-column>
                <x-n-data-table-column key="option" title="操作">
                  <template #render-cell="{ rowData }">
                    <n-button-group>
                      <n-popconfirm
                        @positive-click="handleDelCategory(rowData.id)"
                        @negative-click="handleInfo('已取消')"
                      >
                        <template #trigger>
                          <n-button type="error">删除</n-button>
                        </template>
                        确定要删除吗？
                      </n-popconfirm>
                      <n-popconfirm
                        @positive-click="handleSaveCategory(rowData)"
                        @negative-click="handleInfo('已取消')"
                      >
                        <template #trigger>
                          <n-button type="primary">保存</n-button>
                        </template>
                        确定要修改吗？
                      </n-popconfirm>
                    </n-button-group>
                  </template>
                </x-n-data-table-column>
              </x-n-data-table>
            </n-tab-pane>
          </n-tabs>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<style scoped lang="scss"></style>
