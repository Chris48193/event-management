import { createWebHistory, createRouter } from "vue-router";
import GuestAdd from "./components/guests/GuestAdd.vue";
import GuestList from "./components/guests/GuestList.vue";
import LoginAdmin from "./components/auth/LoginAdmin.vue";
import WelcomePage from "./components/pages/WelcomePage.vue";
import store from "./store/index.js";

const routes = [
    {
        path: "/",
        component: WelcomePage
    },
    {
        path: "/list",
        component: GuestList,
        meta: { requiresAuth: true }
    },
    {
        path: "/add",
        component: GuestAdd,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        component: LoginAdmin,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function(to, _, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else {
        next()
    }
});

export default router;