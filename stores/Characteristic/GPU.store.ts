import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderGPUState {
    name: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderGPUState } = {
    value: {
        name: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useGPUStore = defineStore('gpu', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderGPUState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
