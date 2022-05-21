import { defineClientConfig } from '@vuepress/client'
import { h, onMounted } from 'vue'
import Particles from 'particles.vue3'
import Badge from './components/global/Badge.vue'
import CodeGroup from './components/global/CodeGroup'
import CodeGroupItem from './components/global/CodeGroupItem.vue'
import NpmBadge from './components/global/NpmBadge.vue'
// import 'aos/dist/aos.css'
import './styles/index.scss'
import './iconfont/iconfont.css'
import 'animate.css'
import { setupDarkMode, setupPages, setupScrollTop } from './hooks'
// import AOS from 'aos'

export default defineClientConfig({
  async enhance({ app, router, siteData }) {
    /* eslint-disable vue/match-component-file-name */
    app.component('Badge', Badge)
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)
    app.component('NpmBadge', NpmBadge)
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
  },
  setup() {
    setupDarkMode()
    setupScrollTop()
    onMounted(() => {
      // AOS.init({
      //   disable: 'mobile',
      // })
    })
  },
  rootComponents: [],
})
