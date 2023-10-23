<!--
 * @Author: GAO GAO
 * @Date: 2023-10-12 17:45:15
-->
<template>
  <div ref="s">1234</div>
</template>

<script setup lang="ts">
function a(dom) {
  this.dom = dom
}

a.prototype.b = function () {
  console.log('b')
}
let s = ref(null)

onMounted(async () => {
  await nextTick()
  let aa = new a(s.value)
  aa.b()
})
</script>

<style scoped lang="scss"></style>
