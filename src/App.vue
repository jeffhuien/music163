<!--
 * @Author: GAO GAO
 * @Date: 2023-09-06 14:45:21
-->

<template>
  <div class="w-full border border-pink-700 mb-1 p-2">
    <RouterLink to="/main/b">
      <el-button type="primary"> home </el-button>
    </RouterLink>
  </div>

  <router-view v-slot="{ Component }">
    <transition appear enter-active-class="animate__animated animate__zoomIn">
      <main class="app">
        <component :is="Component" />
      </main>
    </transition>
  </router-view>
  <Suspense>
    <PlayBar
      :musicName="'咱们结婚吧-启辰'"
      :songImg="'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'"
      :playUrl="playUrl">
    </PlayBar>
  </Suspense>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let playUrl = ref('')
fetch('http://8.130.40.2:3000/song/url/v1?id=28949444&level=lossless')
  .then((r) => r.json())
  .then((r) => (playUrl.value = r.data[0].url))
</script>

<style lang="scss" scoped>
.app {
  @apply w-full h-full m-auto;
}
</style>
