import { App } from 'vue'
import 'vue-toast-notification/src/themes/bootstrap/index.scss'
import { useToast } from 'vue-toast-notification'

export default function setupToast(App: App) {}
const toast = useToast({
  position: 'top',
  duration: 2000,
  dismissible: true,
  type: 'info',
})

export { toast }
