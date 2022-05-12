/**
 * 滚动到顶部
 * @returns void
 */
export const scrollToTop = (): void => {
  window?.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * 获取滚动的高度
 * @returns number
 */
export const getScrollTop = (): number => {
  if (typeof window === 'undefined') return 0
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
      window.document.documentElement.clientHeight ||
      window.document.body.clientHeight // 可视区的高度
    const scrollHeight =
      window.document.documentElement.scrollHeight ||
      window.document.body.scrollHeight // dom元素的高度，包含溢出不可见的内容
    return (
      scrollHeight > windowHeight &&
      scrollHeight <= scrollTop + windowHeight + 200
    )
  }
  return false
}

/**
 * 是否滚动到顶部
 * @param scrollTop 滚动条距离顶部的距离
 * @returns
 */
export const assetScrollToTop = (scrollTop: number): boolean => {
  return scrollTop < 300
}
