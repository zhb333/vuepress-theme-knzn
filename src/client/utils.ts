import type { CategoryType, NavMenuItem } from './types'
import type { ISourceOptions } from 'tsparticles-engine'
import type { ThemePageData } from '../node'

import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/shared'

/**
 * 滚动的高度
 * @returns number
 */
export const getScrollTop = (): number =>
  window?.pageYOffset ||
  window?.document.documentElement.scrollTop ||
  window?.document.body.scrollTop ||
  0

/**
 * 是否滚动到底部
 * @param scrollTop 滚动条距离顶部的距离
 * @returns
 */
export const assetScrollToBottom = (scrollTop: number): boolean => {
  if (typeof window !== 'undefined') {
    const windowHeight =
      window?.document.documentElement.clientHeight ||
      window?.document.body.clientHeight // 可视区的高度
    const scrollHeight =
      window?.document.documentElement.scrollHeight ||
      window?.document.body.scrollHeight // dom元素的高度，包含溢出不可见的内容
    // console.log(
    //   'scrollHeight: ',
    //   scrollHeight,
    //   'right: ',
    //   scrollTop + windowHeight,
    //   'scrollTop: ',
    //   scrollTop,
    //   'windowHeight: ',
    //   windowHeight
    // )
    return (
      scrollHeight > windowHeight &&
      scrollHeight <= scrollTop + windowHeight + 200
    )
  }
  return false
}

/**
 * 滚动到顶部
 * @returns void
 */
export const scrollToTop = (): void =>
  window?.scrollTo({ top: 0, behavior: 'smooth' })

// tags 背景颜色
export const colors = [
  '#849b87',
  '#b1e5c1',
  '#41b9d7',
  '#f69880',
  '#e77c83',
  '#C158D3',
  '#5A5AB7',
]

/**
 * 获取页面信息
 * @param pages 页面信息数组
 * @param type 页面信息类型
 * @returns 特定页面信息数组
 */
export function getInfoFromPages(
  pages: ThemePageData[],
  type: 'categories' | 'tags'
): CategoryType[] {
  const result: Record<string, number> = {}
  pages.forEach((page) => {
    const infos = page.frontmatter[type]
    if (infos) {
      for (const info of infos) {
        if (!result[info]) {
          result[info] = 1
        } else {
          result[info]++
        }
      }
    }
  })
  const list = Object.entries(result).reduce((res, item) => {
    res.push({ text: item[0], num: item[1] })
    return res
  }, [] as CategoryType[])
  return list.sort((a, b) => b.num - a.num)
}

/**
 * 获取 根元素 css 样式值
 * @param key css 属性
 * @returns css 属性值
 */
export function getRootVar(key): string {
  return getComputedStyle(window?.document.documentElement)
    .getPropertyValue(key)
    .trim()
}

/**
 * 格式 时间戳 为日期
 * @param timestamp 时间戳
 * @returns 日期字符串
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const format = (num: number): string => {
    if (num < 10) return `0${num}`
    return `${num}`
  }
  return `${year}-${format(month)}-${format(day)}`
}

/**
 * 文章信息分隔符
 * @param infos 信息数组
 * @returns 分隔符连接的字符串
 */
export function formatListInfo(infos: string[]): string {
  return infos.join('、')
}

/**
 * 判断导航下拉菜单是否激活
 * @param item 导航项配置
 * @param path
 * @returns boolean
 */
export const isDropdownActive = (item: NavMenuItem, path: string): boolean => {
  let isActive = false
  const findFun = (obj: NavMenuItem): void => {
    if (obj.children) {
      for (const target of obj.children) {
        if (target.children) findFun(target)
        if (target.link === path) {
          isActive = true
        }
      }
    }
  }
  findFun(item)
  return isActive
}

/**
 * particles 背景配置
 */
export const particlesOptions: ISourceOptions = {
  fpsLimit: 120,
  background: {},
  particles: {
    color: { value: '#ffffff' },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'out',
      random: false,
      speed: 2,
      straight: false,
    },
    number: { density: { enable: true, area: 800 }, value: 80 },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
}
// export const particlesOptions: ISourceOptions = {
//   fpsLimit: 120,
//   particles: {
//     move: {
//       direction: 'none',
//       enable: true,
//       outModes: 'out',
//       random: false,
//       speed: 2,
//       straight: false,
//     },
//     number: { value: 100, density: { enable: true, value_area: 1000 } },
//     color: { value: ['#aa73ff', '#f8c210', '#83d238', '#33b1f8'] },
//     shape: {
//       type: 'circle',
//       stroke: { width: 0, color: '#fff' },
//       polygon: { nb_sides: 5 },
//       image: { src: 'img/github.svg', width: 100, height: 100 },
//     },
//     opacity: {
//       value: 0.6,
//       random: false,
//       anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
//     },
//     size: {
//       value: 2,
//       random: true,
//       anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
//     },
//     line_linked: {
//       enable: true,
//       distance: 120,
//       color: '#ffffff',
//       opacity: 0.4,
//       width: 1,
//     },
//   },
//   interactivity: {
//     detect_on: 'canvas',
//     events: {
//       onhover: { enable: true, mode: 'grab' },
//       onclick: { enable: false },
//       resize: true,
//     },
//     modes: {
//       grab: { distance: 140, line_linked: { opacity: 1 } },
//       bubble: { distance: 400, size: 40, duration: 2, opacity: 8 },
//       repulse: { distance: 200, duration: 0.4 },
//       push: { particles_nb: 4 },
//       remove: { particles_nb: 2 },
//     },
//   },
// }

export type RepoType = 'GitHub' | 'GitLab' | 'Gitee' | 'Bitbucket' | null

export const resolveRepoType = (repo: string): RepoType => {
  if (!isLinkHttp(repo) || /github\.com/.test(repo)) return 'GitHub'
  if (/bitbucket\.org/.test(repo)) return 'Bitbucket'
  if (/gitlab\.com/.test(repo)) return 'GitLab'
  if (/gitee\.com/.test(repo)) return 'Gitee'
  return null
}

export const editLinkPatterns: Record<Exclude<RepoType, null>, string> = {
  GitHub: ':repo/edit/:branch/:path',
  GitLab: ':repo/-/edit/:branch/:path',
  Gitee: ':repo/edit/:branch/:path',
  Bitbucket:
    ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default',
}

const resolveEditLinkPatterns = ({
  docsRepo,
  editLinkPattern,
}: {
  docsRepo: string
  editLinkPattern?: string
}): string | null => {
  if (editLinkPattern) {
    return editLinkPattern
  }

  const repoType = resolveRepoType(docsRepo)
  if (repoType !== null) {
    return editLinkPatterns[repoType]
  }

  return null
}

export const resolveEditLink = ({
  docsRepo,
  docsBranch,
  docsDir,
  filePathRelative,
  editLinkPattern,
}: {
  docsRepo: string
  docsBranch: string
  docsDir: string
  filePathRelative: string | null
  editLinkPattern?: string
}): string | null => {
  if (!filePathRelative) return null

  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern })
  if (!pattern) return null

  return pattern
    .replace(
      /:repo/,
      isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
    )
    .replace(/:branch/, docsBranch)
    .replace(
      /:path/,
      removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`)
    )
}
