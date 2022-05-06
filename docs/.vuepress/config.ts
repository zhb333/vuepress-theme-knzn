import { defineUserConfig } from 'vuepress'
import { KnznTheme } from '../../src'
import { navbar } from './configs/navbar'
import { particlesOptions } from './configs/particlesOptions'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: 'knzn.net',
  description: '种一棵树最好的时间是十年前，其次是现在！',

  // https://favicon.io/favicon-converter
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'application-name', content: '前端程序猿' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: '前端程序猿' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],

  // bundler: '@vuepress/bundler-webpack',
  debug: true,
  // 主题和它的配置
  theme: KnznTheme({
    navbar,
    blogger: '前端程序猿',
    slogan: '佛曰：我执，我痛苦的根源！',
    perPage: 10,
    maxCategories: 6,
    maxTags: 10,
    beian: '粤ICP备20016112号-2',
    footerStartDate: '2020',
    // logo: '',
    avatar: '/images/avatar.jpg',
    backgroundImage: '/images/bg-light.svg',
    // particlesOptions: {},
    // postImage: '',
    palettes: {
      light: {
        // logo: '',
        // avatar: '',
        // backgroundImage: '',
        // particlesOptions: {},
        // postImage: '',
      },
      dark: {
        // logo: '',
        // avatar: '',
        backgroundImage: '/images/bg-dark.jpg',
        // particlesOptions: {},
        // postImage: '',
      },
      yellow: {
        // logo: '',
        // avatar: '',
        backgroundImage: '/images/bg-yellow.jpg',
        particlesOptions,
        // postImage: '',
      },
      green: {
        // logo: '',
        // avatar: '',
        backgroundImage: '/images/bg-green.jpg',
        particlesOptions,
        // postImage: '',
      },
    },
    medias: [
      { link: 'mailto:1140457303@qq.com', icon: 'email' },
      {
        link: 'http://wpa.qq.com/msgrd?v=3&uin=1140457303&site=qq&menu=yes',
        icon: 'QQ',
      },
      { link: 'https://www.jianshu.com/u/f22487800f07', icon: 'jianshu' },
      { link: 'https://gitee.com/zhanghuanbiao', icon: 'gitee' },
      { link: 'https://github.com/zhb333', icon: 'github' },
    ],
    backgroundImageMap: {
      // light: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
      // dark: '',
      // yellow: '',
      // green: '',
    },
  }),
})
