import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface ProductStore {
    id: number,
    Name: string,
    Description: string,
    Price: number,
    Image: string
    quantity: number
}

interface OrderListStore {
    products: ProductStore[]
}

const defaultValue: { list: OrderListStore } = {
    list: {
        products: []
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useOrderStore = defineStore('orders', {
    state: () => defaultValue,
    getters: {
        isState: state => state.list.products
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({list: {products: []}})
        },
        set(input: ProductStore) {
            this.list.products.push(input)
            this.$patch({list: this.list})
        },
        delete(id: any) {
            this.list.products.splice(id, 1)
            this.$patch({list: this.list})
        }
    },
    persist: false
})
