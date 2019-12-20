<template>
  <div>
    <h1>Account List</h1>
    <b-table sticky-header striped hover :fields="fields" :items="records">
      <template v-slot:cell(action)="data">
        <router-link :to="{name: 'detail', params: { id: data.item.Id }}">Detail</router-link>
      </template>
    </b-table>
    <!-- <table>
      <thead>
        <tr>
          <th></th>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, key) in records" :key="key">
          <td>
            <router-link :to="{name: 'detail', params: { id: record.Id }}">Detail</router-link>
          </td>
          <td>{{ record.Id }}</td>
          <td>{{ record.Name }}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'

export default {
  name: 'List',
  data() {
    return {
      fields: [
        'action',
        'Id',
        'Name',
      ],
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
.list-icon {
  fill: currentColor;
  color: red;
}
</style>
