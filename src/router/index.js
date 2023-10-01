import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/Profile.vue'
import FeedView from '../views/Feed.vue'
import ConnectionView from '../views/Connection.vue'
import CircularButton from '../components/CircularButton.vue'
import EventCalendar from "@/components/EventCalendar.vue"
import GoalSetting from "../components/GoalSetting.vue"
import DailyJournaling from "@/components/DailyJournaling.vue";
import GradesTracking from "@/components/GradesTracking.vue";
import ResourceLibrary from "@/components/ResourceLibrary.vue";
import ToDo from "@/components/ToDo.vue"
import ProfileEdit from "@/components/ProfileEdit.vue";

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
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: EventCalendar // You may need to adjust this depending on your route structure
  },
  {
    path: '/goal',
    name: 'goal',
    component: GoalSetting
  },
  {
    path: '/DailyJournaling',
    name: 'DailyJournaling',
    component: DailyJournaling
  },
  {
    path: '/GradesTracking',
    name: 'GradesTracking',
    component: GradesTracking
  },
  {
    path: '/ResourceLibrary',
    name: 'ResourceLibrary',
    component: ResourceLibrary
  },
  {
    path: '/ToDo',
    name: 'ToDo',
    component: ToDo
  },
  {
    path:'/ProfileEdit',
    name:'ProfileEdit',
    component: ProfileEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
