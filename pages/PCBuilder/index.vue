<script setup lang="ts">
import {vAutoAnimate} from '@formkit/auto-animate'
import {useCPUStore} from "~/stores/Characteristic/CPU.store"
import {useGPUStore} from "~/stores/Characteristic/GPU.store"
import {useRAMStore} from "~/stores/Characteristic/RAM.store"
import {useMBStore} from "~/stores/Characteristic/Motherboard.store"
import {builderCoolingCPUState} from "~/stores/Characteristic/CoolingCpu.store";
import {builderHDDState} from "~/stores/Characteristic/HDD.store";
import {builderSSDState} from "~/stores/Characteristic/SSD.store";
import {builderPowerUnitState} from "~/stores/Characteristic/PowerUnit.store";
import {builderCaseState} from "~/stores/Characteristic/Case.store";
import {ref} from "vue";

const open = ref(false)

type component = {
  category: number
  name: string
  Name: string
  Image: string
  Price: number
  chosen: boolean
  desk: string
  funk: () => any
}

const showModal = () => {
  open.value = true
};

const handleOk = () => {
  open.value = false;
};

const handleCancel = () => {
  open.value = false;
};

const components: component[] = [
  {
    category: 1,
    name: `Процессор`,
    Name: useCPUStore().isState?.name,
    Image: useCPUStore().isState?.img,
    Price: useCPUStore().isState?.price,
    chosen: useCPUStore().isState?.chosen,
    desk: 'процессор не выбран',
    funk: () => useCPUStore().clear()
  },
  {
    category: 5,
    name: `Видеокарта`,
    Name: useGPUStore().isState?.name,
    Image: useGPUStore().isState?.img,
    Price: useGPUStore().isState?.price,
    chosen: useGPUStore().isState?.chosen,
    desk: 'Видеокарта не выбрана',
    funk: () => useGPUStore().clear()
  },
  {
    category: 6,
    name: `Оперативная память`,
    Name: useRAMStore().isState?.name,
    Image: useRAMStore().isState?.img,
    Price: useRAMStore().isState?.price,
    chosen: useRAMStore().isState?.chosen,
    desk: 'Оперативная память не выбрана',
    funk: () => useRAMStore().clear()
  },
  {
    category: 7,
    name: `Материнская плата`,
    Name: useMBStore().isState?.name,
    Image: useMBStore().isState?.img,
    Price: useMBStore().isState?.price,
    chosen: useMBStore().isState?.chosen,
    desk: 'Материнская плата не выбрана',
    funk: () => useMBStore().clear()
  },
  {
    category: 8,
    name: `Охлаждение процессора`,
    Name: builderCoolingCPUState().isState?.name,
    Image: builderCoolingCPUState().isState?.img,
    Price: builderCoolingCPUState().isState?.price,
    chosen: builderCoolingCPUState().isState?.chosen,
    desk: 'Охлаждение процессора не выбран',
    funk: () => builderCoolingCPUState().clear()
  },
  {
    category: 11,
    name: `HDD`,
    Name: builderHDDState().isState?.name,
    Image: builderHDDState().isState?.img,
    Price: builderHDDState().isState?.price,
    chosen: builderHDDState().isState?.chosen,
    desk: 'HDD не выбран',
    funk: () => builderHDDState().clear()
  },
  {
    category: 9,
    name: `SSD`,
    Name: builderSSDState().isState?.name,
    Image: builderSSDState().isState?.img,
    Price: builderSSDState().isState?.price,
    chosen: builderSSDState().isState?.chosen,
    desk: 'SSD не выбран',
    funk: () => builderSSDState().clear()
  },
  {
    category: 10,
    name: `Блок питания`,
    Name: builderPowerUnitState().isState?.name,
    Image: builderPowerUnitState().isState?.img,
    Price: builderPowerUnitState().isState?.price,
    chosen: builderPowerUnitState().isState?.chosen,
    desk: 'Блок питания не выбран',
    funk: () => builderPowerUnitState().clear()
  },
  {
    category: 12,
    name: `Корпус`,
    Name: builderCaseState().isState?.name,
    Image: builderCaseState().isState?.img,
    Price: builderCaseState().isState?.price,
    chosen: builderCaseState().isState?.chosen,
    desk: 'Корпус не выбран',
    funk: () => builderCaseState().clear()
  }
]


</script>

<template>
  <div class="orderBlock mt-6" v-auto-animate>
    <Payment :open='open' :show-modal="showModal" :handle-cancel="handleCancel" :handle-ok="handleOk"
             :product-list="components"/>
    <div class="flex flex-wrap gap-4 lg:gap-6 justify-center">
      <div v-for="({category, Image, Name, name, Price, funk, desk}, index) in components"
           :key="index">

        <NuxtLink :to='/products/+category'>
          <div
              class="bg-white min-w-[325px] max-w-[375px] lg:w-[496px]
              relative border border-neutral-200 rounded-md hover:shadow-xl"
          >
            <div class="flex flex-col h-full cursor-pointer" v-if="Name !== ''">
              <a-button type="primary" size='small' danger v-on:click="() => {funk()}">
                <template #icon>
                  <RestOutlined/>
                </template>
              </a-button>
              <img :src="'http://192.168.1.90:1337'+Image" :alt="Name"
                   class="object-contain h-auto rounded-t-md aspect-video"/>
              <div class="flex flex-col items-start p-4 grow">
                <p class="font-medium typography-text-base">{{ name }}</p>
                <a-divider/>
                <p style="align-self: end">цена {{ Price }}₽</p>
              </div>
            </div>
            <div class="p-2" v-else>
              <a-empty :description="desk"/>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <a-affix :offset-top="120">
      <div class="bay-form">
        <h1 class="text-2xl mb-3">Оформить заказ</h1>
        <p>
          Итоговая цена: {{ components.reduce((acc, num) => acc + num.Price, 0) }} ₽
        </p>
        <a-divider/>
        <a-space direction="vertical">
          <a-space>
            <a-button type="primary" style="width: 16em" @click="showModal">
              Купить
            </a-button>
          </a-space>
        </a-space>
      </div>
    </a-affix>
  </div>
</template>

<style scoped>
.orderBlock {
  display: grid;
  grid-template-columns: 4fr .75fr;
  gap: 10px;
}

.bay-form {
  padding: 1.5em;
  gap: 10px;
  margin-right: 20px;
  background-color: white;
  border-radius: 10px;
}
</style>