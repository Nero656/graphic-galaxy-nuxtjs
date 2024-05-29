<script setup lang="ts">
import {useLazyFetch} from "#app"
import {ref} from 'vue';
import {gql} from 'nuxt-graphql-request/utils'

const path = useRoute()

type Product = {
  data: {
    id: number
    attributes: {
      Name: string
      Description: string
      Price: number
      category_type_id: number
      characteristic_id: number
      Image: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
    }
  }
}
const product = ref<Product>({
  data: {
    id: 0,
    attributes: {
      Name: '',
      Description: '',
      Price: 0,
      category_type_id: 0,
      characteristic_id: 0,
      Image: {
        data: {
          id: 0,
          attributes: {
            url: '',
          }
        }
      }
    }
  }
})
const loading = ref(true)
const error = ref(null)

const activeKey = ref('1')

const query = gql`query{
                product(id: ${path.params.id}){
                  data {
                    id
                    attributes{
                      Name
                      Description
                      Price
                      category_type_id
                      characteristic_id
                      Image{
                          data{
                          id
                          attributes{
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }`

const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query}),
  transform: (getProduct: any) => {
    product.value = getProduct.data.product
  },
  server: false,
})

</script>

<template>
  <div class="flex flex-wrap justify-center">
    <MazCard
        orientation="row"
        style="width: 70vw">
      <template #title>
        <div class="flex flex-wrap maz-justify-between">
          <h3 style="margin: 0; margin-bottom: 20px">
            {{ product.data.attributes.Name }}
          </h3>
          <sf-button style="height: 4vh; padding: 1rem"><SfIconAddShoppingCart/></sf-button>
        </div>
      </template>
      <template #content>
        <div class="product_body">
          <div style="height: 40vh">
            <a-image :src="'http://192.168.1.90:1337'+product.data.attributes.Image.data.attributes.url"
                     :alt="product.data.attributes.Name" style="width: 15vw"/>
            </div>
          <a-tabs v-model:activeKey="activeKey" style="width: 100%">
            <a-tab-pane key="1" tab="Описание">{{ product.data.attributes.Description }}</a-tab-pane>
            <a-tab-pane key="2" tab="Характеристики">
              <span v-if="product.data.attributes.category_type_id === 0">
                <CharacteristicCpu :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 1">
                <CharacteristicGpu :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 2">
                <CharacteristicRam :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 3">
                <CharacteristicMotherboard :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 4">
                <CharacteristicCoolingCpu :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 5">
                <CharacteristicSsd :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 6">
                <CharacteristicPowerUnit :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 7">
                <CharacteristicHdd :id="product.data.attributes.characteristic_id"/>
              </span>

              <span v-if="product.data.attributes.category_type_id === 8">
                <CharacteristicCase :id="product.data.attributes.characteristic_id"/>
              </span>
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
    </MazCard>
  </div>
</template>

<style scoped>
.product_body {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>