import type { Page, Theme } from '@vuepress/core'
import type { ThemeLocaleOptions, ThemePageData } from './types'
import { path } from '@vuepress/utils'
import { gitPlugin } from '@vuepress/plugin-git'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { addExtraPages, assignOptions } from './utils'

export const KnznTheme = (localeOptions: ThemeLocaleOptions): Theme => {
  assignOptions(localeOptions)
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
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
      // page.data.excerpt =
      //   page.data.excerpt ||
      //   getMarkdownFirstParagraph(app.markdown.render(page.content))
    },
    plugins: [
      gitPlugin({
        createdTime: false,
        updatedTime: true,
        contributors: true,
      }),
      externalLinkIconPlugin(),
      themeDataPlugin({ themeData: localeOptions }),
    ],
    async onInitialized(app) {
      await addExtraPages(app)
    },
  }
}

export * from './utils'
export * from './types'
