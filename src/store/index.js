import { createStore } from 'vuex'
import * as fb from '../firebase'
import router from '../router'

const store = createStore({
  state: {
    userProfile: null,
    posts: [],
    userLikes: [],
    userDislikes: [],
    comments: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setLikes(state, val) {
      state.userLikes = val
    },
    setDislikes(state, val) {
      state.userDislikes = val
    }
  },
  actions: {
    async login({dispatch}, form) {
      const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      dispatch('fetchUserProfile', user)
    },
    async logout({commit}) {
      await fb.auth.signOut()
      commit('setUserProfile', null)
      router.push('/login')
    },
    async fetchUserProfile({commit}, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      if(userProfile.data().avatar) {
        const avatarURL = await fb.files.ref().child(userProfile.data().avatar).getDownloadURL()
        commit('setUserProfile', {...userProfile.data(), avatarURL})
      } else {
        commit('setUserProfile', userProfile.data())
      }
      router.push('/')
    },
    async register({dispatch}, form) {
      const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        name: form.name
      })
      dispatch('fetchUserProfile', user)
    },
    async createPost({state, commit}, post) {
      await fb.postsCollection.add({
        created: Date.now(),
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
        dislikes: 0,
        content: post
      })
    },
    async likePost({commit}, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      const doc = await fb.likesCollection.doc(docId).get()
      if(doc.exists) {
        await fb.likesCollection.doc(docId).delete()

        await fb.postsCollection.doc(post.id).update({
          likes: post.likes - 1
        })
      } else {
        await fb.likesCollection.doc(docId).set({
          postId: post.id,
          userId: userId
        })
        await fb.postsCollection.doc(post.id).update({
          likes: post.likes + 1
        })
        const docDislike = await fb.dislikesCollection.doc(docId).get()
        if(docDislike.exists) {
          await fb.dislikesCollection.doc(docId).delete()

          await fb.postsCollection.doc(post.id).update({
            dislikes: post.dislikes - 1
          })
        }
      }
    },
    async disLikePost({commit}, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      const doc = await fb.dislikesCollection.doc(docId).get()
      if(doc.exists) {
        await fb.dislikesCollection.doc(docId).delete()

        await fb.postsCollection.doc(post.id).update({
          dislikes: post.dislikes - 1
        })

      } else {
        await fb.dislikesCollection.doc(docId).set({
          postId: post.id,
          userId: userId
        })

        await fb.postsCollection.doc(post.id).update({
          dislikes: post.dislikes + 1
        })

        const docLike = await fb.likesCollection.doc(docId).get()
        if(docLike.exists) {
          await fb.likesCollection.doc(docId).delete()

          await fb.postsCollection.doc(post.id).update({
            likes: post.likes - 1
          })
        }

      }
    },
  },
  modules: {
  }
})

fb.postsCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
  let postsArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })
  store.commit('setPosts', postsArray)
})

fb.likesCollection.onSnapshot(snapshot => {
  let likesArray = []
  snapshot.forEach(doc => {
    let like = doc.data()
    if(fb.auth.currentUser.uid === like.userId) {
      likesArray.push(like.postId)
    }
  })
  store.commit('setLikes', likesArray)
})
fb.dislikesCollection.onSnapshot(snapshot => {
  let dislikesArray = []
  snapshot.forEach(doc => {
    let dislike = doc.data()
    if(fb.auth.currentUser.uid === dislike.userId) {
      dislikesArray.push(dislike.postId)
    }
  })
  store.commit('setDislikes', dislikesArray)
})

export default store