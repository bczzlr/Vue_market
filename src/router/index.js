import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../views/Book.vue'
import Login from '../views/login.vue'
import Success from '../views/success.vue'
import Register from '../views/register.vue'
import Main from '../views/main.vue'
import Admin from '../views/admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/vuebook',
    name: 'book',
    component: Book
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
