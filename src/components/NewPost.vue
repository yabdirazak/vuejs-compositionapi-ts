<template>
  <post-writer :post="newPost" @save="save"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostWriter from "@/components/PostWriter.vue";
import { Post } from "@/mocks";
import moment from "moment";

export default defineComponent({
  name: "NewPost",
  components: {
    PostWriter
  },

  setup() {
    const newPost: Post = {
      id: '-1',
      title: 'New post',
      created: moment()
    }
    const save = (post: Post) => {
      console.log(post)
    }
    return {
      save,
      newPost
    }
  }
})
</script>

<style scoped>

</style>
