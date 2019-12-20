import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from './components/Root.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import App from './App.vue'

const routes = [
  { path: '/', component: Root },
  { path: '/accounts', component: List },
  { path: '/accounts/:id', name: 'detail', component: Detail }
]
const router = new VueRouter({
  routes
})
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
