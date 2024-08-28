import {createWebHistory, createRouter} from 'vue-router';
import Helper from "../components/Helper.vue";
import Client from "../components/Client.vue";


const routes = [
    {
        path: '/client',
        name: 'client',
        component: Client,
    },
    {
        path: '/helper',
        name: 'helper',
        component: Helper,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
