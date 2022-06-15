import type { ThemePageData } from './../../node/types'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import md5 from 'md5'
import type { MenuList } from '../../node'
export const useSidebarList = (
  pages: ThemePageData[],
  navs: MenuList,
  md5Path = ''
): { paths: Ref<string[]>; sidebarList: Ref<MenuList> } => {
  const route = useRoute()
  const sidebarList = ref([]) as Ref<MenuList>

  const paths = ref<string[]>([])

  watch(route, () => {
    const pathStr =
      md5Path ||
      route.query.md5 ||
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('md5'))
    for (const page of pages) {
      if (page.filePathRelative) {
        const dPath = page.filePathRelative?.split('/').slice(0, -1).join('/')
        console.log(dPath)
        if (md5(dPath) === pathStr) {
          paths.value = dPath.split('/')
          const list = [...paths.value]
          let targetList = navs
          while (list.length) {
            const nextPath = list.shift()
            const res = targetList.find((item) => item.text === nextPath)
            if (res?.children) {
              targetList = res.children
            }
          }
          sidebarList.value = targetList
          break
        }
      }
    }
  })
  return {
    paths,
    sidebarList,
  }
}

export const useSidebarList2 = (
  pages: ThemePageData[],
  navs: MenuList,
  filePath = ''
): { paths: Ref<string[]>; sidebarList: Ref<MenuList> } => {
  const route = useRoute()
  const sidebarList = ref([]) as Ref<MenuList>

  const paths = ref<string[]>([])

  watch(route, () => {
    const pathStr = route.path.split('PostsLayout')[1]
    for (const page of pages) {
      if (page.filePathRelative) {
        const dPath = page.filePathRelative?.split('/').slice(0, -1).join('/')
        console.log(dPath)
        if (md5(dPath) === pathStr) {
          paths.value = dPath.split('/')
          const list = [...paths.value]
          let targetList = navs
          while (list.length) {
            const nextPath = list.shift()
            const res = targetList.find((item) => item.text === nextPath)
            if (res?.children) {
              targetList = res.children
            }
          }
          sidebarList.value = targetList
          break
        }
      }
    }
  })
  return {
    paths,
    sidebarList,
  }
}
