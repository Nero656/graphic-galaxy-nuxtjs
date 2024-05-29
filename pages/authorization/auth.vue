<script setup lang="ts">
import {ref} from 'vue'
import {useFetch} from "#app"
import {SfInput} from "@storefront-ui/vue"
import { gql } from 'nuxt-graphql-request/utils';

type LoginResponse = {
  login: {
    jwt: string,
    user: {
      id: number,
      username: string,
      email: string
    }
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

const variables = ref({
  email: email.value,
  password: password.value
})

const sendForm = async () => {
  const { data, error } = await useFetch<LoginResponse>('http://192.168.1.90:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  })

  if (error.value) {
    console.error('Error:', error.value)
  } else {
    // useState('token', () => data.value.data.login.jwt)
    //
    // console.log(data.value.data.login.user.username)
  }
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
  width: 50vw;
}
</style>