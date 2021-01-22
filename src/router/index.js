import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta:{},
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    meta:{title:'主页'},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children:[
      {
        path:'/chapterManagement',
        meta:'章节管理',
        component:()=>import('../components/ChapterManagement.vue')
      },
      {
        path:'/knowledgePointManagement',
        meta:'知识点管理',
        component:()=>import('../components/KnowledgePointManagement.vue')
      },
      {
        path:'/materialManagement',
        meta:'资料管理',
        component:()=>import('../components/MaterialManagement.vue')
      },
      {
        path:'/questionBankManagement',
        meta:'题库管理',
        component:()=>import('../components/QuestionBankManagement.vue')
      },
      {
        path:'/algorithmManagement',
        meta:'算法管理',
        component:()=>import('../components/AlgorithmManagement.vue')
      },
      {
        path:'/tags',
        meta:'标签',
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
