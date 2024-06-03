import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderRAMState {
    name: string
    ram: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderRAMState } = {
    value: {
        name: '',
        ram: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useRAMStore = defineStore('ram', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderRAMState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
