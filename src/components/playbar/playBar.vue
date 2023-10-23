<template>
  <div class="playBar">
    <!-- 进度条 -->
    <div class="playBar-progress w-full pb-2 h-[0.2rem] hover:cursor-pointer absolute top-0" @click="jump($event)">
      <span
        class="absolute block h-[0.1rem] bg-blue-600"
        :style="['width:' + (currentTime / mp3.duration) * 100 + '%']"
        id="progress">
      </span>
      <span
        class="w-2 h-2 rounded absolute -translate-y-1/2 z-10 bg-pink-300"
        :style="['left:' + (currentTime / mp3.duration) * 100 + '%']"
        id="idot"></span>
    </div>

    <div class="shrink-0 flex items-center justify-between w-[30vw]">
      <div class="play_bg mr-2">
        <i class="fa-solid fa-angles-up"></i>
        <!-- <!== 歌曲封面 ==> -->
        <el-avatar class="absolute top-0 left-2 bg-none" shape="square" :size="'large'" :src="songImg" />
      </div>

      <div class="flex shrink-0 flex-1 bars ml-2 flex-col justify-center items-start max-sm:w-[30vw] relative">
        <RunHouse class="text-sm" :data="data.musicName"></RunHouse>
        <Bars class="text-sm mt-[.5rem] w-full max-sm:!hidden" :data="leftBars"></Bars>
      </div>
    </div>

    <!-- <!== 控制条 ==> -->
    <div class="!flex justify-center flex-1 relative">
      <div class="flex justify-center items-center gap-8 text-xl">
        <i class="fa-solid fa-backward-step text-pink-300"></i>
        <i
          class="fa-solid text-pink-300 shrink-0 text-4xl w-6"
          :class="[status ? 'fa-pause' : 'fa-play ']"
          @click="play"></i>
        <i class="fa-solid fa-forward-step text-pink-300"></i>
      </div>

      <div class="absolute right-0 top-1/4 mr-4 max-lg:!hidden">
        <timeText class="text-sm" :CurTime="currentTime" :totalTime="mp3.duration" />
      </div>
    </div>

    <div class="w-[30vw] flex items-center justify-end">
      <Bars class="text-sm max-sm:!hidden mr-12" :data="rightBars"></Bars>
      <Bars class="text-sm sm:hidden mr-6" :data="[rightBars[rightBars.length - 1]]"></Bars>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { bars } from '#/types'

let data = defineProps(['musicName', 'songImg', 'playUrl'])
let mp3 = new Audio()
mp3.volume = 1

let status = ref(false) //false暂停
let timer: NodeJS.Timer
let currentTime = ref(0)

let leftBars = [
  {
    name: '收藏',
    ico: ['fa-regular fa-heart', 'fa-solid'],
    fun: function (e: { target: { classList: { toggle: (arg0: string) => void } } }) {
      e.target.classList.toggle(this.ico[1])
      console.log(e.target)
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
  {
    name: '分享',
    ico: 'fa-solid fa-arrow-up-right-from-square',
  },
] as bars[]

let rightBars = [
  {
    name: '音量',
    ico: ['fa-solid fa-volume-high', 'fa-volume-low', 'fa-volume-xmark'], //大中无
    fun: function (e: { target: { classList: { toggle: (arg0: string) => void } } }) {
      e.target.classList.toggle(this.ico[2])
      console.log(e.target)
    },
  },
  {
    name: '模式',
    ico: 'fa-solid fa-repeat',
    fun: function (e: any) {},
  },
  {
    name: '歌词',
    ico: 'fa-brands fa-amilia',
  },
  {
    name: '列表',
    ico: 'fa-solid fa-list-ol',
  },
] as bars[]

watch(
  () => data.playUrl,
  (newValue: string, old: string) => {
    mp3.src = newValue
  },
)

document.addEventListener('keyup', (e) => {
  if (e.key == ' ') {
    play()
  }
})
/**
 * @description 播放
 */
function play() {
  try {
    if (status.value) {
      mp3.pause()
      console.log('暂停了')
      clearInterval(timer)
      status.value = false
    } else {
      status.value = true
      mp3.play()
      console.log('开始播放了')

      timer = setInterval(() => {
        currentTime.value = mp3.currentTime
        console.log(currentTime.value)
      }, 1000)
    }
  } catch (error) {
    location.reload()
  }
}

//播放完成事件
mp3.addEventListener('ended', () => {
  clearInterval(timer)
  currentTime.value = mp3.duration
  let t = document.querySelector('#idot')! as HTMLSpanElement
  t.style.left = 99 + '%'
  status.value = false
})

/**
 * 跳转播放
 * @param e
 */
function jump(e: MouseEvent) {
  let dom = e.target as HTMLElement
  try {
    let position = e.offsetX / dom.offsetWidth
    mp3.currentTime = mp3.duration * position
  } catch (error) {
    location.reload()
  }
}
</script>

<style scoped lang="scss">
.playBar {
  transition: 0.3s all ease;
  @apply w-full relative flex justify-between py-2 flex-nowrap;

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
      top: 0;
      left: 6px;
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
