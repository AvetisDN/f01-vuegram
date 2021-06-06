<template>
  <div class="p-grid container p-my-2">
    <div class="p-col-12 p-md-8">
      <Posts/>
    </div>
    <div class="p-col-12 p-md-4">
      <Sidebar/>
    </div>
  </div>
</template>

<script>

import Posts from "../components/home/Posts";
import Sidebar from "../components/home/Sidebar";
export default {
  name: 'Home',
  components: {Posts, Sidebar},
  methods: {
    test() {
      let x = 10
    }
  }
}
</script>
