<script setup lang="ts">
import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from '@storefront-ui/vue';
import {useLazyFetch} from "#app"
import {ref} from 'vue';
import {gql} from 'nuxt-graphql-request/utils'


const loading = ref(true);
const error = ref(null);

const query = gql`query subcategories{
                      subcategories{
                        data{
                          id
                          attributes{
                            Name
                            image {
                              data{
                                attributes{
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                    }`

const category = ref([]);


try {
  const { data: subcategory, error: fetchError } = await useLazyFetch('http://192.168.1.90:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    server: false,
    transform: (subcategory) =>{
      category.value = subcategory.data.subcategories.data.map((subcategory: any) => ({
        id: subcategory.id,
        name: subcategory.attributes.Name,
        img: {
          src: `http://192.168.1.90:1337${subcategory.attributes.image.data.attributes.url}`,
          alt: subcategory.attributes.Name,
        },
      }))
    }
  })
} finally {
  loading.value = false;
}


</script>

<template>
  <div v-if="loading">Loading...</div>

  <SfScrollable
      class="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      buttons-placement="floating"
      drag
  >
    <template #previousButton="defaultProps">
      <SfButton
          v-bind="defaultProps"
          class="absolute !rounded-full z-10 left-4 bg-white hidden md:block"
          :class="{ '!hidden': defaultProps.disabled }"
          variant="secondary"
          size="lg"
          square
      >
        <SfIconChevronLeft/>
      </SfButton>
    </template>


    <div
        v-for="{ id, name, img } in category"
        :key="id"
        class="first:ms-auto last:me-auto border border-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
    >
      <SliderElement :id="id" :name="name" :img="img"/>
    </div>

    <template #nextButton="defaultProps">
      <SfButton
          v-bind="defaultProps"
          class="absolute !rounded-full z-10 right-4 bg-white hidden md:block"
          :class="{ '!hidden': defaultProps.disabled }"
          variant="secondary"
          size="lg"
          square
      >
        <SfIconChevronRight/>
      </SfButton>
    </template>
  </SfScrollable>
</template>

<style scoped>

</style>