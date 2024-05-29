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
  id: 0,
  attributes: {
    Name: '',
    Form_factor: '',
    Power: 0
  }
}

const query = gql`query{
                      characteristicsPowerUnit(id: ${id}){
                        data{
                          attributes{
                            Name
                            Form_factor
                            Power
                          }
                        }
                      }
                    }`

const powerUnit = ref<obj>({
  id: 0,
  attributes: {
    Name: '',
    Form_factor: '',
    Power: 0
  }
})

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    powerUnit.value = getProduct.data.characteristicsPowerUnit.data
  },
  server: false,
})

</script>

<template>
   <span>
      <p>Модель: {{ powerUnit.attributes.Name }}</p>
      <p>Форм-фактор: {{ powerUnit.attributes.Form_factor }}</p>
      <p>Мощность: {{ powerUnit.attributes.Power}}</p>
   </span>
</template>
