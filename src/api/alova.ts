import { createAlova, useRequest } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import type { Hitokoto, Result, UserInfo } from '@/type/type'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { type Token, useTokenStore } from '@/stores/token' //alova实例
const { tokenParam } = storeToRefs(useTokenStore())
//alova实例
export const alovaInstance = createAlova({
  //请求根路径
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  //响应拦截器
  responded: {
    onSuccess: async (response, method) => {
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
//初始化请求

export const creatGetter = <T>(url: string) => {
  return alovaInstance.Get<T>(url, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export const creatPoster = <T>(url: string, data: object) => {
  return alovaInstance.Post<T>(url, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
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
