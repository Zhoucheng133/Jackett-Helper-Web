import {createRouter, createWebHistory} from "vue-router";

const router=createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/list"
    },
    {
      name: "登录",
      path: "/login",
      component: ()=>import("../pages/login.vue")
    },
    {
      name: "注册",
      path: "/register",
      component: ()=>import("../pages/register.vue")
    },
    {
      name: "列表",
      path: "/list",
      component: ()=>import("../pages/list.vue")
    },
    {
      name: "所有",
      path: "/all/:id",
      component: ()=>import("../pages/all.vue")
    }
  ]
})

export default router;