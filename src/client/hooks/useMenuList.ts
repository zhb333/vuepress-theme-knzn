import type { ThemePageData } from './../../node/types'
import { useRoute } from 'vue-router'
import { getSidebarPages } from '../utils'
import type { MenuList } from '../../node'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export const useMenuList = (pages: ThemePageData[]): Ref<MenuList> => {
  const menuList = ref([]) as Ref<MenuList>
  const route = useRoute()

  const getList = (): void => {
    menuList.value = []
    const dirPath = route.path.replace(/[\w%-]+\.html$/, '')
    const sidebarPages = pages.filter((page) => page.path.startsWith(dirPath))
    getSidebarPages(sidebarPages, dirPath, menuList.value)
    menuList.value = menuList.value.filter((item) => {
      return !/index\.html$/i.test(item.link)
    })
  }
  watch(
    () => route.path,
    () => getList(),
    { immediate: true }
  )
  return menuList
}
