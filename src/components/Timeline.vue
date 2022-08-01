<template>
  <nav class="is-primary panel">
    <div class="panel-tabs">
      <div
          v-for="(p, i) in periods"
          :key="i"
          :data-test="p"
          :class="['tab', {'active': p === currentPeriod}]"
          @click="setPeriod(p)"
      >
        {{ p }}
      </div>
    </div>
    <div>
      <timeline-post
          v-for="(p, i) in posts"
          :key="i"
          :post="p"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import moment from 'moment'
import TimelinePost from "@/components/TimelinePost.vue";
import { Post } from "@/mocks";
import { useStore } from "@/store";

type Period = 'Today' | 'This Week' | 'This Month'

export default defineComponent({
  name: 'Timeline',
  components: {
    TimelinePost,
  },
  async setup() {
    const periods: Period[] = ['Today', 'This Week', 'This Month'];
    const currentPeriod = ref<Period>('Today')
    const store = useStore()

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const allPosts: Post[] = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getState().posts.all.get(id)
      if (!thePost) {
        throw Error('This post was not found')
      }
      return acc.concat(thePost)
    }, [])

    const posts = computed(() => {
      return allPosts.filter(post => {
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(moment().subtract(1, 'day'))
        }
        if (currentPeriod.value === 'This Week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }
        if (currentPeriod.value === 'This Month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }
    return {
      posts,
      periods,
      currentPeriod,
      setPeriod
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}
.active {
  border-bottom: 1px solid #5d5d5d;
}

.tab {
  text-decoration: none;
  cursor: pointer;
  color: #31a1ff;
  padding: 16px;
}
.tab:hover {
  text-decoration: none;
  color: #44474a;
}

.panel-tabs {
  display: flex;
  justify-content: center;
  text-align: center;
}
.panel-block {
  padding: 16px 8px;
  border-bottom: .5px solid #919191;
  display: flex;
}
</style>
