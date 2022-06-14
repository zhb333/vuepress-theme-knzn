import type { MenuItem, MenuList, ThemePageData } from '../../node'
import type { LabelItem, PostInfo } from '../types'

// tags 背景颜色
export const Tagcolors = [
  '#849b87',
  '#b1e5c1',
  '#41b9d7',
  '#f69880',
  '#e77c83',
  '#C158D3',
  '#5A5AB7',
]

export const isPostsLayout = (path: string): boolean => {
  return path.startsWith('/PostsLayout')
}

/**
 * 获取左侧菜单
 * @param pages
 * @param dirPath 当前文章所属的目录 /dirname/.../
 * @returns
 */
export function getSidebarPages(
  pages: ThemePageData[],
  dirPath: string,
  list: MenuList
): MenuList {
  for (const page of pages) {
    const paths = page.path.split(dirPath)
    const secondPath = paths[1]
    if (!secondPath) continue
    const { path, title } = page
    if (!secondPath.includes('/')) {
      const menuItem: MenuItem = {
        link: path,
        text: title,
      }
      // 如果 secondPath 为不包括 / 字符，则为 page  配置
      list.push(menuItem)
    } else {
      const deepPaths = secondPath.split('/')
      const deepDir = dirPath + deepPaths[0] + '/'
      const isExist = list.find((item) => item.link === deepDir)
      if (isExist) continue
      const menuItem: MenuItem = {
        text: decodeURIComponent(deepPaths[0]),
        link: deepDir,
        children: [],
      }
      const deepPages = pages.filter((item) => item.path.startsWith(deepDir))
      getSidebarPages(deepPages, deepDir, menuItem.children as MenuList)
      list.push(menuItem)
    }
  }
  return list.sort((a, b) => {
    const s1 = a.text.toLocaleLowerCase()
    const s2 = b.text.toLocaleLowerCase()
    if (s1 < s2) {
      return -1
    }
    if (s1 > s2) {
      return 1
    }
    return 0
  })
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

export const getPostInfo = (post: ThemePageData): PostInfo => {
  // frontmatter
  const frontmatter = post.frontmatter
  const contributors = post.git.contributors
  // 作者
  const author =
    frontmatter.author ||
    (contributors ? (contributors[0] ? contributors[0].name : '') : '')
  // 日期
  const date =
    frontmatter.date || formatTimestamp(post.git.updatedTime || Date.now())
  // 标签
  const tags = frontmatter.tags || []
  // 分类
  const categories = frontmatter.categories || []
  // 文章海报
  const postImage = frontmatter.postImage || ''

  return {
    author,
    date,
    tags,
    categories,
    postImage,
  }
}

/**
 * 获取页面信息
 * @param pages 页面信息数组
 * @param type 页面信息类型
 * @returns 特定页面信息数组
 */
export function getInfoFromPages(
  pages: ThemePageData[],
  type: 'categories' | 'tags'
): LabelItem[] {
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
  }, [] as LabelItem[])
  return list.sort((a, b) => b.num - a.num)
}
