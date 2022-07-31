<template>
  <div
      class="panel-block"
  >
    <a>{{ post.title }}, </a>
    <div>{{ post.created.format('Do MMM') }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Post} from "@/mocks";

export default defineComponent({
  name: 'TimelinePost',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-block {
  padding: 16px 8px;
  border-bottom: .5px solid #919191;
  display: flex;
}
</style>
