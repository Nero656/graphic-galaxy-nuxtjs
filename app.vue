<template>
  <Header/>
  <div class="p-6">
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: light) {
  :root {
    --foreground-rgb: 162, 185, 222;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
  }
}

body {
  min-height: 100vh;
  /*color: rgb(var(--foreground-rgb));*/
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
  ) rgb(var(--background-start-rgb));
  background-size: cover;
}
</style>