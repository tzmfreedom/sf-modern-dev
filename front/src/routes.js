import Root from './components/Root.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import New from './components/New.vue'
import AdvancedNew from '@/components/AdvancedNew.vue'
import Edit from '@/components/Edit.vue'
import Search from '@/components/Search.vue'

export default [
  { path: '/', component: Root },
  { path: '/accounts', component: List },
  { path: '/accounts/new', name: 'new', component: New },
  { path: '/accounts/adv_new', name: 'adv_new', component: AdvancedNew },
  { path: '/accounts/search', name: 'search', component: Search },
  { path: '/accounts/:id', name: 'detail', component: Detail },
  { path: '/accounts/:id/edit', name: 'edit', component: Edit },
];