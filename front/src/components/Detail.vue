<template>
  <div>
    <h1>Account Detail: {{ account.Name }}</h1>
    <b-table-simple hover small caption-top responsive>
    <b-tfoot>
      <b-tr>
        <b-th>Id</b-th>
        <b-td>{{ account.Id }} </b-td>
      </b-tr>
      <b-tr>
        <b-th>Name</b-th>
        <b-td>{{ account.Name }} </b-td>
      </b-tr>
      <b-tr>
        <b-th>CreatedDate</b-th>
        <b-td>{{ account.CreatedDate | moment }} </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
  <h2>Contact List</h2>
  <b-table sticky-header striped hover :items="account.Contacts">
  </b-table>
  <b-button :to="{name: 'edit', params: { id: account.Id }}">Edit</b-button>
  <Overlay v-show="loading" />
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Account from '@/sobjects/Account.js'
import momentFilter from '@/filters/moment.js'

export default {
  name: 'Detail',
  filters: {
    moment: momentFilter,
  },
  components: { Overlay },
  data() {
    return {
      loading: true,
      account: {},
    }
  },
  async mounted() {
    if (this.$route.params.notification) {
      const notification = this.$route.params.notification
      this.$bvToast.toast(notification.content, {
        title: notification.title,
        variant: notification.variant,
        solid: true
      })
    }
    const res = await Account.findById(this.$route.params.id);
    this.loading = false
    this.account = res.records[0];
  }
}
</script>

<style scoped>
</style>
