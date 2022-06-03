import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Exam from "@/views/Exam.vue";
import Error from "@/views/Error.vue";
import ExamDetail from "@/components/ExamDetail";

Vue.use(VueRouter)
const routes = [
{
    path: '/exam/:index/:subject',
    name: 'ExamDetail',
    component: ExamDetail,
    props: {
        index: Number,
        subject: String,
        subjectInfo: Object,
    }
},
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
    path: '/exam/:index',
    name: 'Exam',
    component: Exam,
    props: {
        index: Number
    },
},
{
    path: '/error/:error',
    name: 'Error',
    component: Error,
    props: {
        error: String
    },
}
]

const router = new VueRouter({
    routes
})

export default router