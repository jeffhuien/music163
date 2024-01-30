<template>
  <suspense>
    <router-view v-slot="{ Component }">
      <transition appear enter-active-class="animate__animated animate__slideInUp">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </suspense>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ListSongs } from '#/List/ListSongs'
onMounted(() => {
  console.log('加载缓存...')
})

let searchData = 'app'
provide('data', {
  searchData,
})
</script>
