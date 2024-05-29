<script setup lang="ts">
import {ref} from "vue";
import {useLazyFetch} from "#app";
import {gql} from "nuxt-graphql-request/utils";

const path = useRoute()

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const query = gql`query subcategorie{
                              subcategorie(id: ${path.params.id}) {
                                data {
                                  attributes {
                                    products {
                                      data {
                                        id
                                        attributes {
                                          Name
                                          Price
                                          Description
                                          Image{
                                            data{
                                              attributes{
                                                url
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }`

try {
  const {data, error: fetchError} = await useLazyFetch('http://192.168.1.90:1337/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query}),
    server: false,
    transform: (subcategory: any) => {
      products.value = subcategory.data.subcategorie.data.attributes.products.data.map((product: any) => ({
        id: product.id,
        name: product.attributes.Name,
        price: product.attributes.Price,
        description: product.attributes.Description,
        img: {
          src: `http://192.168.1.90:1337${product.attributes.Image.data.attributes.url}`,
          alt: product.attributes.Name,
        },
      }))
    }
  })
} finally {
  loading.value = false;
}
</script>

<template>
  <div class="flex flex-wrap gap-4 lg:gap-6 justify-center">
    <div
        v-for="({id, img, name, description}) in products"
        :key="`${id}`"
        class="bg-white min-w-[325px] max-w-[375px] lg:w-[496px] relative border border-neutral-200 rounded-md hover:shadow-xl"
    >
      <nuxt-link :to="'product/'+id" class="flex flex-col h-full">
        <img :src="img.src" :alt="img.alt" class="object-contain h-auto rounded-t-md aspect-video"/>
        <div class="flex flex-col items-start p-4 grow">
          <p class="font-medium typography-text-base">{{ name }}</p>
          <p class="mt-1 mb-4 font-normal typography-text-sm text-neutral-700">{{ description.substr(0, 175) }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>

</style>