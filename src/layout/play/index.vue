<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="h-full w-full grid grid-cols-4 grid-row-1" @click="$router.back">
      <div class=" bg-slate-400 col-span-1">
      </div>
      <div class="col-span-3 bg-yellow-300">r</div>
    </div>
    <playBar />
  </div>
</template>

<style scoped lang="scss"></style>
