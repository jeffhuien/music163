<template>
  <suspense>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition appear enter-active-class="animate__animated animate__slideInRight">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </suspense>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { playControl } from './stores'
import { store } from './utils'
watch(
  playControl,
  (playControl) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    if (playControl.musicName !== undefined) {
      store.set('mp3', { ...playControl })
    }
  },
  { deep: true },
)
</script>
