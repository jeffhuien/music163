<script setup lang="ts">
import { SearchSongs } from '#/search/searchSongs'
import { searchSuggest } from '#/search/searchSuggest'
import { SearchApi } from '@/Api/search'
import { toast } from '@/plugins/toast'
import loadingStore from '@/stores/loading'
let set = inject('setData') as Function

let keyword = ref('')
let data = ref<searchSuggest>()
let show = ref(false)
async function search(keywords: string) {
  if (keywords.trim() == '') {
    toast.error('请输入关键字！')
    keyword.value = ''
    return false
  }
  show.value = !show.value
  data.value = await SearchApi.Suggest(keywords)

  if (!data.value.result.albums) {
    toast.error('未搜索到歌曲~')
  }
}

async function enterSearch() {
  let searchData = await SearchApi.SearchSongs(keyword.value)
  set(searchData)
}

async function getFocus() {
  show.value = true
  if (keyword.value) {
    data.value = await SearchApi.Suggest(keyword.value)
  }
}
function lostFocus() {
  setTimeout(() => {
    show.value = false
    data.value = {} as searchSuggest
  }, 300)
}

let currentRoute = useRouter().currentRoute.value

let ls = await SearchApi.Hot()
let ls1 = `都忘记，哦对hi，哦擦是你，哦那我产，品的开，完票`.split('，')
//TODO 搜索建议关键词匹配
</script>

<template>
  <div class="w-full relative flex max-md:ml-0">
    <i class="fa-solid fa-magnifying-glass absolute top-[20%] left-2 opacity-50"></i>
    <input
      type="text"
      class="transition-all duration-700 w-52 focus:w-64 rounded-3xl border caret-pink-500 pl-8 py-1 text-xs text-gray-600 focus:outline-sky-200 hover:border-lime-300 outline-none"
      v-model="keyword"
      @input="search(keyword)"
      @keyup.stop=""
      @focus="getFocus"
      @blur="lostFocus"
      @keyup.enter="enterSearch" />
    <div
      v-show="show"
      class="suggest overflow-hidden absolute top-[120%] text-sm w-72 min-h-52 bg-white rounded-md shadow-lg"
      style="min-height: 13rem">
      <div
        style="min-height: 13rem"
        class="w-full h-full flex justify-center items-center"
        v-if="loadingStore().searchBoxLoading">
        <Loading class="">loading...</Loading>
      </div>

      <div class="" v-else>
        <div v-if="data?.result" class="flex flex-col gap-2 p-2 h-full border bg-white">
          <div class="">
            <div class="flex p-1 border-b">
              <h2 class="self-center w-2/12 flex-shrink-0 text-gray-500 text-center">单曲</h2>
              <div class="flex-1 w-10/12">
                <div class="flex gap-2 flex-wrap text-sm" v-for="(item, index) in data.result.songs" :index="index">
                  <p class="py-2 w-full hover:bg-gray-100 pl-2 truncate" @click="enterSearch">
                    {{ item.name }} - {{ item.artists.map((i) => i.name).join('、') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex p-1 border-b">
            <h2 class="self-center w-2/12 text-gray-500 text-center">专辑</h2>
            <div class="flex-1 w-10/12">
              <div class="flex gap-2 flex-wrap text-sm" v-for="(item, index) in data.result.albums" :index="index">
                <p class="py-2 w-full hover:bg-gray-100 pl-2 truncate" @click="enterSearch">
                  {{ item.name }} - {{ item.artist.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="">
          <div class="[&_h2]:mb-2 suggest flex flex-col gap-2 p-2 !min-h-52 border bg-white rounded-md shadow-lg">
            <div class="">
              <h2 class="">搜索历史</h2>
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="i in ls1"
                  @click="enterSearch"
                  class="text-xs border border-sky-500 bg-white px-3 py-1 rounded-2xl">
                  {{ i }} <i class="fa-solid fa-xmark opacity-60"></i>
                </span>
              </div>
            </div>

            <div class="flex flex-col relative">
              <h2 class="">
                <span class="">热搜</span>
                <span class="block relative -top-3 w-10 h-3 bg-pink-500/75"> </span>
              </h2>
              <ul class="text-gray-500 list-decimal translate-x-5">
                <li
                  class="text-xs hover:bg-gray-100 px-2 py-1 rounded-2xl"
                  v-for="(i, index) in ls.result.hots"
                  :index="index"
                  @click="enterSearch">
                  {{ i.first }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
