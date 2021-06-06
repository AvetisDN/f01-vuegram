<template>
  <div class="p-grid container p-my-3">
    <Card class="p-col-12 p-sm-8 p-md-6 p-lg-4 p-mx-auto">
      <template #header>
      </template>
      <template #title>
        Register
      </template>
      <template #content>
        <div class="p-fluid">
          <div class="p-field">
            <label for="username">Username</label>
            <InputText id="username" type="text" v-model="username" />
          </div>
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
          <Button icon="pi pi-user-plus" label="Register" @click="register" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        name: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>

</style>