import { createAlova, useRequest } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import type { Article, Category, Hitokoto, Result, Sensitive, Token, UserInfo } from '@/type/type'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useTokenStore } from '@/stores/token'

const { tokenParam } = storeToRefs(useTokenStore())

//alova实例
export const alovaInstance = createAlova({
  //请求根路径
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  //响应拦截器
  responded: {
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        await router.push('/error500')
      }
      const json: Result<any> = await response.json()
      switch (json.code) {
        case 500:
          await router.push('/error500')
          break
        case 400:
          window.$message.error(json.msg)
          break
        case 403:
          await router.push('/403')
          break
        case 418:
          await router.push('/418')
      }
      return json
    }
  },
  //请求拦截器
  beforeRequest(method) {
    //将token写到header中
    method.config.headers.token = tokenParam.value.tokenValue
  }
})

//get请求器
export const creatGetter = <T>(url: string, id?: number | string) => {
  return alovaInstance.Get<T>(url, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
      id: id
    }
  })
}
//post请求器
export const creatPoster = <T>(url: string, data: object) => {
  return alovaInstance.Post<T>(url, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//put请求器
export const creatPutter = <T>(url: string, data: object) => {
  return alovaInstance.Put<T>(url, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//delete请求器
export const creatDeleter = <T>(url: string, id: number | string) => {
  return alovaInstance.Delete<T>(
    url,
    {},
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      params: {
        id: id
      }
    }
  )
}
//获取一言
export const { data: getHitokoto } = useRequest(creatGetter<Hitokoto>('https://v1.hitokoto.cn'), {
  initialData: {}
})
//登录请求
export const { send: toLogin } = useRequest(
  (user: UserInfo) => creatPoster<Result<Token>>('http://localhost/user/login', user),
  {
    immediate: false
  }
)

//文章
//增加文章
export const { send: addArticle } = useRequest(
  (data: Article) => creatPoster<Result<any>>('http://localhost/article', data),
  {
    initialData: {},
    immediate: false
  }
)
//修改文章
export const { send: updateArticle } = useRequest(
  (data: Article) => creatPutter<Result<any>>('http://localhost/article', data),
  {
    initialData: {},
    immediate: false
  }
)
//获取所有文章
export const { send: getAllArticle } = useRequest(
  creatGetter<Result<Article[]>>('http://localhost/article'),
  {
    initialData: {},
    immediate: false,
    force: true
  }
)
//获取单篇文章
export const { send: getArticle } = useRequest(
  (id: number) => creatGetter<Result<Article>>('http://localhost/article', id),
  {
    initialData: {},
    immediate: false
  }
)
//删除文章
export const { send: delArticle } = useRequest(
  (aid: number) => creatDeleter<Result<string>>('http://localhost/article', aid),
  {
    initialData: {},
    immediate: false
  }
)
//更新访问量
export const { send: updateView } = useRequest(
  (id: number) => creatGetter<Result<number>>('http://localhost/article/view', id),
  {
    initialData: {},
    immediate: false
  }
)

//分类
//删除分类
export const { send: delCategory } = useRequest(
  (id: number) => creatDeleter<Result<string>>('http://localhost/category', id),
  {
    initialData: {},
    immediate: false
  }
)
//获取全部分类
export const { send: getAllCategory } = useRequest(
  creatGetter<Result<Category[]>>('http://localhost/category'),
  { initialData: {}, immediate: false, force: true }
)
//修改分类
export const { send: updateCategory } = useRequest(
  (data: Category) => creatPutter<Result<any>>('http://localhost/category', data),
  {
    initialData: {},
    immediate: false
  }
)
//添加分类
export const { send: addCategory } = useRequest(
  (data: Category) => creatPoster<Result<any>>('http://localhost/category', data),
  {
    initialData: {},
    immediate: false
  }
)
//敏感词
//获取敏感词
export const { send: getAllSensitiveWord } = useRequest(
  creatGetter<Result<string[]>>('http://localhost/sensitive'),
  {
    initialData: {},
    immediate: false
  }
)

//添加敏感词
export const { send: addSensitiveWord } = useRequest(
  (data: Sensitive) => creatPoster<Result<any>>('http://localhost/sensitive', data),
  {
    initialData: {},
    immediate: false
  }
)

//删除敏感词
export const { send: delSensitiveWord } = useRequest(
  (id: string) => creatDeleter<Result<any>>('http://localhost/sensitive', id),
  {
    initialData: {},
    immediate: false
  }
)

//es
//文章搜索
export const { send: searchArticleByKeyWord } = useRequest(
  (id: string) => creatGetter<Result<Article[]>>('http://localhost/search', id),
  {
    initialData: {},
    immediate: false
  }
)
//强制更新索引
export const { send: handleFlushEs } = useRequest(
  creatGetter<Result<any>>('http://localhost/article/flush'),
  {
    initialData: {},
    immediate: false
  }
)
