import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/HomeScreen.vue';
import Login from './components/LoginScreen.vue';
import Register from './components/RegisterScreen.vue';
import Dashboard from './components/DashboardScreen.vue';

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/dashboard',
        component: Dashboard
    }
];

export default new VueRouter({routes})