import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontLayout from '../views/FrontLayout'
import Index from '../views/Index'
import Donate from '../views/Donate'
import Blog from '../views/Blog'
import Video from '../views/Video'
import Opensource from '../views/Opensource'
import BlogDetail from '@/views/BlogDetail'
import Search from '@/views/Search'
import Login from '@/views/Login'
import ProjectDetail from '@/views/ProjectDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'FrontLayout',
    component: FrontLayout,
    redirect: 'index',
    meta: { title: '大熊实验室' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: Index,
        meta: { title: '首页' }
      },
      {
        path: 'blog',
        name: 'Blog',
        component: Blog,
        meta: { title: '博客' }
      },
      {
        path: 'blogDetail/:blogId',
        name: 'BlogDetail',
        component: BlogDetail,
        meta: { title: '博客' }
      },
      {
        path: 'projectDetail/:projId',
        name: 'ProjectDetail',
        component: ProjectDetail,
        meta: { title: '博客' }
      },
      {
        path: 'video',
        name: 'Video',
        component: Video,
        meta: { title: '视频' }
      }, {
        path: 'opensource',
        name: 'Opensource',
        component: Opensource,
        meta: { title: '开源项目' }
      },
      {
        path: 'donate',
        name: 'Donate',
        component: Donate,
        meta: { title: '捐助' }
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: { title: '搜索' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '注册登录' }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 设置title
  if (to.meta.title) {
    document.title = '大熊实验室-' + to.meta.title
  }
  next()
})

export default router
