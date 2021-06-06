<template>
  <Card>
    <template #content>
        <div class="p-field">
          <label for="new-post">Create a post</label>
          <Textarea id="new-post" rows="5" v-model="newPost"></Textarea>
        </div>
    </template>
    <template #footer>
      <div class="p-d-flex p-justify-between p-align-center">
        <div>
          {{newPost.length}}
          {{newPost.length > 200 ? 'too much' : ''}}
        </div>
        <Button icon="pi pi-plus-circle" label="Create" @click="createPost" />
      </div>
    </template>
  </Card>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      newPost: ''
    }
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost', this.newPost)
      this.newPost = ''
    }
  }
}
</script>

<style scoped>
  #new-post {
    resize: none;
    width: 100%;
  }
</style>