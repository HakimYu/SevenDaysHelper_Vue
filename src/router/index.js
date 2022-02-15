import Vue from 'vue'
import VueRouter from 'vue-router'
import SevenDaysHelper from '../views/SevenDaysHelper'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'SevenDaysHelper',
    component: SevenDaysHelper,
    meta: {
      title: '七天网络助手'
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
