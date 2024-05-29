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
        Core_name: string,
        Core: number,
        Socket: string,
        Number_of_productive_cores: number
        L2_cache_size: number
        L3_cache_size: number
        Techprocess: string
        Base_CPU_frequency: number
        Maximum_frequency_in_turbo_mode: number
        TDP: number
        Memory_type: string
        Maximum_supported_memory_size: number
      }
    }
}

const query = gql`query{
                      characteristicsCpu(id: ${id}){
                        data{
                          id
                          attributes{
                            Core_name
                            Core
                            Core_name
                            Socket
                            Number_of_productive_cores
                            L2_cache_size
                            L3_cache_size
                            Techprocess
                            Base_CPU_frequency
                            Maximum_frequency_in_turbo_mode
                            TDP
                            Memory_type
                            Maximum_supported_memory_size
                          }
                        }
                      }
                    }`

const cpu = ref<obj>({
    data: {
      id: 0,
      attributes: {
        Core_name: '',
        Core: 0,
        Socket: '',
        Number_of_productive_cores: 0,
        L2_cache_size: 0,
        L3_cache_size: 0,
        Techprocess: '',
        Base_CPU_frequency: 0,
        Maximum_frequency_in_turbo_mode: 0,
        TDP: 0,
        Memory_type: '',
        Maximum_supported_memory_size: 0
      }
    }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    cpu.value = getProduct.data.characteristicsCpu
  },
  server: false,
})

</script>

<template>
   <span>
     <p>Модель: {{ cpu.data.attributes.Core_name }}</p>
     <p>Сокет: {{ cpu.data.attributes.Socket }}</p>
     <p>Количество производительных ядер: {{ cpu.data.attributes.Number_of_productive_cores }}</p>
     <p>L2 кэш: {{ cpu.data.attributes.L2_cache_size }}mb</p>
     <p>L3 кэш: {{ cpu.data.attributes.L3_cache_size }}mb</p>
     <p>Тех. процесс {{ cpu.data.attributes.Techprocess }}</p>
     <p>TDP {{ cpu.data.attributes.TDP }}</p>
     <p>Базовая частота {{ cpu.data.attributes.Base_CPU_frequency }}</p>
     <p>Максимальная частота {{ cpu.data.attributes.Maximum_frequency_in_turbo_mode }}</p>
     <p>Тип памяти {{ cpu.data.attributes.Memory_type }}</p>
   </span>
</template>

<style scoped>

</style>