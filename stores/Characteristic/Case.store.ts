import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderCaseState {
    name: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderCaseState } = {
    value: {
        name: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const builderCaseState = defineStore('case', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderCaseState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
