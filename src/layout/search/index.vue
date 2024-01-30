<script setup lang="ts">
import { SearchSongs } from '#/search/searchSongs'
import { SearchApi } from '@/Api/search'
import router from '@/router'

let searchData = ref<SearchSongs>()
let currentRoute = useRouter().currentRoute.value
let kw = ref<string>(currentRoute.query.keywords as string)

provide('kw', kw)
provide('searchData', searchData)

watch(kw, async (newVal, v) => {
  searchData.value = await SearchApi.SearchSongs(newVal)
  console.log(searchData)
  router.push(`/search?keywords=${newVal}`)
})

onMounted(async () => {
  if (kw.value !== '') {
    searchData.value = await SearchApi.SearchSongs(kw.value)
  }
})
</script>
<template>
  <div class="w-full h-full flex flex-col pt-3">
    <div class="">
      <top class="border-none" />
    </div>
    <div class="flex-1 overflow-hidden">
      <list></list>
    </div>
    <div class="">
      <playBar class=""></playBar>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  position: relative;
}

.table-container table thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  /* Adjust the background color as needed */
}
</style>

<style scoped lang="scss"></style>
