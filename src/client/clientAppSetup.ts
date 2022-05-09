import { defineClientAppSetup } from '@vuepress/client'
import { setupDarkMode } from './hooks'

export default defineClientAppSetup(() => {
  setupDarkMode()
})
