import type { MenuList, ThemePageData } from '../../node'
import md5 from 'md5'

export const getNavs = (pages: ThemePageData[]): MenuList => {
  const list: MenuList = []
  pages.forEach((page) => {
    if (page.filePathRelative) {
      const pathList = page.filePathRelative?.split('/')
      if (Array.isArray(pathList) && pathList.length) {
        let preList = list
        const paths: string[] = []
        while (pathList.length) {
          const nextPath = pathList.shift()
          if (nextPath && /\.md$/i.test(nextPath)) {
            preList.push({ text: page.title, link: page.path })
          } else if (nextPath) {
            const item = preList.find((item) => item.text === nextPath)
            paths.push(nextPath)
            if (!item) {
              const obj = {
                text: nextPath,
                link: '/PostsLayout',
                //  +
                md5: md5(paths.join('/')),
                children: [],
              }
              preList.push(obj)
              preList = obj.children
            } else if (item.children) {
              preList = item.children
            }
          }
        }
      }
    }
  })
  console.log(list)
  return list
}

export function getMenuList(list: MenuList): MenuList {
  return list.map((item) => {
    if (!item.children) return item
    const hasDeepChildren = item.children.some((child) => child.children)
    if (!hasDeepChildren)
      return { text: item.text, link: item.link, md5: item.md5 }
    return item
  })
}
