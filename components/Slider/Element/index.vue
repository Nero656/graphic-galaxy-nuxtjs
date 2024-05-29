<script setup lang="ts">
defineProps({
  id: Number,
  name: String,
  img: {}
})


</script>

<template>
  <NuxtLink :to="'products/'+id">
    <div class="no-underline cursor-pointer">
      <div class="relative">
        <span class="bg-white block">
          <img
              :src="img.src"
              :alt="img.alt"
              class=" block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"
              width="146"
              height="146"
          />
        </span>
      </div>
      <div class="p-2 border-t border-neutral-200 typography-text-sm bg-white h-[65px]">
        <span variant="secondary" class="no-underline">{{ name }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>