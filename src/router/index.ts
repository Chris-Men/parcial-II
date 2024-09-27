import { createRouter, createWebHistory } from 'vue-router';

const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Verifica si el token está presente
};

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/modules/auth/LoginPagina.vue'),
        },
        {
            path: '/registro',
            name: 'Registro',
            component: () => import('@/modules/auth/RegistroPagina.vue'),
        },
        {
            path: '/HomePagina',
            name: 'HomePagina',
            component: () => import('@/modules/HomePagina.vue'),
            beforeEnter: (to, from, next) => {
                isAuthenticated() ? next() : next('/login');
            },
        },
        {
            path: '/FavoritosPagina',
            name: 'FavoritosPagina',
            component: () => import('@/modules/FavoritosPagina.vue'),
            beforeEnter: (to, from, next) => {
                isAuthenticated() ? next() : next('/login');
            },
        },
        {
            path: '/HistorialPagina',
            name: 'HistorialPagina',
            component: () => import('@/modules/HistorialPagina.vue'),
            beforeEnter: (to, from, next) => {
                isAuthenticated() ? next() : next('/login');
            },
        },
        {
            path: '/ContactoPagina',
            name: 'ContactoPagina',
            component: () => import('@/modules/ContactoPagina.vue'),
            beforeEnter: (to, from, next) => {
                isAuthenticated() ? next() : next('/login');
            },
        },
    ],
});

export default router;
