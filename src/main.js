import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCookies from "vue-cookies"
Vue.use(VueCookies);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
new Vue({
    router,
    vuetify,
    VueCookies,
    render: h => h(App)
}).$mount('#app')