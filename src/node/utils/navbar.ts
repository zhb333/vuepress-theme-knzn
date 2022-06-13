import type { MenuItem, MenuList } from '../types'
const fs = require('fs')
const path = require('path')

// type MenuItem = {
//   text: string
//   link: string
//   children?: MenuItem[]
// }

/**
 * 导航项
 * @param cPath
 * @param tName
 * @returns
 */
const getNavbarItem = (cPath: string, tName: string): MenuItem => {
  const link = cPath
    .replace(process.cwd(), '')
    .replace(/\\/g, '/')
    .slice(tName.length + 1)
    .replace(/\.md$/i, '.html')
  const item = path.parse(cPath)
  return {
    text: item.name,
    link: link.endsWith('.html') ? link : link + '/?layout=PostsLayout',
  }
}

/**
 * 处理目录级别的导航项目
 * @param cPath
 * @param tName
 * @returns
 */
const getDirNavbarItem = (cPath: string, tName: string): MenuItem => {
  // 默认目录页导航
  const navbarItem = getNavbarItem(cPath, tName)
  const cFiles = fs.readdirSync(cPath)
  const isNavbarItem = cFiles.every((item) => {
    const cStat = fs.statSync(path.join(cPath, item))
    return cStat.isFile()
  })
  if (!isNavbarItem) {
    // 下拉框导航
    const children: MenuItem[] = []
    cFiles.forEach((file) => {
      // if (file.toLowerCase() === 'index.md') return
      const item = getNavbarItem(path.join(cPath, file), tName)
      children.push(item)
    })
    navbarItem.children = children
  }
  return navbarItem
}

/**
 * 自动生成导航配置
 * @param tName
 * @returns
 */
const getNavbar = (tName: string): MenuList => {
  const tPath = path.resolve(process.cwd(), tName)
  const navbar: MenuItem[] = []
  const files = fs.readdirSync(tPath)
  for (const file of files) {
    const cPath = path.join(tPath, file)
    if (['.vuepress', 'index.md'].includes(file.toLowerCase())) continue
    const stat = fs.statSync(cPath)
    if (stat.isDirectory()) {
      // 跳转到目录页面，或者为下拉框的导航项目
      navbar.push(getDirNavbarItem(cPath, tName))
    } else {
      // 其它直接跳转到文章内容的导航项目
      navbar.push(getNavbarItem(cPath, tName))
    }
  }
  // 首页
  return navbar
}

export { getNavbar }
