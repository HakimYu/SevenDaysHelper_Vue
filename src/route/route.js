import { createRouter, createWebHashHistory } from "vue-router";
import Content from '../components/Content.vue';
import Login from "../components/Login.vue";
import ExamOverviews from '../components/ExamOverviews.vue';
import Exam from '../components/Exam.vue';

const routes = [{
    name     : "Content",
    path     : "/",
    component: Content,
    children : [
        {
            name: "ExamOverviews",
            path: "ExamOverviews",
            component: ExamOverviews,
            
        },
        {
            name: "Exam",
            path: "Exam/:index",
            component: Exam,
            props: {index: Number}
        }

    ],
    
}, {
    name: "Login",
    path: "/login",
    component: Login,
} 
];

const router = createRouter({ history: createWebHashHistory(), routes: routes });

export default router;