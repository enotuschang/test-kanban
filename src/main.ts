import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Dashboard from './components/Dashboard.vue'
import AddCard from './components/AddCard.vue'

const routes = [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    name: 'add-card',
    path: '/add-card',
    component: AddCard,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
const app = createApp(App)
app.use(router)
app.mount('#app')
