import Vue from 'vue'
import VueRouter from 'vue-router'
import console from "@/router/routers/console"
import Layout from "@/layout/layout"
import banner from "@/router/routers/banner"
import topic from "@/router/routers/topic"
import lesson from "@/router/routers/lesson"

import Nprogress from "nprogress"  //进度条
Vue.use(VueRouter)
Vue.use(Nprogress)

export const routes = [
    {
    path: "/",
    redirect: "/dashboard",
    component: Layout,    
    meta:{
        hidden:true
        }
    },
    console,
    banner,
    topic,
    lesson
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to,from,next)=>{
    Nprogress.start();
    next()
})

router.afterEach((to)=>{
    document.title = to.meta.title + ' - 稻香果农'
    Nprogress.done()
})

export default router