<template>
  <div>
    <h1>Account List</h1>
    <b-table sticky-header striped hover :fields="fields" :items="records">
      <template v-slot:cell(action)="data">
        <router-link :to="{name: 'detail', params: { id: data.item.Id }}">Detail</router-link>
      </template>
      <template v-slot:cell(CreatedDate)="data">
        {{ data.value | moment }}
      </template>
    </b-table>
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'
import momentFilter from '@/filters/moment.js'

export default {
  name: 'List',
  filters: {
    moment: momentFilter
  },
  data() {
    return {
      fields: [
        { key: 'action' },
        { key: 'Id', sortable: true },
        { key: 'Name', sortable: true },
        { key: 'CreatedDate', sortable: true },
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
