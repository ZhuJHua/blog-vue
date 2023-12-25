import { createRouter, createWebHistory } from 'vue-router'

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
  console.log(to.name)
  if (window.localStorage.getItem('token') === null && to.name === 'dashboard') {
    window.$message.warning('您还未登录！')
    return { name: 'login' }
  }
})
export default router
