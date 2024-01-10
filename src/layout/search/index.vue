<script setup lang="ts">
import { SearchSongs, Song } from '#/search/searchSongs'
import { SongApi } from '@/Api/song'
import { playControl, useISMobileStore } from '@/stores'
import { Music, formatTime } from '@/utils'

let searchData = ref<SearchSongs>()
// searchData = await SearchApi.SearchSongs(curRoute.value.query.keyword as string)

function set(v: SearchSongs) {
  searchData.value = v
}

provide('setData', set)

async function playMusic(i: Song) {
  let url = await SongApi.getSongUrl(i.id)
  playControl().playUrl = url.data[0].url
  playControl().songImg = i.al.picUrl
  playControl().musicName = i.name
  playControl().singerName = i.ar.map((item) => item.name).join('、')
  await Music.play(playControl().playUrl)
}
</script>
<template>
  <div class="w-full h-full flex flex-col pt-3">
    <div class="">
      <top class="border-none" />

      <div
        class="flex text-sm px-4 mb-3 w-full gap-3 [&_p]:px-4 [&_p]:py-1 [&_p]:bg-sky-500 [&_p]:rounded-2xl text-white">
        <p @click="playControl().add()">全部</p>
        <p>单曲</p>
        <p>专辑</p>
        <p>歌词</p>
      </div>
    </div>
    <div class="flex-1 table-container overflow-y-scroll px-5">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 max-md:hidden">
          <tr class="h-2">
            <th scope="col" class="py-3 px-6">歌曲</th>
            <th scope="col" class="py-3 px-6">歌手</th>
            <th scope="col" class="py-3 px-6">专辑</th>
            <th scope="col" class="py-3 px-6">时长</th>
          </tr>
        </thead>
        <tbody class="overflow-scroll" v-if="searchData?.result">
          <template v-if="!useISMobileStore().isMobile">
            <tr
              v-for="i in searchData.result.songs"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
              <td class="py-4 px-6">{{ i.name }}</td>
              <td class="py-4 px-6">{{ i.ar.map((item) => item.name).join('、') }}</td>
              <td class="py-4 px-6">{{ i.al.name }}</td>
              <td class="py-4 px-6">{{ formatTime(i.dt, 'ms') }}</td>
            </tr>
          </template>
          <template v-else>
            <div v-for="i in searchData.result.songs" @click="playMusic(i)" class="pb-6 flex items-center">
              <div class="">
                <img class="w-12 h-12 object-cover rounded-md max-sm:rounded-full" :src="i.al.picUrl" />
              </div>
              <div class="ml-3">
                <p>
                  {{ i.name }}
                </p>
                <p class="text-xs">{{ i.ar.map((item) => item.name).join('、') }}</p>
              </div>
            </div>
          </template>
        </tbody>
      </table>
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
  background-color: #fff; /* Adjust the background color as needed */
}
</style>

<style scoped lang="scss"></style>
