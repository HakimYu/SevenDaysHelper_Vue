import { createApp } from 'vue';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './route/route';
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
import PrimeVue from 'primevue/config';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { userStore } from './store';
import { loginStore } from './store';

const pinia         = createPinia();
const app           = createApp(App);

app.use(Toast);
app.use(router);
app.use(pinia);
app.use(PrimeVue);
pinia.use(piniaPluginPersistedstate);

const theUser       = userStore();
const theLoginStore = loginStore()

theUser.loadToken(theLoginStore.token);



app.mount('#app');