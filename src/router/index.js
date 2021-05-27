import Vue from 'vue'
import VueRouter from 'vue-router'
import "../plugins/firebaseInit";

import Login from '../views/Login.vue'
import ScrapeIndex from '../views/Scrape/Scrape.vue'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Login
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/scrape',
        name: 'scrape-index',
        component: ScrapeIndex,
        meta: {
            requiresAuth: true
        }
    },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await firebase.getCurrentUser()) {
        next('login');
    } else {
        next();
    }
});

export default router
