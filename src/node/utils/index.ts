import type { ThemeOptions } from '../types'
import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'

export const DEFAULT_LOCALE_OPTIONS: ThemeOptions = {
  dirname: 'docs',
  perPage: 10,
  medias: [],
  maxCategories: 6,
  maxTags: 10,
  beian: 'Apache-2.0',
  beianUrl: 'https://beian.miit.gov.cn/#/Integrated/index',
  siteStartDate: '1990',
  comment: {
    repo: '/',
    repoId: '',
    category: '',
    categoryId: '',
    lang: 'zh-CN',
  },
}

/**
 * 合并默认配置
 */
export const assignOptions = (options: ThemeOptions): void => {
  // 生成导航
  if (options.comment) {
    options.comment = {
      ...DEFAULT_LOCALE_OPTIONS.comment,
      ...options.comment,
    }
  } else {
    DEFAULT_LOCALE_OPTIONS.comment = undefined
  }
  Object.assign(options, {
    ...DEFAULT_LOCALE_OPTIONS,
    ...options,
  })
}

/**
 * 添加额外的页面
 * @param app App
 */
export const addExtraPages = async (app: App): Promise<void> => {
  const extraPages = [
    { path: '/search/', title: '搜索' },
    { path: '/tags/', title: '标签' },
    { path: '/categories/', title: '分类' },
    { path: '/PostsLayout/', title: '文件夹' },
  ]
  for (const item of extraPages) {
    if (app.pages.every((page) => page.path !== item.path)) {
      const page = await createPage(app, {
        path: item.path,
        frontmatter: {
          title: item.title,
        },
        content: item.title,
      })
      app.pages.push(page)
    }
  }
}
