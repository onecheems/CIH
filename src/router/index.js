import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Compete from '@/components/Compete'
import Us from '@/components/Us'
import Login from '@/components/common/Login'
import Member from '@/components/Member'
import Manager from '@/components/manager/Manager'
import Information from '@/components/manager/Information'
import Rights from '@/components/manager/Rights'

import Student from '@/components/student/Student'
import S_info from '@/components/student/S_info'
import S_team from '@/components/student/S_team'
import S_msg from '@/components/student/S_msg'
import S_Com from '@/components/student/S_Com'


import Teacher from '@/components/teacher/Teacher'
import Com from '@/components/teacher/Com'
import Info from '@/components/teacher/Info'
import Msg from '@/components/teacher/Msg'
import Team from '@/components/teacher/Team'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      redirect: '/welcome',
      component: Home,
      children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/compete',
        component: Compete
      },
      {
        path: '/aboutus',
        component: Us
      }

      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/member',
      component: Member,
      children: [{
        path:'/member/welcome',
        component:Welcome
      }, {
        path:'/member/compete',
        component:Compete
      }, {
        path:'/member/aboutus',
        component:Us
      },{
          path: '/manager',
          component: Manager,
          redirect: '/information',
          children: [{
            path: '/information',
            component: Information
          }, {
            path: '/rights',
            component: Rights
          }]
        }, {
          path: '/student',
          component: Student,
          redirect: '/studentInformation',
          children: [{
              path: '/studentInformation',
              component: S_info
            },
            {
              path: '/studentMsg',
              component: S_msg
            },
            {
              path: '/studentTeam',
              component: S_team
            },
            {
              path: '/studentCom',
              component: S_Com
            }
          ]
        }, {
          path: '/teacher',
          component: Teacher,
          redirect: '/teacherInformation',
          children: [{
            path: '/teacherInformation',
            component: Info
          }, {
            path: '/teacherTeam',
            component: Team
          }, {
            path: '/teacherCom',
            component: Com
          }, {
            path: '/teachermsg',
            component: Msg
          }]
        }

      ]
    }

  ]
})
//为路由对象添加  beforEach导航守卫 ，使只有登录后携带了token后才有权进入页面，否则跳转到登录页面
//to:将要去的路径  from:从哪里来的路径  next() ：放行   next('/login)：强制跳转
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else if (to.path == '/welcome') {
    next()
  } else if (to.path == '/aboutus') {
    next()
  } else if (to.path == '/compete') {
    next()
  } else {
    const localtoken = window.sessionStorage.getItem("token");
    //是否存在token 不存在强制跳转登录页面 存在放行
    if (!localtoken) {
      next('/login')
    } else {
      next();
    }
  }
})

export default router;
