import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: () =>
            import ("../views/Login.vue")
    },
    {
        path: "/Info",
        name: "Info",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Info.vue")
    },
    {
        path: "/Edit",
        name: "Edit",
        component: () =>
            import ("../views/Edit.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;