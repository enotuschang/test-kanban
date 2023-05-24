import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Dashboard from './components/Dashboard.vue'
import AddCard from './components/AddCard.vue'

const app = createApp(App)

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
app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
