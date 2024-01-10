import setupToast from './toast'
import { App } from 'vue'
export default function setupPlugins(app: App) {
  setupToast(app)
}
