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
          :state="error.account.Name === ''"
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">{{ error.account.Name }}</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Create</b-button>&nbsp;
      <b-button :to="{name: 'list'}">Back to List</b-button>
    </b-form>
    <Overlay v-show="loading" />
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Account from '@/sobjects/Account.js'

export default {
  name: 'New',
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
      },
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      try {
        this.loading = true
        const res = await Account.create(this.account)
        this.loading = false
        if (res.success) {
          this.$router.push({ name: 'detail', params: {
            id: res.id,
            notification: {
              title: '完了通知',
              content: `${res.id} を作成しました`,
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
