import Vue from 'vue'
import VueRouter from 'vue-router'
import StuHelper from '../views/CaKStudyHelper'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'SevenDaysHelper',
    component: StuHelper,
    meta: {
        title: '七天网络助手'
    }
}, ]

const router = new VueRouter({
    routes
})

export default router