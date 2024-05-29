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
    Hard_drive_name: string,
    size: number,
    size_of_cache: number,
    Spindle_speed: number
  }
}

const query = gql`query{
                      characteristicsHardDrive(id: ${id}){
                        data{
                          attributes{
                            Hard_drive_name
                            size
                            size_of_cache
                            Spindle_speed
                          }
                        }
                      }
                    }`

const hdd = ref<obj>({
  id: 0,
  attributes: {
    Hard_drive_name: '',
    size: 0,
    size_of_cache: 0,
    Spindle_speed: 0
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    hdd.value = getProduct.data.characteristicsHardDrive.data
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ hdd.attributes.Hard_drive_name }}</p>
      <p>Объем кеша: {{ hdd.attributes.size_of_cache }}</p>
      <p>Объем {{ hdd.attributes.size }}гб</p>
      <p>Скорость вращения шпинделя : {{ hdd.attributes.Spindle_speed }}</p>
   </span>
</template>
