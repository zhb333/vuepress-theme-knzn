import type { Page, Theme } from '@vuepress/core'
import type { ThemeOptions, ThemePageData } from './types'
import { path } from '@vuepress/utils'
import { gitPlugin } from '@vuepress/plugin-git'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { tocPlugin } from '@vuepress/plugin-toc'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { containerPlugin } from '@vuepress/plugin-container'
import { addExtraPages, assignOptions } from './utils'
import md5 from 'md5'
export * from './utils'
export * from './types'

export default (options: ThemeOptions): Theme => {
  assignOptions(options)
  return (app) => ({
    name: 'vuepress-theme-knzn',
    layouts: path.resolve(__dirname, '../client/layouts'),
    clientConfigFile: path.resolve(__dirname, '../client/clientConfig.ts'),
    alias: {
      '@theme-style': path.resolve(__dirname, '../client/assets/styles'),
    },
    extendsPageOptions: (pageOptions, app) => {
      if (pageOptions.filePath) {
        let relativePath = path.relative(process.cwd(), pageOptions.filePath)
        relativePath = relativePath.slice(relativePath.indexOf('/'))
        if (!/^\/(index|readme)\.md$/i.test(relativePath)) {
          //   const dirPath = relativePath.slice(
          //     0,
          //     relativePath.lastIndexOf('/') + 1
          //   )
          //   pageOptions.frontmatter = pageOptions.frontmatter ?? {}
          //   pageOptions.frontmatter.permalinkPattern = `${dirPath}:slug.html`
          // }

          pageOptions.frontmatter = pageOptions.frontmatter ?? {}
          pageOptions.frontmatter.permalink = `/${md5(pageOptions.filePath)}/`
        }
      }
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
      tocPlugin(),
      activeHeaderLinksPlugin({
        // 配置项
        headerLinkSelector: 'a.vuepress-toc-link',
      }),
      prismjsPlugin(),

      // @vuepress/plugin-container
      containerPlugin({
        type: 'tip',
        locales: {
          en: { defaultInfo: 'TIP' },
        },
      }),
      containerPlugin({
        type: 'warning',
        locales: {
          en: { defaultInfo: 'WARNING' },
        },
      }),
      containerPlugin({
        type: 'danger',
        locales: {
          en: { defaultInfo: 'DANGER' },
        },
      }),
      containerPlugin({
        type: 'details',
        before: (info) =>
          `<details class="custom-container details">${
            info ? `<summary>${info}</summary>` : ''
          }\n`,
        after: () => '</details>\n',
      }),
      containerPlugin({
        type: 'code-group',
        before: () => `<CodeGroup>\n`,
        after: () => '</CodeGroup>\n',
      }),
      containerPlugin({
        type: 'code-group-item',
        before: (info) => `<CodeGroupItem title="${info}">\n`,
        after: () => '</CodeGroupItem>\n',
      }),
    ],
    async onInitialized(app) {
      await addExtraPages(app)
    },
  })
}
