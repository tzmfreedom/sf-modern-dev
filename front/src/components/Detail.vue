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
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'
import momentFilter from '@/filters/moment.js'

export default {
  name: 'Detail',
  filters: {
    moment: momentFilter,
  },
  data() {
    return {
      account: {},
    }
  },
  async mounted() {
    const res = await Account.findById(this.$route.params.id);
    this.account = res.records[0];
  }
}
</script>

<style scoped>
</style>
