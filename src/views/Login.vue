<template>
  <div class="p-grid container p-my-3">
    <Card class="p-col-12 p-sm-8 p-md-6 p-lg-4 p-mx-auto">
      <template #header>
      </template>
      <template #title>
        Login
      </template>
      <template #content>
        <div class="p-fluid">
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" type="email" v-model="email" />
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <InputText id="password" type="password" v-model="password" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-d-flex p-justify-end">
          <Button icon="pi pi-sign-in" label="Login" @click="login" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>

</style>