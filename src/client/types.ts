import type { ThemeExtraPageFrontmatter } from '../node'
import type { PageFrontmatter } from '@vuepress/client'
import type { ComputedRef } from 'vue'

// 菜单类型
export interface NavMenuItem {
  text: string
  link: string
  activeMatch?: string
  children?: NavMenuItem[]
}

// 文章信息
export type PageInfo = {
  frontmatter: PageFrontmatter<ThemeExtraPageFrontmatter>
  author: ComputedRef<string>
  date: ComputedRef<string>
  tags: ThemeExtraPageFrontmatter['tags']
  categories: ThemeExtraPageFrontmatter['categories']
}

export type LayoutTypes = 'HomeLayout' | 'PostLayout' | 'CategoryLayout'

export type HomeLayoutTypes = 'Home' | 'Search' | 'Categories' | 'Tags'

export type CategoryType = { text: string; num: number }
