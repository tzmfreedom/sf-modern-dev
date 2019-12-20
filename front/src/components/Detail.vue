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
  </div>
</template>

<script>
import moment from 'moment'
import Account from '@/sobjects/Account.js'

export default {
  name: 'Detail',
  filters: {
    moment: (date) => {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  data() {
    return {
      account: {},
    }
  },
  async mounted() {
    const account = await Account.findById(this.$route.params.id);
    this.account = account[0];
  }
}
</script>

<style scoped>
</style>
