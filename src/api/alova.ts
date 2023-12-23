import { createAlova, useRequest } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import type { Hitokoto, Result } from '@/type/type'
import router from '@/router' //alova实例

//alova实例
export const alovaInstance = createAlova({
  //请求根路径
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  //响应拦截器
  responded: {
    onSuccess: async (response, method) => {
      const json: Result = await response.json()
      switch (json.code) {
        case 500:
          await router.push('/error500')
          break
        case 403:
          await router.push('/403')
          break
        case 418:
          await router.push('/418')
      }
      return json
    },
    onComplete: async (method) => {
      console.log('请求了' + method.baseURL)
    }
  }
  //请求拦截器
})
//初始化请求

export const creatGetter = <T>(url: string) => {
  return alovaInstance.Get<T>(url, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export const { data: getHitokoto } = useRequest(creatGetter<Hitokoto>('https://v1.hitokoto.cn'), {
  initialData: {}
})
