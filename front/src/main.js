import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from './components/Root.vue'
import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'
import App from './App.vue'

const routes = [
  { path: '/', component: Root },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
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
