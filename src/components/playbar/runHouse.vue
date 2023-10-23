<!--
 * @Author: GAO GAO
 * @Date: 2023-10-06 14:58:01
-->
<template>
  <Vue3Marquee :pause="scroll">
    <span ref="aa">
      {{ data.data }}
    </span>
  </Vue3Marquee>
</template>

<script setup>
let data = defineProps(['data'])
let aa = ref(null)
let scroll = ref(true)

function resize(aa) {
  if (aa.value.clientWidth > aa.value.parentNode.clientWidth) scroll.value = true
  else scroll.value = false
  console.log(scroll.value)
}
onMounted(async () => {
  await nextTick()
  resize(aa)
  addEventListener('resize', resize(aa))
})
</script>
