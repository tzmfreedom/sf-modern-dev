<template>
  <div>
    <svg aria-hidden="true" class="slds-icon slds-icon-standard-contact">
       <use xlink:href="{!URLFOR($Asset.SLDS, 'assets/icons/standard-sprite/svg/symbols.svg#contact')}"></use>
    </svg>
    <div>Foo</div>
    <table>
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
    </table>
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'

export default {
  name: 'List',
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
.list-icon {
  fill: currentColor;
  color: red;
}
</style>
