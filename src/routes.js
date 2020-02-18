//Contains all the routing, even though we are using a single page, we want stil want to render different routes
import Vue from 'vue';
import VueRouter from 'vue-router';
import newAccount from './components/newAccount';
import login from './components/login';
import homepage from './components/homepage';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: login },
    { path: '/newAccount', component: newAccount },
    { path: '/homepage', component: homepage }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;