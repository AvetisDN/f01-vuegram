<template>
  <div class="p-my-3">
    <Panel>
      <template #header>
        Welcome, {{userProfile ? userProfile.name : ''}}
      </template>
      <div class="p-d-flex p-align-center">
        <Avatar :label="userProfile ? userProfile.name.substr(0, 1) : '-'" shape="circle" size="large" v-if="!fileData && !userProfile.avatarURL"/>
        <Avatar :image="userProfile.avatarURL" shape="circle" size="large" v-else-if="!fileData && userProfile.avatarURL"/>
        <Avatar :image="fileData" shape="circle" size="large" v-else/>
        <input class="p-ml-3" type="file" @change="onFileChange" accept="image/jpeg, image/png">
        <Button icon="pi pi-send" @click="fileUpload" />
      </div>
    </Panel>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {files, usersCollection, auth} from '../firebase';

export default {
  name: "Account",
  data() {
    return {
      file: null,
      fileData: null,
    }
  },
  methods: {
    onFileChange(e) {
      let file = e.target.files[0]
      this.file = file
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.addEventListener('load', () => {
        this.fileData = fr.result
      })
    },
    async fileUpload() {
      const imgData = new FormData()
      imgData.append('image', this.file)
      const filePath = `avatars/${auth.currentUser.uid}-${this.file.name}`
      const metadata = {contentType: this.file.type}

      await files.ref().child(filePath).put(this.file, metadata)

      await usersCollection.doc(auth.currentUser.uid).update({
        avatar: filePath
      })
      this.$store.dispatch('fetchUserProfile', auth.currentUser)
    }
  },
  computed: {
    ...mapState(['userProfile'])
  }
}
</script>

<style scoped>

</style>