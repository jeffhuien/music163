//获取设备尺寸
function getDeviceSize() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  return { width, height }
}
//获取设备尺寸，是移动设备就返回true
function getIsMobile() {
  if (getDeviceSize().width < 768) {
    return true
  }
  return false
}

export { getDeviceSize, getIsMobile }
