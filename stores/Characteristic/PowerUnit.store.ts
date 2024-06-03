import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface builderPowerUnitState {
    name: string
    img: any
    price: any
    chosen: boolean
}


const defaultValue: { value: builderPowerUnitState } = {
    value: {
        name: '',
        img: '',
        price: 0,
        chosen: false
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const builderPowerUnitState = defineStore('PowerUnit', {
    state: () => defaultValue,
    getters: {
        isState: state => state.value
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({value: {} })
        },
        set(input: builderPowerUnitState) {
            this.$patch({value: input})
        }
    },
    persist: true
})
