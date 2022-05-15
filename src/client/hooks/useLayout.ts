/**
 * 当前布局
 */
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { LayoutType } from '../types'
import { isPostsLayout } from '../utils'

export const layoutMap: Record<string, LayoutType> = {
  '/': 'HomeLayout',
  '/tags/': 'TagsLayout',
  '/categories/': 'CategoriesLayout',
  '/search/': 'SearchLayout',
}

export const getLayout = (path): LayoutType => {
  const layout = layoutMap[path]
  if (!layout) {
    if (isPostsLayout(path)) return 'PostsLayout'
    return 'PostLayout'
  }
  return layout
}

export const useLayout = (): Ref<string> => {
  const route = useRoute()
  const layout = ref(getLayout(route.path))

  watch(
    () => route.path,
    () => {
      layout.value = getLayout(route.path)
    }
  )
  return layout
}
