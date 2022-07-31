import { reactive, readonly } from 'vue'
import { Post, today, thisWeek, thisMonth } from "@/mocks";
import axios from "axios";

interface State {
    posts: PostState
}

interface PostState {
    ids: string[]
    all: Map<string, Post>
    loaded: boolean
}

class Store {
    private state: State

    constructor(initial: State) {
        this.state = reactive(initial)
    }

    getState() {
        return readonly(this.state)
    }

    async fetchPosts() {
        const response = await axios.get<Post[]>('/posts')
        const postState: PostState = {
            ids: [],
            all: new Map(),
            loaded: true
        }
        for (const post of response.data) {
            postState.ids.push(post.id)
            postState.all.set(post.id, post)
        }
        this.state.posts = postState
    }
}

const all = new Map<string, Post>()
all.set(today.id, today)
all.set(thisWeek.id, thisWeek)
all.set(thisMonth.id, thisMonth)

const store = new Store({
    posts: {
        all,
        ids: [today.id, thisWeek.id, thisMonth.id],
        loaded: false
    }
})

export function useStore() {
    return store
}
