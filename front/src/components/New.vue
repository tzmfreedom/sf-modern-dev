<template>
  <div>
    <h1>Account New</h1>
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
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'

export default {
  name: 'New',
  data() {
    return {
      account: {
        Name: '',
      },
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const res = await Account.create(this.account)
      if (res.success) {
      //eslint-disable-next-line no-console
        console.log(res)
      }
    }
  }
}
</script>

<style scoped>
</style>
