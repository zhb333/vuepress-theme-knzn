import type { ThemePageData } from '../../node'
import { computed } from 'vue'
import { formatTimestamp } from '../utils'
import type { PageInfo } from '../types'

export const usePageInfo = (post: ThemePageData): PageInfo => {
  // frontmatter
  const frontmatter = post.frontmatter
  const contributors = post.git.contributors
  // 作者
  const author = computed(() => {
    const contributor = contributors?.length ? contributors[0].name : '匿名'
    return frontmatter.author || contributor
  })
  // 日期
  const date = computed(() => {
    return (
      frontmatter.date || formatTimestamp(post.git.updatedTime || Date.now())
    )
  })
  // 标签
  const tags = frontmatter.tags || []
  // 分类
  const categories = frontmatter.categories || []

  return {
    frontmatter,
    author,
    date,
    tags,
    categories,
  }
}
