<template>
  <div>
    <h1>Account Advanced New</h1>
      <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
        description="Account Name"
      >
        <b-form-input
          id="input-1"
          v-model="account.Name"
          type="text"
          required
          placeholder="Account Name"
          :state="error.account.Name === ''"
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">{{ error.account.Name }}</b-form-invalid-feedback>
      </b-form-group>
      <b-button type="button" @click="addContact" >Add Contact</b-button>
      <b-table sticky-header striped hover :fields="contactFields" :items="account.Contacts">
        <template v-slot:cell(action)="data">
          <a href="#" @click.prevent="deleteContact(data.index)">Delete</a>
        </template>
        <template v-slot:cell(LastName)="data">
          <b-form-input class="border-0 no-shadow p-1" type="text" v-model="data.item.LastName"></b-form-input>
        </template>
        <template v-slot:cell(FirstName)="data">
          <b-form-input class="border-0 no-shadow p-1" type="text" v-model="data.item.FirstName"></b-form-input>
        </template>
      </b-table>
      <b-button type="submit" variant="primary">Create</b-button>
    </b-form>
    <Overlay v-show="loading" />
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Account from '@/sobjects/Account.js'

export default {
  name: 'AdvancedNew',
  components: { Overlay },
  data() {
    return {
      loading: false,
      error: {
        account: {
          Name: '',
        }
      },
      account: {
        Name: '',
        Contacts: [],
      },
      contactFields: [
        { key: 'action' },
        { key: 'Id' },
        { key: 'LastName' },
        { key: 'FirstName' },
      ]
    }
  },
  methods: {
    addContact() {
      //eslint-disable-next-line no-console
      console.log(this.account.Contacts)
      this.account.Contacts = this.account.Contacts.concat([
        {
          LastName: '',
          FirstName: ''
        }
      ])
    },
    deleteContact(index) {
      this.account.Contacts.splice(index, 1);
    },
    async onSubmit(e) {
      e.preventDefault()
      try {
        this.loading = true
        const res = await Account.create(this.account)
        if (res.success) {
        //eslint-disable-next-line no-console
          this.$router.push({ name: 'detail', params: { id: res.id }})
        }
      } catch(e) {
        //eslint-disable-next-line no-console
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
