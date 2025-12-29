import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import DashboardView from '../views/DashboardView.vue';
import UsersView from '../views/UsersView.vue';
import { getUser, getToken } from '../utils/auth';

const routes = [
  { 
    path: '/login', 
    component: AuthView,
    props: { isLogin: true },
    meta: { public: true } 
  },
  { 
    path: '/register', 
    component: AuthView,
    props: { isLogin: false },
    meta: { public: true } 
  },
  { path: '/', component: DashboardView },
  { path: '/users', component: UsersView, meta: { role: 'admin' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.public) return;

  if (!getToken()) return '/login';

  if (to.meta.role && getUser()?.role !== to.meta.role) {
    return { path: '/' };
  }
});

export default router;
