<!-- <template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="h-14 max-sm:h-14 flex items-center p-4">
      <top />
    </div>
    <div class="flex-1 grid grid-rows-2 grid-flow-col w-full">
      <div class="row-span-2 bg-gray-100 max-md:hidden">左</div>
      <div class="col-span-5 row-span-2 overflow-hidden">
        <div class="flex w-full h-full flex-col p-5 overflow-scroll bg-red-300">
          <div class="flex bg-red-200 justify-center p-3">
            <input type="text" v-model="uid" class="px-4 py-1 rounded-2xl border-b" />
            <button class="ml-2 px-4 py-1 rounded-2xl" @click="get">搜索</button>
          </div>
          <div class="text-xs">
            <p class="mb-3" v-for="(i, index) in userLists?.playlist" :index="index" @click="getListSongs(i.id)">
              {{ i.name }}
            </p>
          </div>
          <div class="bg-sky-300" style="flex: 1">
            <div class="overflow-y-scroll">
              <p
                class="bg-white p-2 hover:bg-gray-100"
                v-for="(k, index) in listsSongs?.songs"
                :index="index"
                @click="playMusic(k)">
                {{ k.name }}
              </p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Suspense>
      <PlayBar class=""> </PlayBar>
    </Suspense>
  </div>
</template> -->
<!-- BUG 无法正常显示滚动 -->
<template>
  <div class="w-full h-full flex flex-col pt-3">
    <div class="">
      <top class="border-none" />
    </div>
    <div class="flex-1 table-container overflow-y-hidden px-5">
      <table class="w-full h-full text-sm flex flex-col text-left text-gray-500 dark:text-gray-400">
        <div class="flex bg-red-200 justify-center p-3">
          <input type="text" v-model="uid" class="px-4 py-1 rounded-2xl border-b" />
          <button class="ml-2 px-4 py-1 rounded-2xl" @click="get(uid)">搜索</button>
        </div>
        <div class="py-2 mb-5" v-if="queryUserList().userList.length != 0">
          <h2 class="">搜索历史</h2>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="i in queryUserList().userList"
              @click="get(i)"
              class="text-xs border border-sky-500 bg-white px-3 py-1 rounded-2xl">
              {{ i }}
              <i @click.stop="queryUserList().remove(i)" class="fa-solid fa-xmark opacity-60"></i>
            </span>
          </div>
        </div>
        <div class="text-xs flex gap-3">
          <div class="flex gap-2" v-for="(i, index) in userLists?.playlist" :index="index" @click="getListSongs(i.id)">
            <span class="text-xs border mb-3 border-sky-500 bg-white px-3 py-1 rounded-md">
              {{ i.name }}
            </span>
          </div>
        </div>
        <tbody class="overflow-y-scroll flex-1 border border-pink-300">
          <p
            class="bg-white p-2 hover:bg-gray-100"
            v-for="(k, index) in listsSongs?.songs"
            :index="index"
            @click="playMusic(k)">
            {{ k.name }}
          </p>
        </tbody>
      </table>
    </div>
    <div class="">
      <playBar class=""></playBar>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
<script setup lang="ts">
import { ListSongs, Song } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import { ListApi } from '@/Api/List'
import { SongApi } from '@/Api/song'
import { toast } from '@/plugins/toast'
import { playControl, queryUserList } from '@/stores'
import { Music, fee } from '@/utils'

let uid = ref()
let userLists = ref<UserList>()
let listsSongs = ref<ListSongs>()

async function get(id: string) {
  userLists.value = await ListApi.getList(id)
  if (id !== 'null') queryUserList().add(id)
}

async function getListSongs(id: number) {
  listsSongs.value = await ListApi.getListSongs(id)
}

async function playMusic(i: Song) {
  let url = await SongApi.getSongUrl(i.id)
  playControl().playUrl = url.data[0].url
  playControl().songImg = i.al.picUrl
  playControl().musicName = i.name
  playControl().singerName = i.ar.map((item) => item.name).join('、')
  playControl().isPlay = true
  let a = i.fee.toString()
  if (fee[a]) {
    toast.info(fee[a], { duration: 3000 })
  }
  await Music.play(playControl().playUrl)
}
</script>
