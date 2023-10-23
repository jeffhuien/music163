<!--
 * @Author: GAO GAO
 * @Date: 2023-10-06 10:37:40
-->
<template>
  <span>{{ time }}</span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
let time = ref('00:00/00:00')
let data = defineProps(['CurTime', 'totalTime'])

watch(
  () => data.CurTime,
  (n, o) => {
    time.value = formatTime(n) + '/' + formatTime(data.totalTime)
    // if (n == data.totalTime) time.value = formatTime(n) + '/' + formatTime(n)
  },
)

//样式00:00 不足两个0的补0
function formatTime(time: number) {
  return `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(time % 60)
    .toString()
    .padStart(2, '0')}`
}
</script>
<style scoped lang="scss"></style>
