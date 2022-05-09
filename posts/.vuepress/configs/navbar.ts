export const navbar = [
  {
    text: '指南',
    link: '/guide/',
  },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          '/reference/cli.md',
          '/reference/config.md',
          '/reference/frontmatter.md',
          '/reference/components.md',
          '/reference/plugin-api.md',
          '/reference/theme-api.md',
          '/reference/client-api.md',
          '/reference/node-api.md',
        ],
      },
      {
        text: '打包工具',
        children: [
          '/reference/bundler/vite.md',
          '/reference/bundler/webpack.md',
        ],
      },
      {
        text: '默认主题',
        children: [
          '/reference/default-theme/config.md',
          '/reference/default-theme/frontmatter.md',
          '/reference/default-theme/components.md',
          '/reference/default-theme/markdown.md',
          '/reference/default-theme/styles.md',
          '/reference/default-theme/extending.md',
        ],
      },
    ],
  },
  {
    text: '插件',
    children: [
      {
        text: '常用功能',
        children: [
          '/reference/plugin/back-to-top.md',
          '/reference/plugin/container.md',
          '/reference/plugin/external-link-icon.md',
          '/reference/plugin/google-analytics.md',
          '/reference/plugin/medium-zoom.md',
          '/reference/plugin/nprogress.md',
          '/reference/plugin/register-components.md',
        ],
      },
      {
        text: '内容搜索',
        children: [
          '/reference/plugin/docsearch.md',
          '/reference/plugin/search.md',
        ],
      },
      {
        text: 'PWA',
        children: [
          '/reference/plugin/pwa.md',
          '/reference/plugin/pwa-popup.md',
        ],
      },
      {
        text: '语法高亮',
        children: [
          '/reference/plugin/prismjs.md',
          '/reference/plugin/shiki.md',
        ],
      },
      {
        text: '主题开发',
        children: [
          '/reference/plugin/active-header-links.md',
          '/reference/plugin/git.md',
          '/reference/plugin/palette.md',
          '/reference/plugin/theme-data.md',
          '/reference/plugin/toc.md',
        ],
      },
    ],
  },
  {
    text: '了解更多',
    children: [
      {
        text: '深入',
        children: [
          '/advanced/architecture.md',
          '/advanced/plugin.md',
          '/advanced/theme.md',
          {
            text: 'Cookbook',
            link: '/advanced/cookbook/',
          },
        ],
      },
      {
        text: '其他资源',
        children: [
          '/contributing.md',
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
        ],
      },
    ],
  },
]
