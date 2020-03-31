//Contains all the routing, even though we are using a single page, 
//I want stil want to render different elements based on what route we are currently using
//Routing from within a single page gives better refreshing
import Vue from 'vue';
import VueRouter from 'vue-router';
import newAccount from './components/newAccount';
import login from './components/login';
import homepage from './components/homepage';
import chanceCalculator from './components/chanceCalculator';
import createProject from './components/createProject';
import recordProjectData from './components/recordProjectData';
import viewProject from './components/viewProject';
import editProject from './components/editProject';
import recordTFTStats from './components/recordTFTStats';
import viewTFTStats from './components/viewTFTStats';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: login },
    { path: '/newAccount', component: newAccount },
    { path: '/homepage', component: homepage },
    { path: '/chanceCalculator', component: chanceCalculator },
    { path: '/createProject', component: createProject },
    { path: '/recordProjectData', component: recordProjectData },
    { path: '/viewProject', component: viewProject },
    { path: '/editProject', component: editProject },
    { path: '/recordTFTStats', component: recordTFTStats },
    { path: '/viewTFTStats', component: viewTFTStats }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;