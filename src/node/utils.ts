import type { ThemeLocaleOptions } from './types'
import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'

export const DefinedIcons = [
  'pinterest',
  'youtube',
  'zhihu',
  'linkedin',
  'facebook',
  'instagram',
  'QQ',
  'twitter',
  'gitlab',
  'github',
  'email',
  'gitee',
  'jianshu',
]

export const DEFAULT_LOCALE_OPTIONS: ThemeLocaleOptions = {
  perPage: 10,
  medias: [],
  maxCategories: 6,
  maxTags: 10,
  beian: 'Apache-2.0',
  beianUrl: 'https://beian.miit.gov.cn/#/Integrated/index',
  footerStartDate: '1990',
}

/**
 * 合并默认配置
 * @param localeOptions 主题配置
 */
export const assignOptions = (localeOptions: ThemeLocaleOptions): void => {
  if (!localeOptions.locales) {
    localeOptions.locales = {}
  }

  Object.assign(localeOptions, {
    ...DEFAULT_LOCALE_OPTIONS,
    ...localeOptions,
  })
}

/**
 * 获取Md 第一个段落
 * @param markdown html
 * @returns string
 */
export const getMarkdownFirstParagraph = (markdown: string): string => {
  // 返回第一个 p 元素
  const matches = markdown.match(/(<p.+<\/p>)/gm)

  if (matches) {
    return matches[0]
  }
  return ''
}
export const extraPages = [
  // { path: '/', title: '首页' },
  { path: '/search/', title: '搜索' },
  { path: '/tags/', title: '标签' },
  { path: '/categories/', title: '分类' },
]

/**
 * 添加额外的页面
 * @param app App
 */
export const addExtraPages = async (app: App): Promise<void> => {
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
