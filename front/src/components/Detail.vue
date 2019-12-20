<template>
  <div>
    <h1>Account Detail</h1>
    <table>
      <tbody>
        <tr>
        <th>Id</th>
        <td>{{ account.Id }}</td>
        </tr>
        <tr>
        <th>Name</th>
        <td>{{ account.Name }}</td>
        </tr>
        <tr>
        <th>CreatedDate</th>
        <td>{{ account.CreatedDate | moment }}</td>
        </tr>
      </tbody>
    </table>
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
