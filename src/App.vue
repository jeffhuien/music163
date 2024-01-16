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
import { playControl, searchHistory, queryUserList } from './stores'
import { loadMusic, loadQueryUserList, loadSearchHistory, store } from './utils'

// import _ from 'lodash'

// watch(
//   playControl,
//   (newVal) => {
//     // 每当状态发生变化时，将整个 state 持久化到本地存储。
//     if (newVal.musicName !== 'undefined') {
//       store.set(newVal.$id, newVal.$state)
//     }
//   },
//   { deep: true },
// )
// watch(
//   searchHistory,
//   (newVal) => {
//     if (newVal.searchHistory.length !== 0) store.set(newVal.$id, newVal.$state)
//   },
//   { deep: true },
// )
// watch(
//   queryUserList,
//   (newVal) => {
//     if (newVal.userList.length !== 0) store.set(newVal.$id, newVal.$state)
//   },
//   { deep: true },
// )

onMounted(() => {
  console.log('加载缓存...')
  // loadMusic()
  // loadSearchHistory()
  // loadQueryUserList()
})
</script>
