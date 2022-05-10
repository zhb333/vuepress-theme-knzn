import { defineClientAppSetup } from '@vuepress/client'
import { setupDarkMode, setupScrollTop } from './hooks'

export default defineClientAppSetup(() => {
  setupDarkMode()
  setupScrollTop()
})
