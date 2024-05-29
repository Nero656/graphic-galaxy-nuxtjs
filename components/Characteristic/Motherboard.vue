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
      Matherboard_name: string,
      Form_factor: string,
      Socket: string,
      Chipset: string,
      Memory_type: string,
      Number_of_memory_channels: number,
      NVMe: boolean,
      Number_of_M2_connectors: number,
      Number_of_memory_slots: number
    }
  }
}

const query = gql`query{
                      characteristicsMotherboard(id: ${id}){
                        data{
                          attributes{
                            Matherboard_name
                            Form_factor
                            Socket
                            Chipset
                            Memory_type
                            Number_of_memory_channels
                            NVMe
                            Number_of_M2_connectors
                            Number_of_memory_slots
                          }
                        }
                      }
                    }`

const motherboard = ref<obj>({
  data: {
    id: 0,
    attributes: {
      Matherboard_name: '',
      Form_factor: '',
      Socket: '',
      Chipset: '',
      Memory_type: '',
      Number_of_memory_channels: 0,
      NVMe: false,
      Number_of_M2_connectors: 0,
      Number_of_memory_slots: 0
    }
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    motherboard.value = getProduct.data.characteristicsMotherboard
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ motherboard.data.attributes.Matherboard_name }}</p>
      <p>Тип памяти: {{ motherboard.data.attributes.Memory_type }}</p>
      <p>Сокет: {{ motherboard.data.attributes.Socket }}</p>
      <p>Чипсет: {{ motherboard.data.attributes.Chipset }}</p>
      <p>Количество каналов памяти: {{ motherboard.data.attributes.Number_of_memory_channels }}</p>
      <p>Количество слотов памяти: {{ motherboard.data.attributes.Number_of_memory_slots }}</p>
      <p>NVMe: {{ motherboard.data.attributes.NVMe ? 'есть' : 'нет' }}</p>
      <p>Количество NVMe конвекторов : {{ motherboard.data.attributes.Number_of_M2_connectors }}</p>
   </span>
</template>