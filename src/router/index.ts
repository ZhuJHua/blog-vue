import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //主页路由
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/IndexView.vue'),
      children: [
        {
          //主页默认路由
          path: '',
          name: 'home',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          //文章路由
          path: 'article/:id',
          name: 'article',
          component: () => import('@/views/article/ShowView.vue')
        }
      ]
    },
    //登录路由
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    //后台路由
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      children: [
        {
          //后台默认路由
          path: '',
          name: 'dashboard',
          component: () => import('@/views/admin/DashBoardView.vue')
        },
        //文章编辑路由
        {
          path: 'edit/:id?',
          name: 'edit',
          component: () => import('@/views/article/EditView.vue')
        }
      ]
    },
    //404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/error/404View.vue')
    },
    //500
    {
      path: '/error500',
      name: '500',
      component: () => import('@/views/error/500View.vue')
    }
  ]
})
//前置路由守卫
router.beforeEach((to, from) => {
  const token = useTokenStore()
  const notAllow = ['dashboard', 'edit']
  if (!token.isLogin() && notAllow.includes(<string>to.name)) {
    if (from.name === 'login') {
      // 如果是从登录页面跳转到 dashboard，直接返回，无需提示
      return { name: 'login' }
    }
    // 如果是从其他页面跳转到 dashboard，显示提示信息
    window.$message.warning('您还未登录！')
    return { name: 'login' }
  }
})
export default router
