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
  data: {
    id: number,
    attributes: {
      cooling_name: string
      tdp: string
      Socket: string
    }
  }
}

const query = gql`query{
                      characteristicsCoolingCpu(id: ${id}){
                        data{
                          attributes{
                            cooling_name
                            tdp
                            Socket
                          }
                        }
                      }
                    }`

const coolingCpu = ref<obj>({
  data: {
    id: 0,
    attributes: {
      cooling_name: '',
      tdp: '',
      Socket: ''
    }
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    coolingCpu.value = getProduct.data.characteristicsCoolingCpu
  },
  server: false,
})

</script>

<template>
   <span>

      <p>Модель: {{ coolingCpu.data.attributes.cooling_name }}</p>
      <p>tdp: {{ coolingCpu.data.attributes.tdp }}</p>
      <p>Сокет: {{ coolingCpu.data.attributes.Socket }}</p>
   </span>
</template>
