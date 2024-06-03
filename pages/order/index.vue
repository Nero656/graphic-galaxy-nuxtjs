<script setup lang="ts">
import {useOrderStore} from "~/stores/orderList.store"
import {ref} from 'vue'
import { vAutoAnimate } from '@formkit/auto-animate'

let products = []

const open = ref(false)

onMounted(() => {
  products = useOrderStore().isState
})

const showModal = () => {
  open.value = true
};

const handleOk = () => {
  open.value = false;
};

const handleCancel = () => {
  open.value = false;
};

</script>

<template>
  <div class="orderBlock mt-6">
    <Payment :open='open'
        :show-modal="showModal"
        :handle-cancel="handleCancel"
        :handle-ok="handleOk"
        :product-list="products"
    />
    <div class="flex flex-wrap gap-4 lg:gap-6 justify-center" v-auto-animate>
      <div
          v-for="({Image, Name, Description, Price}, index) in products"
          :key="index"
          class="bg-white min-w-[325px] max-w-[375px] lg:w-[496px] relative border border-neutral-200 rounded-md hover:shadow-xl"
      >
        <div class="flex flex-col h-full cursor-pointer" >
          <img :src="'http://192.168.1.90:1337'+Image" :alt="Name"
               class="object-contain h-auto rounded-t-md aspect-video"/>
          <div class="flex flex-col items-start p-4 grow">
            <p class="font-medium typography-text-base">{{ Name }}</p>
            <p class="mt-1 mb-4 font-normal typography-text-sm text-neutral-700">{{ Description.substr(0, 175) }}</p>
            <hr>
            <a-button type="primary" @click="useOrderStore().delete(index)">
              удалить из корзины
            </a-button>
            <p style="align-self: end">цена {{ Price }}₽</p>
          </div>
        </div>
      </div>
    </div>

    <a-affix :offset-top="120">
      <div class="bay-form">
        <h1 class="text-2xl mb-3">Оформить заказ</h1>
        <a-typography-text>
          Количество товаров: {{ useOrderStore().isState?.length }}
        </a-typography-text>
        <a-typography-text>
          Итоговая цена: {{ useOrderStore().isState?.reduce((acc, num) => acc + num.Price, 0) }} ₽
        </a-typography-text>

        <a-divider/>
        <a-space direction="vertical">
          <a-space>
            <a-button type="primary" style="width: 14em" @click="showModal">
              Купить
            </a-button>
          </a-space>
          <a-space>
            <a-button danger='true' @click="useOrderStore().clear()" style="width: 14em"> очистить корзину</a-button>
          </a-space>
        </a-space>
      </div>
    </a-affix>
  </div>
</template>

<style scoped>
.orderBlock {
  display: grid;
  grid-template-columns: 5fr .75fr;
  gap: 10px;
}

.bay-form {
  right: 15px;
  padding: 1.5em;
  background-color: white;
  border-radius: 10px;
}
</style>