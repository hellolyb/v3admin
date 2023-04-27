import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/index',
      component: HomeView,
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('../views/IndexView.vue')
        },
        {
          path: '/test3',
          name: 'test3',
          component: () => import('../views/test/test3.vue'),
          meta: {
            mianbao: [
              { title: '测试1-1-1' }, { title: '测试1-1-1' }
            ]
          }
        },
        {
          path: '/department',
          name: 'department',
          component: () => import('../views/system/department.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '机构管理' }
            ]
          }
        },
        {
          path: '/menuList',
          name: 'menuList',
          component: () => import('../views/system/menuList.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '权限管理' }
            ]
          }
        },
        {
          path: '/roleList',
          name: 'roleList',
          component: () => import('../views/system/roleList.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '角色管理' }
            ]
          }
        },
        {
          path: '/userList',
          name: 'userList',
          component: () => import('../views/system/userList.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '用户管理' }
            ]
          }
        },
        {
          path: '/test2',
          name: 'test2',
          component: () => import('../views/goods/test2.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '分类测试' }
            ]
          }
        },
        {
          path: '/goodCategory',
          name: 'goodCategory',
          component: () => import('../views/goods/goodCategory.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '分类管理' }
            ]
          }
        },
        {
          path: '/phone1',
          name: 'phone1',
          component: () => import('../views/goods/phone1.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '手机分类' }
            ]
          }
        },
        {
          path: '/document',
          name: 'document',
          component: () => import('../views/systenConfig/document.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '接口文档' }
            ]
          }
        },
        {
          path: '/systemCode',
          name: 'systemCode',
          component: () => import('../views/systenConfig/systemCode.vue'),
          meta: {
            mianbao: [
              { title: '系统管理' }, { title: '日志管理' }
            ]
          }
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.path == '/login' || to.path == "/") {
    if (!token) {
      return next()
    } else {
      next('/home')
    }
  }

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
