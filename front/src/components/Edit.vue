<template>
  <div>
    <h1>Account Edit: {{ account.Name }}</h1>
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

      <b-button type="submit" variant="primary">Update</b-button>
    </b-form>
  </div>
</template>

<script>
import Account from '@/sobjects/Account.js'

export default {
  name: 'New',
  data() {
    return {
      error: {
        account: {
          Name: '',
        }
      },
      account: {},
    }
  },
  async mounted() {
    const res = await Account.findById(this.$route.params.id)
    this.account = res.records[0]
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      try {
        const res = await Account.update(this.account)
        if (res.success) {
        //eslint-disable-next-line no-console
          this.$router.push({ name: 'detail', params: { id: res.id }})
        }
      } catch(e) {
        //eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
