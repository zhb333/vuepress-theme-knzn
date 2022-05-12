import type { ThemePageData } from '../../node'
import type { LabelItem, PostInfo, SidebarData } from '../types'

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

export function formatSidebarPages(
  pages: ThemePageData[],
  dirPath: string
): SidebarData {
  const list: ThemePageData[] = []
  let root = {} as SidebarData
  for (const page of pages) {
    const paths = page.path.split(dirPath)
    const secordPath = paths[1]
    if (secordPath === '') {
      root = page
    } else if (paths[1].includes('/')) {
      const deepPaths = secordPath.split('/')
      const deepPages = pages.filter((item) =>
        item.path.startsWith(`${dirPath}${deepPaths[0]}/`)
      )
      console.log(deepPages)
      // const isExistPage = list.find
      // if ()
      // console.log(deepPaths)
      // console.log(paths)
      // console.log(page)
      //
    } else {
      list.push(page)
    }
  }
  root.children = list
  return root
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
    frontmatter.author || (contributors ? contributors[0].name : '')
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
