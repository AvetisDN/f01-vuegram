<template>
  <Menubar :model="menuItems" class="p-justify-between p-px-3 container">
    <template #start>
      <img alt="logo" src="https://www.primefaces.org/primevue/showcase/img/logo.d32bce0e.svg" height="40" class="p-mr-2">
    </template>
    <template #end >
      <div class="p-d-flex p-align-center p-ml-3" v-if="userProfile">
        <Avatar :label="userProfile ? userProfile.name.substr(0, 1) : '-'" shape="circle" v-if="!userProfile.avatarURL"/>
        <Avatar :image="userProfile.avatarURL" shape="circle" v-else/>
        <div class="p-ml-3">
          {{userProfile ? userProfile.name : ''}}
        </div>
        <Button label="Exit" icon="pi pi-sign-out" class="p-ml-3 p-button-secondary" @click="logout"/>
      </div>
    </template>
  </Menubar>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "Navbar",
  data() {
    return{

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    ...mapState(['userProfile']),
    isAuth() {
      return this.userProfile !== null
    },
    menuItems() {
      return [
        {
          label: 'Home',
          icon: 'pi pi-home',
          to: '/',
        },
        {
          label: 'Account',
          icon: 'pi pi-cog',
          to: '/account',
          visible: this.isAuth
        },
        {
          label: 'Login',
          icon: 'pi pi-user',
          to: '/login',
          visible: !this.isAuth,
        },
        {
          label: 'Register',
          icon: 'pi pi-user-plus',
          visible: !this.isAuth,
          to: '/register',
        },
        // {
        //   label: 'Logout',
        //   icon: 'pi pi-sign-out',
        //   visible: this.isAuth,
        //   command: (event) => {
        //     this.logout()
        //   }
        // },
      ]
    }
  }
}
</script>

<style lang="scss">
  .p-menubar-root-list {
    flex-grow: 1;
    justify-content: flex-end;
  }
</style>