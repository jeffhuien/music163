<template>
  <div class="playBar">
    <!-- 进度条 -->
    <div
      class="playBar-progress group w-full h-[0.2rem] hover:cursor-pointer absolute -top-[0.07rem] left-0"
      @click="jump($event)">
      <span
        class="absolute block h-[0.1rem] bg-blue-600"
        :style="['width:' + (currentTime / mp3.getDuration()) * 100 + '%']"
        id="progress">
      </span>
      <span
        class="w-2 h-2 rounded absolute -translate-y-1/2 -translate-x-1/2 z-10 bg-red-700 !hidden group-hover:!block"
        :style="['left:' + (currentTime / mp3.getDuration()) * 100 + '%']"
        id="idot"></span>
    </div>

    <div class="play_bg w-full h-full" @click="$router.push('/play')">
      <i class="fa-solid fa-angles-up left-0"></i>
      <!-- <!== 歌曲封面 ==> -->
      <img
        class="absolute max-sm:animate-spin-slow top-0 w-full h-full object-cover rounded-md max-sm:rounded-full"
        :src="songImg"
        :style="[isPlay == false ? 'animation-play-state: paused' : '']" />
    </div>
    <div class="shrink-0 flex items-center justify-between lg:w-[30vw]">
      <div class="flex shrink-0 flex-1 bars ml-1 flex-col justify-center items-start max-sm:w-[30vw] relative !w-full">
        <div class="" v-if="useISMobileStore().isMobile">
          <songNameMobile :musicName="musicName" :singerName="singerName"></songNameMobile>
        </div>
        <div class="" v-else>
          <RunHouse class="text-sm" :data="musicName"></RunHouse>
          <Bars class="text-sm mt-[.5rem] w-full max-sm:!hidden" :data="leftBars"></Bars>
        </div>
      </div>
    </div>

    <!-- <!== 控制条 ==> -->
    <div class="flex justify-center flex-1 relative lg:w-[30vw] max-sm:!justify-end max-sm:pr-12">
      <div class="flex justify-center items-center gap-8 text-xl">
        <i class="fa-solid fa-backward-step text-pink-300 max-md:hidden"></i>
        <i
          class="fa-solid text-pink-300 shrink-0 text-4xl w-5 max-sm:text-2xl"
          :class="[isPlay ? 'fa-pause' : 'fa-play ']"
          @click="play"></i>
        <i class="fa-solid fa-forward-step text-pink-300 max-md:hidden"></i>
      </div>
    </div>

    <div class="lg:w-[30vw] items-center justify-end flex">
      <div class="mr-10 left-0 max-md:!hidden">
        <timeText class="text-xs opacity-90" :CurTime="currentTime" :totalTime="mp3.getDuration()" />
      </div>
      <Bars class="text-sm mr-6 max-md:hidden" :data="rightBars"></Bars>
      <Bars class="text-sm mr-6 hidden max-md:block" :data="[rightBars[rightBars.length - 1]]"></Bars>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { bars } from '#/types'
import { toast } from '@/plugins/toast'
import { playControl, useISMobileStore } from '@/stores'
import { Music } from '@/utils'
import { storeToRefs } from 'pinia'

// loadMusic()
let { musicName, singerName, songImg, playUrl, currentTime, isPlay } = storeToRefs(playControl())

let mp3 = Music
let timer: undefined | NodeJS.Timeout

let leftBars = [
  {
    name: '收藏',
    ico: ['fa-regular fa-heart', 'fa-solid'],
    fun: function (e: Event) {
      let target = e.target as HTMLElement
      target.classList.toggle(this.ico[1])
      target.style.color = '#ff0000'
    },
  },
  {
    name: '评论',
    ico: 'fa-regular fa-comment-dots',
  },
  {
    name: '下载',
    ico: 'fa-solid fa-download',
  },
] as bars[]

let rightBars = [
  {
    name: '音量',
    ico: ['fa-solid fa-volume-high', 'fa-volume-low', 'fa-volume-xmark'], //大中无
    fun: function (e: Event & { target: HTMLElement }) {
      e.target.classList.toggle(this.ico[2])
      console.log(e.target)
    },
  },
  {
    name: '模式',
    ico: 'fa-solid fa-repeat',
    fun: function (e: Event & { target: HTMLElement }) {},
  },
  {
    name: '列表',
    ico: 'fa-solid fa-list-ol',
  },
] as bars[]

// document.addEventListener('keyup', async (e) => {
//   if (e.key == ' ') {
//     await play()
//   }
// })
/**
 * @description 播放
 */

async function play() {
  if (isPlay.value == true) {
    mp3.pause()
    console.log('暂停了')
    clearInterval(timer)
  } else {
    try {
      await mp3.play(playUrl.value)
    } catch (err: ErrorEvent | any) {
      toast.error(err.toString())
    }
    timer = setInterval(() => {
      currentTime.value = mp3.getCurrentTime()
    }, 1000)
  }
}
//播放完成事件
// mp3.addEventListener('ended', () => {
//   clearInterval(timer)
//   toast.info('播放完成')
//   isPlay.value = false
// })

/**
 * 跳转播放
 * @param e
 */
function jump(e: MouseEvent) {
  let dom = e.target as HTMLElement
  //   try {
  //     let position = e.offsetX / dom.offsetWidth
  //     mp3.setCurrentTime(mp3.getDuration() * position)
  //   } catch (error) {
  //     location.reload()
  //   }
}
</script>

<style scoped lang="scss">
.playBar {
  transition: 0.3s all ease;
  @apply w-full relative flex lg:justify-between flex-nowrap p-2;

  .playBar-progress {
    #idot {
      display: block;
    }

    &:hover {
      #idot {
        display: block;
      }
    }
  }

  .play_bg {
    height: 3.5rem;
    width: 3.5rem;
    position: relative;

    i {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffffee;
      font-size: 2rem;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &:hover i {
      opacity: 0.6;
      z-index: 100;
    }
  }
}
</style>
