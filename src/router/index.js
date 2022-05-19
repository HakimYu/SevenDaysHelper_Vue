import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ScoreList from "@/components/ScoreList";
Vue.use(VueRouter)
const routes = [
{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: '七天网络助手'
    }
},
{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        title: '登录'
    }
},
{
    path: '/scoreList/:index',
    name: 'ScoreList',
    component: ScoreList,

}
]

const router = new VueRouter({
    routes
})

export default router