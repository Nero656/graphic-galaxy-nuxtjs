import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderMBState {
    name: string
    socket: string
    chipset: string
    ram: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderMBState } = {
    value: {
        name: '',
        socket: '',
        chipset: '',
        ram: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useMBStore = defineStore('MB', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderMBState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
