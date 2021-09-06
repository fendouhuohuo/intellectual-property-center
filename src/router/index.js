import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/demand',
    children: [{
      path: 'demand',
      name: 'demand',
      component: () => import('@/views/demand/index'),
      meta: { title: '需求管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/reqDetail',
    component: Layout,
    redirect: '/reqDetail/reqDetail',
    children: [{
      path: 'reqDetail/:id',
      name: 'reqDetail',
      component: () => import('@/views/demand/reqDetail'),
      meta: { title: '需求详情', icon: 'dashboard' },
      hidden: true
    }]
  },

  {
    path: '/subReqDetail',
    component: Layout,
    redirect: '/subReqDetail/subReqDetail',
    children: [{
      path: 'subReqDetail/:id',
      name: 'subReqDetail',
      component: () => import('@/views/demand/subReqDetail'),
      meta: { title: '子需求详情', icon: 'dashboard' },
      hidden: true
    }]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'table' }
      },
    ]
  },

  {
    path: '/orderDetail',
    component: Layout,
    redirect: '/orderDetail/orderDetail',
    children: [
      {
        path: 'orderDetail/:id',
        name: 'orderDetail',
        component: () => import('@/views/order/orderDetail'),
        meta: { title: '订单详情', icon: 'table' },
        hidden: true
      },
    ]
  },

  {
    path: '/processTemplate',
    component: Layout,
    children: [
      {
        path: 'processTemplate',
        name: 'processTemplate',
        component: () => import('@/views/processTemplate/index'),
        meta: { title: '流程模板库', icon: 'form' }
      }
    ]
  },


  {
    path: '/message',
    component: Layout,
    redirect: '/message/message',
    children: [
      {
        path: 'message',
        name: 'message',
        component: () => import('@/views/message/index'),
        meta: { title: '我的消息', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
