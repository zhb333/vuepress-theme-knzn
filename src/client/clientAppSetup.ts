import { defineClientAppSetup } from '@vuepress/client'
import { onMounted } from 'vue'
import {
  // setupPages,
  setupThemeMode,
} from './hooks'
import AOS from 'aos'

export default defineClientAppSetup(() => {
  // ...
  setupThemeMode()
  // setupCurrentLayout()
  onMounted(() => {
    // window.document.documentElement.setAttribute('data-theme', 'default')
    // setupPages()
    AOS.init({
      disable: 'mobile',
    })
  })
})
