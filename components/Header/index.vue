<script setup lang="ts">
import {
  SfButton,
  SfIconMenu,
} from '@storefront-ui/vue';


</script>

<template>
  <header class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
    <div class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
      <NuxtLink to="/">
        <h1 class="text-2xl logo_header">Graphic galaxy</h1>
      </NuxtLink>
      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
        <HeaderUserBlock/>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.logo_header {
  color: #10562E;
}
</style>