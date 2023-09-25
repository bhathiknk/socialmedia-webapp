import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/Profile.vue'
import FeedView from '../views/Feed.vue'
import ConnectionView from '../views/Connection.vue'
import CircularButton from '../components/CircularButton.vue'

const routes = [
  {
    path: '/',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/feed',
    name: 'Feed',
    component:FeedView
  },
  {
    path:'/connection',
    name:'Connection',
    component: ConnectionView
  },
  {
    path:'/string ',
    name:'CircularButton ',
    component: CircularButton
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
