<template>
  <div v-if="posts.length">
    <div class="p-mb-3" v-for="post in posts" :key="post.id">
      <Panel>
        <template #header>
          <h4 class="p-m-0">{{post.userName}}</h4>
          <i>
            {{formatDate(post.created)}}
          </i>
        </template>
          <p>
            {{trimLength(post.content)}}
          </p>

          <div class="p-d-flex p-align-center p-justify-between p-mb-2">
            <div>
              <span>
                <i class="pi pi-comments"></i> {{post.comments}}
              </span>
              <span class="p-mx-5 likes"
                    @click="likePost(post)"
                    :class="{'pressed': userLikes.includes(post.id)}">
                <i class="pi pi-thumbs-up"></i> {{post.likes}}
              </span>
              <span class="likes" @click="disLikePost(post)"
                    :class="{'pressed': userDislikes.includes(post.id)}">
                <i class="pi pi-thumbs-down"></i> {{post.dislikes}}
              </span>
            </div>
            <div>
              <Button label="View post" class="p-button-success"/>
            </div>
          </div>
          <comments :post="post"/>
      </Panel>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapState} from "vuex";
import Comments from "./Comments";

export default {
  name: "Posts",
  components: {Comments},
  methods: {
    formatDate(timestamp) {
      if(!timestamp) return '---'

      let date = new Date(timestamp)
      return moment(date).fromNow()
    },
    trimLength(content) {
      if(content.length <= 150) return content
      return `${content.substr(0,150)}...`
    },
    likePost(post) {
      this.$store.dispatch('likePost', post)
    },
    disLikePost(post) {
      this.$store.dispatch('disLikePost', post)
    },
  },
  computed: {
    ...mapState(['posts', 'userProfile', 'userLikes', "userDislikes"])
  },
}
</script>

<style scoped>
  .likes {
    cursor: pointer;
  }
  .likes.pressed {
    color: var(--primary-color);
  }
</style>