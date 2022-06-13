import type { MenuList, ThemePageData } from '../../node'
// const getNavMap = (pages: ThemePageData[]): Record<string, any[]> => {
//   const objMap = {}
//   pages.forEach((page) => {
//     const pathList = page.filePathRelative?.split('/')
//     if (Array.isArray(pathList) && pathList.length) {
//       const prevPath = pathList.splice(0, 1)[0]
//       objMap[prevPath] = objMap[prevPath] || []
//       let prevList = objMap[prevPath]

//       while (pathList.length) {
//         const nextPath = pathList.shift()
//         if (nextPath && /\.md$/i.test(nextPath)) {
//           prevList.push(nextPath)
//         } else if (nextPath) {
//           const item = prevList.find((item) => {
//             return typeof item === 'object' && nextPath in item
//           })
//           if (item) {
//             prevList = item[nextPath]
//           } else {
//             const list = []
//             prevList.push({ [nextPath]: list })
//             prevList = list
//           }
//           // prevList.push()
//         }
//       }
//     }

//     console.log('\n')
//     console.log(page.title)
//     console.log(page.path)
//     console.log(page.filePathRelative, pathList)
//     console.log('\n')
//   })
//   return objMap
// }

export const getNavs = (pages: ThemePageData[]): MenuList => {
  const list: MenuList = []
  pages.forEach((page) => {
    const pathList = page.filePathRelative?.split('/')
    if (Array.isArray(pathList) && pathList.length) {
      let preList = list
      while (pathList.length) {
        const nextPath = pathList.shift()
        if (nextPath && /\.md$/i.test(nextPath)) {
          preList.push({ text: page.title, link: page.path })
        } else if (nextPath) {
          const item = preList.find((item) => item.text === nextPath)
          if (!item) {
            const obj = { text: nextPath, link: '', children: [] }
            preList.push(obj)
            preList = obj.children
          } else if (item.children) {
            preList = item.children
          }
        }
      }
    }
  })
  return list
}
