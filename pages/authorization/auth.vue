<script setup lang="ts">
import {ref} from 'vue'
import {useLazyFetch} from "#app"
import {SfInput} from "@storefront-ui/vue"
import { gql } from 'nuxt-graphql-request/utils';
import {useAuthStore} from "@/stores/auth.store"

type LoginResponse = {
    jwt: string,
    user: {
      id: number,
      username: string,
      email: string
    }
}

const email  = ref('')
const password = ref('')

const query = gql`mutation($email: String!, $password: String!) {
                          login(input: { identifier: $email, password: $password }) {
                            jwt
                            user{
                              id
                              username
                              email
                            }
                          }
                        }`

const sendForm = async () => {
  const { data, error } = await useLazyFetch('http://192.168.1.90:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: {
        email: email.value,
        password: password.value
      }
    }),
    transform: (getUser: any) =>{
      useAuthStore().set(getUser.data.login)
      location.replace('/')
    },
    server: false
  })
}
</script>

<template>
  <div class="bg-white p-4 AuthForm">
    <h1 class="mb-4 text-3xl text-center font-bold">Авторизация</h1>
    <form @submit.prevent='sendForm'>
      <div class="mt-4">
        <span class="typography-label-sm font-medium">Email:</span>
        <SfInput
            type='email'
            placeholder='email'
            v-model="email"
        />
      </div>
      <div class="mt-3">
        <span class="typography-label-sm font-medium">Пароль:</span>
        <SfInput
            type='password'
            placeholder='Пароль'
            v-model="password"
        />
      </div>

      <div class="w-full flex mt-3 md:justify-end">
        <SfButton type="submit" class="w-full md:w-auto">Войти</SfButton>
      </div>

    </form>
  </div>
</template>

<style scoped>
.AuthForm {
  border: .1px solid #dedede;
  border-radius: 10px;
  margin: auto;
  margin-top: 150px;
  width: 50vw;
}
</style>