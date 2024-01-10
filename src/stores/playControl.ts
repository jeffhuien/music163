import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('playControl', () => {
  // let volume = 0
  // let currentTime = 0
  // let musicName = ''
  // let songImg = ''
  // let playUrl = 'undefined'
  let volume = ref<number>(23)
  let currentTime = ref<number>(0.01)
  let musicName = ref<string>()
  let singerName = ref<string>()
  let songImg = ref<string>()
  let playUrl = ref<string>('undefined')

  function add() {
    volume.value += 1
  }
  // },
  // changeVolume(num: number) {
  //   this.volume = num
  // },
  // changeMusicName(value: string) {
  //   this.musicName = value
  // },
  // changeSongImg(value: string) {
  //   this.songImg = value
  // },
  // changePlayUrl(value: string) {
  //   this.playUrl = value
  // },
  return { volume, singerName, musicName, songImg, playUrl, currentTime, add }
})
