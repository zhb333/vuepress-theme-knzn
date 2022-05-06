import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import Particles from 'particles.vue3'

import 'animate.css'
import 'aos/dist/aos.css'
import './assets/styles/index.scss'
import './assets/iconfont/iconfont.css'

import { setupPages } from './hooks'

export default defineClientAppEnhance(async ({ app, router, siteData }) => {
  // ...
  // compat with @vuepress/plugin-external-link-icon
  app.component('AutoLinkExternalIcon', () => {
    const ExternalLinkIcon = app.component('ExternalLinkIcon')
    if (ExternalLinkIcon) {
      return h(ExternalLinkIcon)
    }
    return null
  })

  await setupPages(app, router)

  app.use(Particles)
})
