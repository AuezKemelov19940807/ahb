import { createRouter, createWebHistory } from 'vue-router'
//components
import Home from '../pages/Home.vue'
import UserDetailView from '../components/UserDetailView.vue'
import CreateUser from '../components/CreateUser.vue'
import UpdateUser from '../components/UpdateUser.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user-detail/:id',
      name: 'UserDetailView',
      component: UserDetailView,
    },
    {
      path: '/add',
      name: 'add',
      component: CreateUser,
    },
    {
      path: '/update/:id',
      component: UpdateUser,
      name: 'update',
      props: true,
    },
  ],
})

export default router
