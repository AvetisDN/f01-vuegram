<template>
  <div class="p-mt-4">
    <Fieldset legend="Comments" :toggleable="true" :collapsed="true" @toggle="viewComments(post)">
      <Card class="comment" v-for="comment in postComments" :key="comment.id">
        <template #content>
          <h4>{{comment.userName}}, <span>{{formatDate(comment.created)}}</span></h4>
          <p>{{comment.content}}</p>
        </template>
      </Card>
    </Fieldset>
    <div>
      <div class="p-field p-mt-4 p-d-flex">
        <InputText type="text" v-model="newComment" class="grow" />
        <Button icon="pi pi-send" @click="addComment" />
      </div>
    </div>
  </div>
</template>

<script>
import {commentsCollection, auth, postsCollection} from "../../firebase";
import moment from 'moment'

export default {
  name: "Comments",
  props: ['post'],
  data() {
    return {
      postComments: [],
      newComment: ''
    }
  },
  methods: {
    formatDate(timestamp) {
      if(!timestamp) return '---'

      let date = new Date(timestamp)
      return moment(date).fromNow()
    },
    async viewComments(post) {
      this.postComments = []
      const docs = await commentsCollection.where('postId', '==', post.id).orderBy('created','desc').get()
      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })
    },
    async addComment() {
      await commentsCollection.add({
        created: Date.now(),
        content: this.newComment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name
      })
      await postsCollection.doc(this.post.id).update({
        comments: +this.post.comments + 1
      })
      this.newComment = ''
      await this.viewComments(this.post)
    }
  }
}
</script>

<style scoped lang="scss">
.comment {
  font-size: .8rem;
  margin-top: 1rem;
  background-color: var(--surface-d);
}
.grow {
  flex-grow: 1;
}
</style>