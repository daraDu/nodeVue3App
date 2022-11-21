import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/category/index',
    children: [
      {
        path: '/category',
        name: 'Category',
        children: [
          {
            path: 'index',
            name: 'categoryIndex',
            component: () => import(/* webpackChunkName: "about" */ '../views/category/index.vue')
          },
          {
            path: 'create',
            name: 'categoryCreate',
            component: () => import(/* webpackChunkName: "about" */ '../views/category/create.vue')
          }
        ],
      },
      {
        path: '/items',
        name: 'Items',
        children: [
          {
            path: 'index',
            name: 'itemsIndex',
            component: () => import(/* webpackChunkName: "about" */ '../views/items/index.vue')
          },
          {
            path: 'create',
            name: 'itemsCreate',
            component: () => import(/* webpackChunkName: "about" */ '../views/items/create.vue')
          }
        ]
      },
      {
        path: '/users',
        name: 'users',
        children: [
          {
            path: 'index',
            name: 'usersIndex',
            component: () => import('../views/user/index.vue')
          },
          {
            path: 'create',
            name: 'usersCreate',
            component: () => import('../views/user/create.vue')
          }
        ]
      },
      {
        path: '/upload',
        name: 'upload',
        children: [
          {
            path: 'index',
            name: 'uploadIndex',
            component: () => import('../views/upload/index.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
