<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="flex-1 flex flex-col w-full h-full">
      <div class="h-14 max-sm:h-14 flex items-center p-4">
        <top />
      </div>
      <div class="grid grid-rows-2 grid-flow-col w-full h-full bg-red-100">
        <div class="row-span-2 bg-gray-100 max-md:hidden">左</div>
        <div class="col-span-5">右</div>
      </div>
    </div>
    <Suspense>
      <PlayBar class=""> </PlayBar>
    </Suspense>
  </div>
</template>

<style scoped lang="scss"></style>
<script setup lang="ts">
import { Song } from '#/song/search-res'
import { SearchApi } from '@/Api/search'
import { SongApi } from '@/Api/song'
import playControl from '@/stores/playControl'
import { ref } from 'vue'
let playUrl = ref('')

let res = await SearchApi.SearchSongs('喜欢你')
let song = res.result?.songs[0] as Song
let a = await SongApi.getSongUrl(song.id)
playUrl.value = a.data[0].url

let playControlStore = playControl()
playControlStore.musicName = song.name
playControlStore.singerName = song.ar.map((item) => item.name).join('、')
playControlStore.songImg = song.al.picUrl
playControlStore.playUrl = playUrl.value
</script>
