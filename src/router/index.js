import Vue from "vue";
import nprogress from "nprogress";
import "nprogress/nprogress.css"
import VueRouter from "vue-router";

import NotFound from '@/views/404'
import Forbidden from '@/views/403'


import findLast from 'lodash/findLast'
import { check, isLogin } from "@/utils/auth";
import {notification} from 'ant-design-vue'

const origin_push = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return origin_push.call(this,location).catch(err => err);
}

Vue.use(VueRouter);


const routes = [
  // user
  {
    path: "/user",
    hideInMenu: true,
    component: ()=> import(/* webpackChunkName: "user" */"../layouts/UserLayout.vue"),
    // component: {render: h=> h("router-view")},
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: "/user/login",
        name: "login",
        component: ()=> import(/* webpackChunkName: "user" */ "../views/Users/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: ()=> import(/* webpackChunkName: "user" */ "../views/Users/Register.vue")
      },
    ],
  },
  
  // 约定规范，有name才放到路由
  {
    path: "/",
    meta: {authority: ['user','admin']},
    component: ()=> import(/* webpackChunkName: "dashboard" */ "../layouts/BasicLayout.vue"),
    children: [
      // {
      //   path: "/",
      //   redirect: "/dashboard/analysis"
      // },

      // dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {icon: "dashboard", title: "仪表盘"},
        component: {render: h => h("router-view")},
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: {title: "分析页", },
            component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue")
          }
        ]
      },
      
      // form
      {
        path: "/form",
        name: "form",
        component: {render: h => h("router-view")},
        meta: {icon: "form", title: "表单", authority: ['admin']},
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: {title: "基础表单"},
            component: ()=> import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            // hideChildrenInMenu: true,
            meta: {title: "分布表单"},
            component: ()=> import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                // title: "表单信息",
                meta: {title: "表单信息"},
                component: ()=> import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1.vue"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                meta: {title: "确认信息"},
                component: ()=> import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2.vue"),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                meta: {title: "结果信息"},
                component: ()=> import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3.vue"),
              },
            ]
          },
        ]
      },
      
      // project-management
      {
        path: "/pro-manage",
        name: "pro-manage",
        component: {render: h => h("router-view")},
        meta: {icon: "project", title: "项目管理", authority: ['admin']},
        children: [
          {
            path: "/pro-manage/basic",
            name: "basicManage",
            meta: {title: "基础管理"},
            component: ()=> import(/* webpackChunkName: "form" */ "../views/Project-Management/index.vue")
          },
        ]
      }
    ]
  },

  // 403
  {
    path: "/403",
    name: '403',
    hideInMenu: true,
    component: Forbidden,
  },

  // 404
  {
    path: "*",
    name: '404',
    hideInMenu: true,
    component: NotFound
  }

];

const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next)=> {
  if (to.path !== from.path) {
    nprogress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    }else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description:
          '没有权限访问唉，请联系管理员咨询.',
      });
      next({
        path: '/403',
      })
    }
    nprogress.done()
  }

  next()
})

router.afterEach(()=> {
  nprogress.done()
})

export default router;
