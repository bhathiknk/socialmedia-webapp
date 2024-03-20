import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/Profile.vue'
import FeedView from '../views/Feed.vue'
import ConnectionView from '../views/ConnectionView.vue'
import CircularButton from '../components/CircularButton.vue'
import EventCalendar from "@/components/EventCalendar.vue"
import DiscussionForum from "../components/DiscussionForum/DiscussionForum.vue"
import DailyJournaling from "@/components/DailyJournal/DailyJournaling.vue";
import GradesTracking from "@/components/GradesTracking/GradesTracking.vue";
import ShortNote from "@/components/ShortNote/ShortNote.vue";
import ProfileEdit from "@/components/ProfileCom/ProfileEdit.vue";
import SignUp from "@/components/LoggingComponent/SignUp.vue";
import SignIn from "@/components/LoggingComponent/SignIn.vue";
import UserDetailEdit from "@/components/ProfileCom/UserDetailEdit.vue";
import AddFeed from "@/components/FeedCom/AddFeed.vue";
import AddJournal from "@/components/DailyJournal/AddJournal.vue"
import JournalDetailsModal from "@/components/DailyJournal/JournalDetailsModal.vue"
import AddDiscussion from "@/components/DiscussionForum/AddDiscussion.vue";
import AddShortNote from "@/components/ShortNote/AddShortNote.vue";
import CircularButtonProfile from "@/components/CircularButtonProfile.vue";
import MyQuestions from "@/components/DiscussionForum/MyQuestions.vue";

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
    path:'/string ',
    name:'CircularButtonProfile ',
    component: CircularButtonProfile
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: EventCalendar // You may need to adjust this depending on your route structure
  },
  {
    path: '/DiscussionForum',
    name: 'DiscussionForum',
    component: DiscussionForum
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
    path: '/ShortNote',
    name: 'ShortNote',
    component:ShortNote
  },
  {
    path:'/ProfileEdit',
    name:'ProfileEdit',
    component: ProfileEdit
  },
  {
    path:'/SignUp',
    name:'SignUp',
    component: SignUp
  },
  {
    path:'/SignIn',
    name:'SignIn',
    component: SignIn
  },
  {
    path:'/UserDetailEdit',
    name:'UserDetailEdit',
    component: UserDetailEdit
  },
  {
    path:'/AddFeed',
    name:'AddFeed',
    component: AddFeed
  },
  {
    path:'/AddJournal',
    name:'AddJournal',
    component: AddJournal
  },
  {
    path:'/JournalDetailsModal',
    name:'JournalDetailsModal',
    component: JournalDetailsModal
  },
  {
    path:'/AddDiscussion',
    name:'AddDiscussion',
    component: AddDiscussion
  },
  {
    path:'/AddShortNote',
    name:'AddShortNote',
    component: AddShortNote
  },
  {
    path:'/MyQuestions',
    name:'MyQuestions',
    component: MyQuestions
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
