import type { Page, Theme } from '@vuepress/core'
import type { ThemeOptions, ThemePageData } from './types'
import { path } from '@vuepress/utils'
import { gitPlugin } from '@vuepress/plugin-git'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { addExtraPages, assignOptions } from './utils'

export const KnznTheme = (options: ThemeOptions): Theme => {
  assignOptions(options)
  return {
    name: 'vuepress-theme-knzn',
    layouts: path.resolve(__dirname, '../client/layouts'),
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.ts'
    ),
    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.ts'),
    alias: {
      '@theme-style': path.resolve(__dirname, '../client/assets/styles'),
    },
    extendsPage: (page: Page<Partial<ThemePageData>>) => {
      page.routeMeta.title = page.title
      page.data.filePathRelative = page.filePathRelative
    },
    plugins: [
      gitPlugin({
        createdTime: false,
        updatedTime: true,
        contributors: true,
      }),
      externalLinkIconPlugin(),
      themeDataPlugin({ themeData: options }),
    ],
    async onInitialized(app) {
      await addExtraPages(app)
    },
  }
}

export * from './utils'
export * from './types'
