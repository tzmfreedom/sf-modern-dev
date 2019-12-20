<template>
  <div>
    <div>Foo22</div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, key) in records" :key="key">
          <td>{{ record.Id }}</td>
          <td>{{ record.Name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'

export default {
  name: 'Foo',
  data() {
    return {
      records: [],
    }
  },
  async mounted() {
    const records = await Account.findAll()
    this.records = records
  }
}
</script>

<style scoped>
</style>
