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
    name: string,
    m2: string,
    Memory_size: number
  }
}

const query = gql`query{
                      characteristicsSsd(id: ${id}){
                        data{
                          attributes{
                            name
                            m2
                            Memory_size
                          }
                        }
                      }
                    }`

const ssd = ref<obj>({
  id: 0,
  attributes: {
    name: '',
    m2: '',
    Memory_size: 0
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    ssd.value = getProduct.data.characteristicsSsd.data
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ ssd.attributes.name }}</p>
      <p>Объем: {{ ssd.attributes.Memory_size }} гб</p>
      <p>M2: {{ ssd.attributes.m2 ? 'Есть' : 'Нету' }}</p>
   </span>
</template>
