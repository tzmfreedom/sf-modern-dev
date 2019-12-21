<template>
  <div id="app">
    <div class="container">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">Vue on Salesforce</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-for="(menu, key) in menus" :key="key" :to="menu.to" :active="$route.path === menu.to">{{ menu.label }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      menus: [
        {
          to: '/accounts',
          label: 'List'
        },
        {
          to: '/accounts/new',
          label: 'New'
        },
        {
          to: '/accounts/adv_new',
          label: 'AdvancedNew'
        },
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.menu li {
  display: inline-block;
  margin-right: 20px;
}
</style>
