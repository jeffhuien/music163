import { getDeviceSize, getIsMobile } from './getDeviceSize'
import store from './store'
import env from './env'
import Music from './Audio'
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

export { Music, formatTime, env, getDeviceSize, getIsMobile, store }
