<script setup lang="ts">
import {useLazyFetch} from "#app"
import {ref} from 'vue';
import {gql} from 'nuxt-graphql-request/utils'
import {builderHDDState} from "~/stores/Characteristic/HDD.store";
import {builderSSDState} from "~/stores/Characteristic/SSD.store";

const props = defineProps({
  id: Number,
  imageUrl: String,
  price: Number,
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
                      characteristicsSsd(id: ${props.id}){
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

     <a-button @click="()=>{
        builderSSDState().set({
          name: ssd.attributes.name,
          img: props.imageUrl,
          price: props.price,
          chosen: true
        })
      }">
        Добавить в сборку
      </a-button>
   </span>
</template>
