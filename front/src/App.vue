<template>
  <div id="app">
    <div class="container">
    <ul class="menu">
    <li><router-link to="/">root</router-link></li>
    <li><router-link to="/accounts">Account List</router-link></li>
    <li><router-link to="/accounts/new">Account New</router-link></li>
    <li><router-link to="/accounts/adv_new">Account Advanced New</router-link></li>
    </ul>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
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
