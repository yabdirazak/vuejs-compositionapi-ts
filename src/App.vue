<template>
  <section class="section">
    <div class="container">
      <navbar/>
      <router-view></router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from "@/components/Navbar.vue";
export default defineComponent({
  name: 'App',
  components: { Navbar },
});
</script>

<style>

.container {
  width: 1180px;
  margin: 0 auto;
}

</style>
