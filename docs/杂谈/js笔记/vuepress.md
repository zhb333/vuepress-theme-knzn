---
title: VuePress 开发静态博客
date: 2020-05-27 10:36:22
categories:
 - frontEnd
tags:
 - vue
---

> 本文，仅针对开发过程的记录，具体配置，请移步 [VuePress 官网](https://vuepress.vuejs.org/zh/ "VuePress 官网") AND [@vuepress/theme-blog 官网](https://vuepress-theme-blog.ulivz.com/ "@vuepress/theme-blog 官网")


**点击 [静态博客](https://zhb333.github.io/readme-blog/) 查看线上效果**

**点击 [查看源码](https://github.com/zhb333/readme-blog) 查看线上效果**

## 一、准备工作

### 创建 [github](https://github.com "github") 新项目，并将项目克隆到本地

 **注意：** *创建项目时选择 `.gitignore` 为 `Node`*, 这样初始化项目时，会自动生成 `.gitignore` 文件，并自动将 `node_modules` 等文件加加入其中， 这样避免了 `IDE` 监听 `node_modules` 中大量的文件而造成 `IDE` 卡顿的问题

```sh
git clone git@github.com:zhb333/readme-blog.git  # 克隆到本地
```

### 使用 `NPM` 初始化项目

```sh
cd readme-blog     # 进入项目目录
npm init           # 进入项目目录
# 初始化过程，根据实际情况填写配置
# ……
```

### 安装

```sh
yarn add vuepress @vuepress/theme-blog -D # Install the dependencies
# OR npm install vuepress @vuepress/theme-blog -D
```

### 依赖版本
```json
"@vuepress/theme-blog": "^2.2.0",
"vuepress": "^1.4.0"
```

## 二、开发阶段

### 目录结构 

├── _posts (存放文章)  
│   └── 2020-03-21-VuePress开发静态博客.md    
│   └── ...   
├── .vuepress (vuepress 相关)  
│   ├── public  
│   │ └── favicon.ico (ico图标)   
│   ├── styles (样式)  
│   │   ├── index.styl (自定义样式)  
│   │   └── palette.styl (stylus 预设)   
│   ├── theme (主题)  
│   │     ├── layouts(布局)  
│   │     │    ├── clock.js(主页效果用)  
│   │     │    └── IndexHome.vue(主页布局)    
│   │     └── index.js(主题入口)    
│   └── config.js (Vuepress配置)  
│  
└── package.json

### 主题
>  官方博客主题 `@vuepress/theme-blog`，没有主页的功能，为了让博客有个炫酷的主页，因此继承 `@vuepress/theme-blog`，自定义主题

#### .vuepress/theme/index.js
```js
module.exports = {
  extend: '@vuepress/theme-blog' // 继承`@vuepress/theme-blog
}
```

### 编写基本配置

**.vuepress/config.js**  
```js
module.exports = {
  title: 'forapi.cn', // 站点名称
  description: '学习记录 代码分享 经验总结 开发教程', // 描述
  lange: 'zh-CN', // 语言
  theme: require.resolve('./theme/'), // 使用自定义主题
  markdown: { // markdown 配置
    lineNumbers: true
  },
  themeConfig: { // @vuepress/theme-blog 配置
    dateFormat: 'YYYY-MM-DD',
    nav: [ // 导航
      {
        text: 'Blog',
        link: '/posts/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
    directories: [ // 目录分类器
      {
        id: 'post',
        dirname: '_posts',
        path: '/posts/',
        itemPermalink: '/posts/:year/:month/:day/:slug'
      },
    ],
    footer: { // 页脚
      contact: [
        {
          type: 'github',
          link: 'https://github.com/zhb333/readme-blog',
        }
      ],
      copyright: [
        {
          text: '粤ICP备20016112号',
          link: 'http://beian.miit.gov.cn',
        },
        {
          text: 'MIT Licensed | Copyright © 2020-present forapi.cn',
          link: 'https://github.com/zhb333/readme-blog',
        },
      ]
    }
  }
}
```
### 编写 `NPM`运行脚本

#### package.json
```json
"scripts": {
  "dev": "vuepress dev .",
  "build": "vuepress build ."
},
```

### 启动开发环境

```sh
yarn dev
```

**默认端口是`8080` 如果`8080`端口已被占用，会自动分配其它空闲端口，请注意！**

不出意料，可以在浏览器中看到项目已经启动，由于在 `themeConfig.directories` 中，没有定义 `/` 路径的目录分类，所以首页目前为 `404` 页面，点击导航栏中的 `Blog` 可以看到存放在 `_posts` 目录下的文章列表

### 特别强调 - 重启服务

> 在开发环境下，修改配置，新增任何文件都必须**重启服务**，不然，`Vuepress` 默认监听不到这些变化，编写或修改已经存在的 `markdown` 文件，页面会热更新, 但是修改 `markdown` 文件中 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html) 的内容，还是得**重启服务**才能生效！


### 主页配置

> ` @vuepress/theme-blog` 认为一个 `URL` 路径对应一个文章目录，如我们存放文章的 `_posts` 目录，但是，我们的主页只是为了展示炫酷效果，所以我们可以采用比较 `Hack` 的方法，解决这个问题

#### `themeConfig.directories` 配置

```js {2,3,4,5,6,7}
directories: [
  { // 主页配置，自定义主题就是为了这
    id: 'home',
    dirname: '_posts',
    path: '/',
    layout: 'IndexHome' // 自定义首页布局组件
  },
  {
    id: 'post',
    dirname: '_posts',
    path: '/posts/',
    itemPermalink: '/posts/:year/:month/:day/:slug'
  },
],
```

### 编写炫酷的主页

> 主页编写，就像在开发一个 `Vue` 组件一样，具体想实现什么样的效果，全凭个人喜好，可以参考本人的，但我希望您能自己编写！

#### 编写 .vuepress/theme/layouts/IndexHome.vue

**点击 [主页布局组件](https://github.com/zhb333/readme-blog/tree/master/.vuepress/theme/layouts) 查看相关代码**

**提醒：** 修改配置或新增文件时，不要忘记随时 **重启服务**


### 样式调整
> ` 相信 @vuepress/theme-blog` 的紫色主题，并不是每个人都喜欢，因此可以通过 `.vuepress/styles/palette.styl` 修改主题配色等，通过 `.vuepress/styles/index.styl` 调整全局样式

**以下是本人研究并修改的样式，仁者见仁智者见智吧！**

#### `.vuepress/styles/palette.styl`

```styl
$accentColor = #42A5F5
$footerBgColor = lighten($accentColor, 10%)
$footerColor = #fff
$headerHeight = 60px
```

#### `.vuepress/styles/index.styl`
```css
#header{
  padding 0 32px
  padding-top 10px
}

.header-wrapper .title a {
  text-transform none
  color $accentColor
  font-size 24px
}

#mobile-header .mobile-header-title .mobile-home-link{
  text-transform none
  color $accentColor
}

#vuepress-theme-blog__post-layout .vuepress-blog-theme-content{
  padding 0
  box-shadow none

}
#vuepress-theme-blog__post-layout .vuepress-blog-theme-content  .post-title {
  margin-top 0
  font-size 26px
}

.content-wrapper {
  padding-top 90px
  padding-bottom 20px
  min-height: calc(100vh - 80px - 90px);
}
```

## 三、功能增强

### 评论功能

> 使用 ` @vuepress/theme-blog` 内置的 ` @vssue/vuepress-plugin-vssue` 插件  

> 代码托管平台遵从 OAuth 2 spec 提供了 OAuth API。Vssue 利用平台提供的 OAuth API，使得用户可以登录并发表评论。

#### 使用之前需要创建  `OAuth App`

点击 [GitHub OAuth App](https://vssue.js.org/zh/guide/github.html) 查看创建步骤

创建好 [GitHub OAuth App](https://vssue.js.org/zh/guide/github.html) 之后，将得到 `Client ID` 以及 `Client Secret`

#### themeConfig.comment

```js
// Vssue
{
  service: 'vssue',
  owner: 'You', // github 用户名
  repo: 'Your repo', // 仓库名
  clientId: 'Your clientId',
  clientSecret: 'Your clientSecret',
}
```

### 订阅功能

> 使用  ` @vuepress/theme-blog` 内置的 `vuepress-plugin-mailchimp` 插件

使用订阅功能之前，需要先到 [mailchimp](https://mailchimp.com/) 注册一个账号

注册成功后，点击 [获取 endpoint](https://vuepress-plugin-mailchimp.billyyyyy3320.com/#config) 的方法

#### themeConfig.newsletter

```js
{
  title: '邮件订阅',
  content: '请输入您的邮箱...',
  submitText: '订阅',
  endpoint: 'https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138'
}
```

### 网站增强

```js
themeConfig: {
  sitemap: { // Sitemap generator plugin for vuepress.
    hostname: 'http://forapi.cn'
  },

  feed: { // RSS, Atom, and JSON feeds generator plugin for VuePress 1.x
    canonical_base:'http://forapi.cn',
  },

  smoothScroll: true // allows you to enable smooth scrolling
}
```

## 部署

点击 [部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages) 进入官网查看具体的部署步骤

（完！） :sweat_smile: