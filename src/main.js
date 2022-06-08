import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import VueCookies from "vue-cookies"
import "viewerjs/dist/viewer.css";
import VueViewer from 'v-viewer'
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};

Vue.use(Toast, options);
Vue.use(VueCookies);
Vue.use(VueViewer);
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