<script setup lang="ts">
import {useLazyFetch} from "#app"
import {ref} from 'vue';
import {gql} from 'nuxt-graphql-request/utils'

const {id, name, img} = defineProps({
  id: Number,
  name: String,
  img: {}
})

type obj = {
  id: number,
  attributes: {
    Case_name: string,
    Form_factor: string,
  }
}

const query = gql`query{
                      characteristicsComputerCase(id: ${id}){
                        data{
                          attributes{
                            Case_name
                            Form_factor
                          }
                        }
                      }
                    }`

const computerCase = ref<obj>({
  id: 0,
  attributes: {
    Case_name: '',
    Form_factor: ''
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    computerCase.value = getProduct.data.characteristicsComputerCase.data
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ computerCase.attributes.Case_name }}</p>
      <p>Форм-фактор {{ computerCase.attributes.Form_factor }}</p>
   </span>
</template>
