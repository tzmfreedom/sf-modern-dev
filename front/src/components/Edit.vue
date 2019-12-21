<template>
  <div>
    <h1>Account Edit: {{ accountName }}</h1>
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
    this.accountName = this.account.Name
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      try {
        const res = await Account.update(this.account)
        if (res.success) {
          this.$bvToast.toast(`${res.id} を更新しました`, {
            title: '完了通知',
            variant: 'success',
            solid: true
          })
          this.$router.push({ name: 'detail', params: {
            id: res.id,
            notification: {
              title: '完了通知',
              content: `${res.id} を更新しました`,
              variant: 'success',
            },
          }})
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
