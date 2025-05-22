import {createRouter, createWebHistory} from "vue-router";

const router=createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "主页",
      path: "/",
      component: ()=>import("../pages/home.vue")
    },
  ]
})

export default router;