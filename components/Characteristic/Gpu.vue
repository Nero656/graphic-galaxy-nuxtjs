<script setup lang="ts">
import {useLazyFetch} from "#app"
import {ref} from 'vue';
import {gql} from 'nuxt-graphql-request/utils'
import {useGPUStore} from "~/stores/Characteristic/GPU.store";

const props = defineProps({
  id: Number,
  imageUrl: String,
  price: Number,
})

type obj = {
  data: {
    id: number,
    attributes: {
      Gpu_name: string
      rtx: boolean
      Number_of_productive_cores: number
      frequency: number
      Techprocess: number
      Memory_type: number
      Memory_buses: number
      Video_memory_capacity: number
    }
  }
}

const query = gql`query{
                      characteristicsGpu(id: ${props.id}){
                        data{
                          id
                          attributes{
                            Gpu_name
                            rtx
                            Techprocess
                            Memory_type
                            Memory_buses
                            Video_memory_capacity
                            frequency
                          }
                        }
                      }
                    }`

const gpu = ref<obj>({
  data: {
    id: 0,
    attributes: {
      Gpu_name: '',
      rtx: false,
      frequency: 0,
      Number_of_productive_cores: 0,
      Techprocess: 0,
      Memory_type: 0,
      Memory_buses: 0,
      Video_memory_capacity: 0
    }
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    gpu.value = getProduct.data.characteristicsGpu
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ gpu.data.attributes.Gpu_name }}</p>
      <p>RTX ядра: {{ gpu.data.attributes.rtx ? 'ЕСТЬ' : 'НЕТ' }}</p>
      <p>Шина памяти: {{ gpu.data.attributes.Memory_buses }}бит</p>
      <p>Тип памяти: GDDR{{ gpu.data.attributes.Memory_type }}</p>
      <p>Техпроцесс: {{ gpu.data.attributes.Techprocess }}нм</p>
      <p>Частота процессора: {{ gpu.data.attributes.frequency }}</p>

       <a-button @click="()=>{
        useGPUStore().set({
          name: gpu.data.attributes.Gpu_name,
          img: props.imageUrl,
          price: props.price,
          chosen: true
        })
      }">
        Добавить в сборку
      </a-button>

   </span>
</template>
