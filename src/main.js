import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'font-awesome/css/font-awesome.css'; // or 'font-awesome/css/font-awesome.min.css' for the minified version


createApp(App).use(router).mount('#app')
