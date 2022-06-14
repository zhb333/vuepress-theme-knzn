import { getNavs } from './../utils/navs'
import type { MenuList, ThemePageData } from './../../node/types'
let navs: MenuList
export const useNavs = (pages: ThemePageData[]): MenuList => {
  if (!navs) {
    navs = getNavs(pages)
  }
  return navs
}
