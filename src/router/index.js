import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    meta:{title: '登录' },
    component: Login
  },
  {
    path: '/',
    meta:{title:'主页'},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children:[
      {
        path:'/index',
        meta:{title:'首页'},
        component:()=>import('../components/Index.vue')
      },
      {
        path:'/chapterManagement',
        meta:{title:'章节管理'},
        component:()=>import('../components/ChapterManagement.vue')
      },
      {
        path:'/knowledgePointManagement',
        meta:{title:'知识点管理'},
        component:()=>import('../components/KnowledgePointManagement.vue')
      },
      {
        path:'/materialManagement',
        meta:{title:'资料管理'},
        component:()=>import('../components/MaterialManagement.vue')
      },
      {
        path:'/questionBankManagement',
        meta:{title:'题库管理'},
        component:()=>import('../components/QuestionBankManagement.vue')
      },
      {
        path:'/algorithmManagement',
        meta:{title:'算法管理'},
        component:()=>import('../components/AlgorithmManagement.vue')
      },
      {
        path:'/tags',
        meta:{title:'标签'},
        component:()=>import('../views/Tags.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
