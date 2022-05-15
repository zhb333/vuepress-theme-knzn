import type { ThemePageData } from '../node'
export type LayoutType =
  | 'HomeLayout'
  | 'CategoriesLayout'
  | 'TagsLayout'
  | 'SearchLayout'
  | 'PostsLayout'
  | 'PostLayout'

export type LabelItem = { text: string; num: number }

export type PostInfo = {
  author: string
  date: string
  categories: string[]
  tags: string[]
  postImage: string
}

export type SidebarData = Partial<ThemePageData> & {
  children?: ThemePageData[]
}

export type SidebarItem = Partial<ThemePageData & { children: ThemePageData }>
