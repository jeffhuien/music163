<script setup lang="ts">
import { SearchApi } from '@/Api/search'
import { formatTime } from '@/utils'
let curRoute = useRouter().currentRoute
let data = await SearchApi.SearchSongs(curRoute.value.query.keyword as string)
</script>

<template>
  <!-- <div class="overflow-y-scroll" v-for="i in data.result.songs"> -->
  <div class="w-full h-full">
    <div class="-mx-4 sm:-mx-8 sm:px-8">
      <table class="min-w-full h-5/6 transition-all ease-linear">
        <thead class="border-b-2 transition-all ease-linear hover:bg-red-500">
          <tr>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">歌曲</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">歌手</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">专辑</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">时长</th>
          </tr>
        </thead>
        <tbody class="h-36 overflow-scroll">
          <tr v-for="i in data.result.songs" class="hover:!bg-red-400">
            <td class="py-2 px-5 border-b bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ i.name }}</p>
            </td>
            <td class="py-2 px-5 border-b bg-white text-sm">
              <div class="flex items-center">
                <div class="">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ i.ar.map((item) => item.name).join('、') }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-2 px-5 border-b bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ i.al.name }}</p>
            </td>
            <td class="py-2 px-5 border-b bg-white text-sm">
              <span class="relative">{{ formatTime(i.dt, 'ms') }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="py-2 px-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
        <span class="text-xs xs:text-sm text-gray-900"> Showing 1 to 4 of 50 Entries </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
            Prev
          </button>
          <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>

<style scoped lang="scss"></style>
