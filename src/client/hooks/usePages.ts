/**
 * 获取所有文章
 */
import { usePagesData } from '@vuepress/client'
import type { ThemePageData } from '../../node'
import { inject } from 'vue'
import type { App, InjectionKey } from 'vue'
import { layoutMap } from './useLayout'
const paths = Object.keys(layoutMap)
paths.push('/404.html')

type ThemePages = ThemePageData[]
let pages: ThemePages = []
const pagesSymbol: InjectionKey<ThemePages> = Symbol('pages')

export const usePages = (): ThemePages => {
  const pages = inject(pagesSymbol)
  if (!pages) {
    throw new Error(`pages InjectionK is called without provider.`)
  }
  return pages
}

export async function setupPages(app: App, router): Promise<void> {
  const pagesData = usePagesData()
  pages = await Promise.all(
    Object.keys(pagesData.value).map((key) => (pagesData.value[key] as any)())
  )
  pages = pages.filter((item) => {
    return !paths.includes(item.path) && !/\/index\.html$/.test(item.path)
  })
  app.provide(pagesSymbol, pages)
}
