import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { ISourceOptions } from 'tsparticles-engine'
import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { PageBase } from '@vuepress/shared'
// import type { Page } from '@vuepress/core'
import type { PageData } from '@vuepress/client'

export type MediaItem = {
  link: string
  icon: string
}

/**
 * 主题配置
 */
export type Palettes = 'light' | 'dark' | 'green' | 'yellow'

// 调色板相关
export interface PaletteOptions {
  logo?: string
  backgroundImage?: string
  avatar?: string
  postImage?: string
  particlesOptions?: ISourceOptions
  palettes?: Partial<Record<Palettes, PaletteOptions>>
}

// 配置
export interface ThemeLocaleData extends PaletteOptions {
  navbar?: NavbarConfig
  perPage?: number
  blogger?: string
  slogan?: string
  medias?: MediaItem[]
  maxCategories?: number
  maxTags?: number
  backgroundImageMap?: Partial<Record<Palettes, string>>

  beian?: string
  beianUrl?: string
  footerStartDate?: string
  // ===============
  selectLanguageText?: string
  selectLanguageName?: string
}

// 多语言配置
export type ThemeLocaleOptions = ThemeData<ThemeLocaleData>

// 导航组
export interface NavGroup<T> extends NavbarItem {
  children: T[]
}

// 导航项目配置
export interface NavbarItem {
  text: string
  link?: string
  activeMatch?: string
}

// 导航组配置
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>

// 导航配置
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]

export interface ThemeExtraPageData {
  filePathRelative: string | null
}

/**
 * 页面相关配置
 */
export type ThemePageData = PageData<
  ThemeExtraPageData,
  ThemeExtraPageFrontmatter
> &
  GitPluginPageData

export interface ThemeExtraPageFrontmatter {
  // 文章信息
  author?: string
  date?: string
  tags?: string[]
  categories?: string[]
  // 文章样式
  postImage?: string // 海报图片
}

export type ThemePageFrontmatter = PageBase<ThemeExtraPageFrontmatter>
