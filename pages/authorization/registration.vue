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



const username = ref('')
const email  = ref('')
const password = ref('')

const query = gql`mutation($username: String!, $email: String!, $password: String!) {
                          register(input: {
                          username: $username,
                          email: $email,
                          password: $password}) {
                            jwt
                            user {
                              id
                              username
                              email
                            }
                          }
                        }`

const variables = ref({
  username: username.value,
  email: email.value,
  password: password.value
})

const sendForm = async () => {
  const { data, error } = await useFetch<LoginResponse>('http://192.168.1.90:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: {
        username: username.value,
        email: email.value,
        password: password.value
      }
    })
  })
  if (error.value) {
    console.error('Error:', error.value)
  } else {
    location.replace('/authorization/auth')
  }
}
</script>

<template>
  <div class="bg-white p-4 AuthForm">
    <h1 class="mb-4 text-3xl text-center font-bold">Регистрация</h1>
    <form @submit.prevent='sendForm'>
      <div class="mt-4">
        <span class="typography-label-sm font-medium">Имя пользователя:</span>
        <SfInput
            type='text'
            placeholder='Имя пользователя'
            v-model="username"
        />
      </div>


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
        <SfButton type="submit" class="w-full md:w-auto">Зарегистрироваться</SfButton>
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