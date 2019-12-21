import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Root from './components/Root.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import New from './components/New.vue'
import AdvancedNew from './components/AdvancedNew.vue'
import Edit from './components/Edit.vue'
import App from './App.vue'

const routes = [
  { path: '/', component: Root },
  { path: '/accounts', component: List },
  { path: '/accounts/new', name: 'new', component: New },
  { path: '/accounts/adv_new', name: 'adv_new', component: AdvancedNew },
  { path: '/accounts/:id', name: 'detail', component: Detail },
  { path: '/accounts/:id/edit', name: 'edit', component: Edit },
]
const router = new VueRouter({
  routes
})

Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
