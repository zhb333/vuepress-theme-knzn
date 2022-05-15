import { defineUserConfig } from 'vuepress'
import { KnznTheme } from '../../src'
// import { particlesOptions } from './particlesOptions'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: 'knzn.net',
  description: '大前端知识分享网站',
  debug: true,
  bundler: webpackBundler(),
  theme: KnznTheme({
    // logo
    logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
    // 背景图片
    backgroundImage: '/images/bg.svg',
    darkBackgroundImage: '/images/bg-dark.jpg',
    // 文章简介图片
    // postImage: 'https://v2.vuepress.vuejs.org/images/hero.png',
    darkPostImage: '/images/post-dark.svg',
    // 背景canvas 动画配置
    // particlesOptions,

    /**
     * 博主信息相关
     */
    // 博主名称
    blogger: '前端程序猿',
    // 铭言
    slogan: '种一棵树最好的时间是十年前，其次是现在！',
    // 头像
    avatar: '/images/avatar.jpg',
    darkAvatar: '/images/avatar-dark.jpg',
    // 其它媒体
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

    /**
     * 数据显示相关
     */
    // 列表页显示的文章个数
    perPage: 10,
    // 主页显示分类的个数
    maxCategories: 6,
    // 主页显示的标签个数
    maxTags: 10,

    // 导航
    // navbar: [],

    /**
     *  页脚相关配置
     */
    // 备案号
    beian: '粤ICP备20016112号-2',
    // 备案查询地址
    beianUrl: '',
    // 网址起始时间
    siteStartDate: '2018',
    comment: {
      repo: 'zhb333/vuepress-theme-knzn',
      repoId: 'R_kgDOHSwV_A',
      category: 'General',
      categoryId: 'DIC_kwDOHSwV_M4CPHIA',
    },
  }),
})
