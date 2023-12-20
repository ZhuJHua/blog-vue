import { createAlova, useRequest } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import type { Result } from '@/type/Type'
import router from '@/router' //alova实例

//alova实例
export const alovaInstance = createAlova({
  //请求根路径
  baseURL: 'http://localhost',
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

export const creatGetter = alovaInstance.Get<Result>('/api/test', {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export const { data: getData } = useRequest(creatGetter, {
  initialData: {}
})
