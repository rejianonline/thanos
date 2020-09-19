import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'

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
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/house',
    component: Layout,
    meta: { roles: ['house'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/house/index'),
        name: 'House',
        meta: { title: '房产认证列表', icon: 'list', noCache: true, roles: ['house'] }
      },
      {
        path: 'details',
        component: () => import('@/views/house/HouseDetails'),
        name: 'HouseDetails',
        meta: { title: '房产认证详情', icon: 'edit', noCache: true, roles: ['house'] },
        hidden: true
      }
    ]
  },
  {
    path: '/auth-zr',
    component: Layout,
    meta: { roles: ['identify'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/auth-zr/index'),
        name: 'AuthZr',
        meta: { title: '真人认证列表', icon: 'list', noCache: true, roles: ['identify'] }
      },
      {
        path: 'details',
        component: () => import('@/views/auth-zr/AuthDetails'),
        name: 'AuthDetails',
        meta: { title: '真人认证详情', icon: 'edit', noCache: true, roles: ['identify'] },
        hidden: true
      }
    ]
  },
  {
    path: '/auth-name',
    component: Layout,
    meta: { roles: ['identify'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/auth-name/index'),
        name: 'AuthName',
        meta: { title: '实名认证列表', icon: 'list', noCache: true, roles: ['identify'] }
      },
      {
        path: 'details',
        component: () => import('@/views/auth-name/AuthDetails'),
        name: 'AuthDetailsName',
        meta: { title: '实名认证详情', icon: 'edit', noCache: true, roles: ['identify'] },
        hidden: true
      }
    ]
  },
  {
    path: '/edu',
    component: Layout,
    meta: { roles: ['edu'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/edu/index'),
        name: 'Edu',
        meta: { title: '学历认证列表', icon: 'list', noCache: true, roles: ['edu'] }
      },
      {
        path: 'details',
        component: () => import('@/views/edu/EduDetails'),
        name: 'EduDetails',
        meta: { title: '学历认证详情', icon: 'edit', noCache: true, roles: ['edu'] },
        hidden: true
      }
    ]
  },
  {
    path: '/photo',
    component: Layout,
    meta: { roles: ['selectPic'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/photo/index'),
        name: 'Photo',
        meta: { title: '精选照片认证列表', icon: 'list', noCache: true, roles: ['selectPic'] }
      },
      {
        path: 'details',
        component: () => import('@/views/photo/PhotoDetails'),
        name: 'PhotoDetails',
        meta: { title: '精选照片认证详情', icon: 'edit', noCache: true, roles: ['selectPic'] },
        hidden: true
      }
    ]
  },
  {
    path: '/width-draw',
    component: Layout,
    meta: { roles: ['withDraw'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/width-draw/index'),
        name: 'WidthDraw',
        meta: { title: '提现申请认证列表', icon: 'list', noCache: true, roles: ['withDraw'] }
      },
      {
        path: 'details',
        component: () => import('@/views/width-draw/WidthDrawDetails'),
        name: 'WidthDrawDetails',
        meta: { title: '提现申请认证详情', icon: 'edit', noCache: true, roles: ['withDraw'] },
        hidden: true
      }
    ]
  },
  {
    path: '/partner',
    component: Layout,
    meta: { roles: ['withDraw'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/partner/index'),
        name: 'Partner',
        meta: { title: '合伙人', icon: 'edit', noCache: true, roles: ['withDraw'] }
      }
    ]
  },
  {
    path: '/avatar',
    component: Layout,
    meta: { roles: ['avatar'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/avatar/index'),
        name: 'AvatarList',
        meta: { title: '头像审核列表', icon: 'list', noCache: true, roles: ['avatar'] }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: '/manage/',
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
