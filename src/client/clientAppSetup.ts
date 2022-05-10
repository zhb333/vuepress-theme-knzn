import { defineClientAppSetup } from '@vuepress/client'
import { setupDarkMode, setupScrollTop } from './hooks'
import { onMounted } from 'vue'
import AOS from 'aos'

export default defineClientAppSetup(() => {
  setupDarkMode()
  setupScrollTop()
  onMounted(() => {
    AOS.init({
      disable: 'mobile',
    })
  })
})
