<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store"
import {SfButton} from "@storefront-ui/vue";
</script>

<template>
  <a-config-provider
      :theme="{
          token: {
            colorPrimary: '#0d7e3f',
          },
        }"
  >
    <header class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200 pos">
      <div class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
        <NuxtLink to="/">
          <h1 class="text-2xl logo_header">Graphic galaxy</h1>
        </NuxtLink>
        <nav class="flex-1 flex justify-end lg:order-last lg:ml-5">
          <div v-if="useAuthStore().isAuth.jwt === ''">
            <HeaderUserBlock/>
          </div>
          <div class="logo_header"
               v-if="useAuthStore().isAuth.jwt !== ''">
            <NuxtLink to="/order">
              <SfButton variant="tertiary"
                        square>
                <SfIconShoppingCart/>
              </SfButton>
            </NuxtLink>
            <NuxtLink to="/pcbuilder">
              <SfButton variant="tertiary"
                        square>
                <DesktopOutlined/>
              </SfButton>
            </NuxtLink>
            <NuxtLink to="/listOfPurchased">
              {{ useAuthStore().isAuth.user.username }}
            </NuxtLink>
            <a-button danger type="text" @click="()=>{
            useAuthStore().clear()
          }">Выход
            </a-button>
          </div>
        </nav>
      </div>
    </header>
  </a-config-provider>
</template>

<style scoped>
.pos {
  position: fixed;
  width: 100vw;
  height: 7.5vh;
  z-index: 100;
}

.logo_header {
  color: #10562E;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
</style>