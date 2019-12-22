<template>
  <div>
    <h2>Account Search</h2>
    <b-row class="search-form">
      <b-form @submit="doSearch">
        <b-row>
          <b-col sm="2">
            <label for="name">Name:</label>
          </b-col>
          <b-col sm="2">
            <b-form-input id="name" type="text" v-model="search.Name"></b-form-input>
          </b-col>
          <b-col sm="2">
            <label for="id">Id:</label>
          </b-col>
          <b-col sm="2">
            <b-form-input id="id" type="text" v-model="search.Id"></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-button type="submit" variant="primary">Search</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-row>
    <b-table id="account-list" sticky-header striped hover :fields="fields" :items="records">
      <template v-slot:cell(isCheck)="data">
       <b-form-checkbox
         :id="`checkbox-${data.item.Id}`"
         :name="`checkbox-${data.item.Id}`"
         v-model="checks[data.index]"
         :value="data.item.Id"
       />
      </template>
      <template v-slot:cell(action)="data">
        <router-link :to="{name: 'detail', params: { id: data.item.Id }}">Detail</router-link> |
        <router-link :to="{name: 'edit', params: { id: data.item.Id }}">Edit</router-link> |
        <a href="#" @click.prevent="destroy(data.item.Id, data.index)">Delete</a>
      </template>
      <template v-slot:cell(CreatedDate)="data">
        {{ data.value | moment }}
      </template>
    </b-table>
    <Overlay v-show="loading" />
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Account from '@/sobjects/Account.js'
import momentFilter from '@/filters/moment.js'

export default {
  name: 'Search',
  filters: {
    moment: momentFilter
  },
  components: { Overlay },
  data() {
    return {
      loading: false,
      search: {
        Name: ''
      },
      fields: [
        { key: 'isCheck', label: '', thStyle: { width: '50px' } },
        { key: 'action', thStyle: { width: '200px' } },
        { key: 'Id', sortable: true },
        { key: 'Name', sortable: true },
        { key: 'CreatedDate', sortable: true },
      ],
      records: [],
      checks: [],
    }
  },
  methods: {
    async doSearch() {
      this.loading = true
      const res = await Account.search(this.search)
      this.loading = false
      this.records = res.records
      this.checks = []
      res.records.forEach(() => {
        this.checks.push(false)
      })
    },
    async destroy(sfid, index) {
      //eslint-disable-next-line no-console
      console.log(this.checks.filter((c) => c !== false))
      if (confirm(`本当に削除しますか？: ${sfid}`)) {
        this.loading = true
        await Account.destroy(sfid)
        this.loading = false
        this.records.splice(index, 1);
        this.$bvToast.toast(`${sfid} を削除しました`, {
          title: '完了通知',
          variant: 'success',
          solid: true
        })
      }
    }
  },
  async mounted() {
    this.loading = true
    const res = await Account.findAll()
    this.loading = false
    this.records = res.records
    this.checks = []
    res.records.forEach(() => {
      this.checks.push(false)
    })
  }
}
</script>

<style scoped>
.search-form {
  border: solid #eee 1px;
  margin: 20px;
  padding: 20px;
}
.search-form label {
  line-height: 2.25em;
}
</style>
