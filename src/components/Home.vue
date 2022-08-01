<template>
  <suspense>
    <timeline/>
    <template #fallback>
      Loading ...
    </template>
  </suspense>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Timeline from '@/components/Timeline.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Timeline,
  }
});
</script>

<style scoped>

</style>
