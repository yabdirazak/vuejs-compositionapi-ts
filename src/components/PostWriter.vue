<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New post</div>
        <input
            v-model="title"
            type="text"
            class="input"
        >
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />

    </div>
    <div class="column" >
      <div v-html="html"/>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button @click="save" class="button is-primary is-pulled-right">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch, watchEffect} from "vue";
import { Post } from "@/mocks";
// @ts-ignore
import { parse } from "marked";
import highlight from 'highlight.js'
import {debounce} from "lodash";

const foo = () => {}

const d = debounce(foo, 1000)

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },

  setup(props, ctx) {
    const title = ref(props.post.title)
    const content = ref('## Title \n Enter tour post content...')
    const html = ref('')
    const contentEditable = ref<HTMLDivElement | null>(null)

    const parseHtml = (str: string) => {
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value
        }
      })
    }

    watch(content, debounce(parseHtml, 250), { immediate: true })

    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error('This should never happen')
      }
      content.value = contentEditable.value.innerText || ''
    }

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error('This should never happen')
      }
      contentEditable.value.innerText = content.value
    })

    const save = () => {
      const  newPost: Post = {
        ...props.post,
        html: html.value,
        markdown: content.value
      }
      ctx.emit('save', newPost)
    }
    return {
      save,
      handleInput,
      title,
      content,
      contentEditable,
      html
    }
  }
})
</script>

<style scoped>
.columns {
  display: flex;
  margin-top: 16px;
}
.column {
  width: 100%;
}
.label {
  font-weight: 600;
}
.input {
  width: 100%;
  height: 24px;
  margin-top: 8px;
}
</style>
