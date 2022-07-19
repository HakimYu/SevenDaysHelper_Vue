<script setup>
import { watch, reactive, onMounted } from "vue";
import Breadcrumb from "primevue/breadcrumb";
import Menubar from "primevue/menubar";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { userStore } from "../store";

const theUserStore = userStore();
const router      = useRouter();
const route       = useRoute();
const state       = reactive({items: []});
const invalid_breadcrumb_name_list = ['Content'];
const global_menu_items = reactive([
{
    icon: "pi pi-align-justify",
    items: [
        {
            icon: "pi pi-sign-out",
            label: "Sign out",
            command: signOut,
        },
    ],
},
]);
state.items       = updateBreadcrumb(route.matched);

onMounted(()=>{
    router.push({name: 'ExamOverviews'});
});
function updateBreadcrumb(matched) {
    let tmpItems = [];
    for(let i = 0; i < matched.length; ++i) {
        if(invalid_breadcrumb_name_list.indexOf(matched[i].name) > -1) continue;
        tmpItems.push({label: matched[i].name, to: matched[i].path});
    }

    return tmpItems;
}
function signOut() {
    theUserStore.clear();
    router.push({name: "Login"});
}

watch(()=> route.matched, ()=> {
    state.items = updateBreadcrumb(route.matched);
});
</script>

<template>
  <Menubar :model="global_menu_items" class="p-0 bg-indigo-500 border-indigo-500 border-noround  top-0">
    <template #start>
      <Breadcrumb class="text-lg bg-indigo-500 border-indigo-500" :home="{icon: 'pi pi-home', to: '/ExamOverviews'}" :model="state.items"></Breadcrumb>
    </template>
  </Menubar>
  <RouterView></RouterView>
</template>

