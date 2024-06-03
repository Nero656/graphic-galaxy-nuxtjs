import {defineStore, createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

interface AuthStore {
    jwt: string,
    user: {
        id: number,
        username: string,
        email: string
    }
}

const defaultValue: { login: AuthStore } = {
    login: {
        jwt: '',
        user: {
            id: 0,
            email: '',
            username: 'Гость',
        }
    }
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useAuthStore = defineStore('login',{
    state: () => defaultValue,
    getters: {
        isAuth: state => state.login
    },
    actions: {
        clear() {
            this.$reset()
            this.$patch({login: defaultValue.login})
        },
        set(input: AuthStore) {
            this.$patch({login: input})
        }
    },
    persist: true,
})
