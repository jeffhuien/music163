import { getDeviceSize, getIsMobile } from './getDeviceSize'
import store from './store'
import env from './env'
import Music from './Audio'
import { musicLocal } from '#/types'
import { fee } from './doc'
import { playControl, queryUserList, searchHistory } from '@/stores'

/**
 *
 * @param time ms
 * @returns 00:00
 * @example formatTime(130)=>02:10
 */
function formatTime(time: number, type: 'ms' | 'min' = 'min') {
  if (type == 'ms') time = time / 1000

  return `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(time % 60)
    .toString()
    .padStart(2, '0')}`
}

function loadMusic() {
  let cache = store.get('mp3') as musicLocal
  if (!cache) return
  playControl().playUrl = cache.playUrl
  playControl().songImg = cache.songImg
  playControl().musicName = cache.musicName
  playControl().singerName = cache.singerName
  playControl().currentTime = cache.currentTime
}
function loadSearchHistory() {
  let cache = store.get('searchHistory')
  if (!cache) return
  searchHistory().searchHistory = JSON.parse(cache) as unknown as string[]
}

function loadQueryUserList() {
  let cache = store.get('queryUserList')
  if (!cache) return
  queryUserList().userList = JSON.parse(cache) as unknown as string[]
}

export {
  fee,
  Music,
  formatTime,
  env,
  getDeviceSize,
  getIsMobile,
  store,
  loadMusic,
  loadSearchHistory,
  loadQueryUserList,
}
