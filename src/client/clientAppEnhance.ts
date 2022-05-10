import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import './styles/index.scss'
import './iconfont/iconfont.css'
import 'animate.css'
import 'aos/dist/aos.css'

import { setupPages } from './hooks'

export default defineClientAppEnhance(async ({ app, router, siteData }) => {
  // compat with @vuepress/plugin-external-link-icon
  app.component('AutoLinkExternalIcon', () => {
    const ExternalLinkIcon = app.component('ExternalLinkIcon')
    if (ExternalLinkIcon) {
      return h(ExternalLinkIcon)
    }
    return null
  })

  await setupPages(app, router)
})
