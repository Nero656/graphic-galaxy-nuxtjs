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
      ram_name: string
      ram_type: string
      Memory_form_factor: string
      Frequency: number
      Memory_size: number
      Profiles_XMP: string
    }
  }
}

const query = gql`query{
                      characteristicsRam(id: ${id}){
                        data{
                          attributes{
                            ram_name
                            ram_type
                            Memory_form_factor
                            Frequency
                            Memory_size
                            Profiles_XMP
                          }
                        }
                      }
                    }`

const ram = ref<obj>({
  data: {
    id: 0,
    attributes: {
      ram_name: '',
      ram_type: '',
      Memory_form_factor: '',
      Frequency: 0,
      Memory_size: 0,
      Profiles_XMP: ''
    }
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    ram.value = getProduct?.data.characteristicsRam
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ ram.data.attributes.ram_name }}</p>
      <p>Тип памяти: {{ ram.data.attributes.ram_type }}</p>
      <p>Объём памяти: {{ ram.data.attributes.Memory_size }}гб</p>
      <p>Частота: {{ ram.data.attributes.Frequency }}мгц</p>
      <p>XMP профили: {{ ram.data.attributes.Profiles_XMP ? 'есть' : 'нет' }}</p>
   </span>
</template>
