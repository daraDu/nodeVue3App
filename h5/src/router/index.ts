import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: Layout,
		redirect: '/article/index',
    children: [
      {
        path: '/article',
        name: 'Article',
        children: [
          {
            path: 'index',
            name: 'articleIndex',
            component: () => import(/* webpackChunkName: "about" */ '../views/article/index.vue')
          },
          {
            path: 'create',
            name: 'articleCreate',
            component: () => import(/* webpackChunkName: "about" */ '../views/article/create.vue')
          }
        ],
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
