import type { ThemePageData } from '../../node'
import type { LabelItem } from '../types'
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

/**
 * 滚动到顶部
 * @returns void
 */
export const scrollToTop = (): void =>
  window?.scrollTo({ top: 0, behavior: 'smooth' })

/**
 * 获取滚动的高度
 * @returns number
 */
export const getScrollTop = (): number => {
  return (
    window.pageYOffset ||
    window.document.documentElement.scrollTop ||
    window.document.body.scrollTop ||
    0
  )
}

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
    return (
      scrollHeight > windowHeight &&
      scrollHeight <= scrollTop + windowHeight + 200
    )
  }
  return false
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
