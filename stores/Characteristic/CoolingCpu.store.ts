import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderCoolingCPUState {
    name: string
    img: any
    tdp: string
    price: any
    chosen: boolean
}


const defaultValue: { value: builderCoolingCPUState } = {
    value: {
        name: '',
        img: '',
        tdp: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const builderCoolingCPUState = defineStore('cooling', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderCoolingCPUState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
