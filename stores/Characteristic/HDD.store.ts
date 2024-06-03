import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderHDDState {
    name: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderHDDState } = {
    value: {
        name: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const builderHDDState = defineStore('hdd', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderHDDState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
