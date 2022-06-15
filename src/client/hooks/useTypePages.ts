/**
 * 根据类型获取文章
 */
import { usePages, useThemeOptions } from '.'
import { computed, ref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { ThemePageData } from '../../node'

export interface ITypePages {
  pages: ThemePageData[] // 所有文章
  pageList: ComputedRef<ThemePageData[]> // 当前页的文章列表
  handlePageChange: (num: number) => void // 切换页面控制函数
  perPage: number // 每页显示是文章数
  page: Ref<number> // 当前页数
  total: Ref<number> // 当前类型的文章数
}

export const useTypePages = (
  key: 'tags' | 'categories',
  param: 'tag' | 'category'
): ITypePages => {
  const themeOptions = useThemeOptions()
  const pages = usePages()
  const route = useRoute()
  const type = computed(() => {
    return (
      route.query[param] ||
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('query'))
    )
  })

  const typePages = ref<ThemePageData[]>(pages)

  const getTypePages = (): void => {
    if (type.value === 'all') {
      typePages.value = pages.filter((item) => {
        return item.frontmatter[key]?.length
      })
    } else {
      typePages.value = pages.filter((item) => {
        return item.frontmatter[key]?.includes(type.value as string)
      })
    }
  }

  getTypePages()

  const perPage = themeOptions.value.perPage || 10
  const page = ref(1)
  const total = ref(typePages.value.length)

  watch(type, () => {
    page.value = 1
    getTypePages()
    total.value = typePages.value.length
  })

  const pageList = computed(() => {
    const skip = (page.value - 1) * perPage
    return typePages.value.slice(skip, skip + perPage)
  })

  const handlePageChange = (num): void => {
    page.value = num
  }

  return {
    pages,
    pageList,
    handlePageChange,
    perPage,
    page,
    total,
  }
}
