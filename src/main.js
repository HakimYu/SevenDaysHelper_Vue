import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import VueCookies from "vue-cookies"
import VueViewer from 'v-viewer'

Vue.use(VueCookies)
Vue.use(VueViewer)
Vue.config.productionTip = false

//router title setting
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')