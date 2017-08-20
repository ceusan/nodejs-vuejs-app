import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'
import auth from '../auth'

Vue.use(Router)

// Check the user's auth status when the app starts
auth.checkAuth();

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
