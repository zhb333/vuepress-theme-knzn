import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export const layoutMap = {
  '/': 'HomeLayout',
  '/tags/': 'TagsLayout',
  '/categories/': 'CategoriesLayout',
  '/search/': 'SearchLayout',
}

export const getLayout = (path): string => {
  return layoutMap[path] || 'PostLayout'
}

export const useCurrentLayout = (): Ref<string> => {
  const route = useRoute()
  const currentLayout = getLayout(route.path) || 'PostLayout'
  const layout = ref(currentLayout)

  watch(
    () => route.path,
    () => {
      layout.value = getLayout(route.path)
    }
  )
  return layout
}
