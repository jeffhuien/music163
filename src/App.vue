<template>
  <suspense>
    <router-view v-slot="{ Component }">
      <transition appear enter-active-class="animate__animated animate__slideInRight">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </suspense>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { playControl } from './stores';

onMounted(() => {
  console.log('加载缓存...')
})
</script>
