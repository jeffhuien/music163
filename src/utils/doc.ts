export let fee = {
  // '0': '无版权',
  '1': '此为VIP歌曲仅试听',
  '4': '购买专辑即可畅听',
  // 8: '非会员可免费播放低音质，会员可播放高音质及下载'
} as fee

interface fee {
  [key: string]: string
}
