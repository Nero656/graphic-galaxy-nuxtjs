import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderCPUState {
    name: string
    socket: string
    ram: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderCPUState } = {
    value: {
        name: '',
        socket: '',
        ram: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useCPUStore = defineStore('cpu', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {}})
        },
        set(input: builderCPUState) {
            this.$patch({value: input})
        },
        persist: true
    }
})
