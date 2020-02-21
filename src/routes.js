//Contains all the routing, even though we are using a single page, 
//I want stil want to render different elements based on what route we are currently using
//Routing from within a single page gives better refreshing
import Vue from 'vue';
import VueRouter from 'vue-router';
import newAccount from './components/newAccount';
import login from './components/login';
import homepage from './components/homepage';
import chanceCalculator from './components/chanceCalculator';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: login },
    { path: '/newAccount', component: newAccount },
    { path: '/homepage', component: homepage },
    { path: '/chanceCalculator', component: chanceCalculator }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;