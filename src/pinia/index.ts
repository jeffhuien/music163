import localStorePlugin from '@/utils/local'
import { createPinia } from 'pinia'
import { App } from 'vue'

export default function setupPinia(app: App) {
  const pinia = createPinia()
  pinia.use(localStorePlugin)
  app.use(pinia)
}
