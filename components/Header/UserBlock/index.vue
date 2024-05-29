<script setup lang="ts">
import {SfButton, SfIconFavorite, SfIconPerson, SfIconShoppingCart} from "@storefront-ui/vue";
import {SfIconLogin} from "#components";

const actionItems = [
  {
    icon: SfIconShoppingCart,
    ariaLabel: 'Cart',
    role: 'button',
    label: '',
  },
  {
    icon: SfIconFavorite,
    ariaLabel: 'Wishlist',
    role: 'button',
    label: '',
  },
  {
    label: 'Log in',
    icon: SfIconLogin,
    ariaLabel: 'Log in',
    role: 'login',
  },
  {
    label: 'Sign up',
    icon: SfIconPerson,
    ariaLabel: 'Sign up',
    role: 'Signup',
  },
];
</script>

<template>
  <div class="flex flex-row flex-nowrap">
    <SfButton
        v-for="actionItem in actionItems"
        :key="actionItem.ariaLabel"
        class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
        :aria-label="actionItem.ariaLabel"
        variant="tertiary"
        square
    >
      <template #prefix>
        <Component :is="actionItem.icon"/>
      </template>
      <NuxtLink to="/authorization/auth">
            <span v-if="actionItem.role === 'login'" class="hidden xl:inline-flex whitespace-nowrap">{{
                actionItem.label
              }}</span>
      </NuxtLink>
      <NuxtLink to="/authorization/registration">
            <span v-if="actionItem.role === 'Signup'" class="hidden xl:inline-flex whitespace-nowrap">{{
                actionItem.label
              }}</span>
      </NuxtLink>
    </SfButton>
  </div>
</template>

<style scoped>

</style>