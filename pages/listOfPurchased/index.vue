<script setup lang="ts">
import {useLazyFetch} from "#app"
import {ref} from 'vue';
import {gql} from 'nuxt-graphql-request/utils'
import {useOrderStore} from '@/stores/orderList.store'
import {useAuthStore} from "~/stores/auth.store";
import {attribute} from "postcss-selector-parser";

type OrderData = {
  id: number
  attributes: {
    product_list: any[]
    created: string
    will_deliver: string
    quantity: number
  }
}

const orderLists = ref([])


const query = gql`query {
                          orderLists(filters: {users_permissions_user: {id: {eq: ${useAuthStore().isAuth.user.id}}}}){
                            data{
                              id
                              attributes{
                                product_list
                                quantity
                                created
                                will_deliver
                              }
                            }
                          }
                        }`

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    console.log(orderLists)

    orderLists.value = getProduct.data.orderLists.data
  },
  server: false,
})

</script>

<template>
  <div class="flex flex-wrap gap-4 lg:gap-6 justify-center">
    <a-row :gutter="[16,16]" v-for="(item, index) in orderLists" :key="index" class="orderFlex">
      <a-typography-title :level="5">
        заказ был сделан: {{item.attributes?.created}} / заказ поступит: {{item.attributes?.will_deliver}}
      </a-typography-title>
      <a-typography-title :level="5">Список покупок</a-typography-title>
      <div class="productFlex">
      <div v-for="(element, id) in item.attributes.product_list" :key="id"
             class="ml-3 bg-white min-w-[325px] max-w-[375px] lg:w-[496px] relative border border-neutral-200 rounded-md hover:shadow-xl"
      >
        <div class="flex flex-col h-full cursor-pointer ">
          <img :src="'http://192.168.1.90:1337'+element.Image" :alt="element.Name"
               class="object-contain h-auto rounded-t-md aspect-video"/>
          <div class="flex flex-col items-start p-4 grow">
            <p class="font-medium typography-text-base">{{ element.Name }}</p>
            <hr>
            <p style="align-self: end">цена {{ element.Price }}₽</p>
          </div>
        </div>
      </div>
      </div>
    </a-row>
  </div>
</template>

<style scoped>

.orderFlex {
  padding: 1em;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.productFlex{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
}


</style>