<script setup lang="ts">
import BackToTop from '../components/BackToTop.vue'
import Footer from '../components/Footer.vue'
import CardCategories from '../components/CardCategories.vue'
import CardTags from '../components/CardTags.vue'
import NavbarItem from '../components/NavbarItem.vue'
import {
  useDarkMode,
  useNavs,
  usePages,
  useSidebarList,
  useThemeOptions,
} from '../hooks'
import { computed } from 'vue'
import { withBase } from '@vuepress/client'

const themeOptions = useThemeOptions()
const isDarkMode = useDarkMode()

// 背景图片
const contianerStyle = computed(() => {
  const { backgroundImage, darkBackgroundImage } = themeOptions.value
  const bgUrl =
    (isDarkMode.value ? darkBackgroundImage : backgroundImage) ||
    backgroundImage
  return {
    'background-image': `url("${withBase(bgUrl || '')}")`,
  }
})

const pages = usePages()
const navs = useNavs(pages)
const { sidebarList, paths } = useSidebarList(pages, navs)
// const menuList = ref<MenuList>([])

// const paths = ref<string[]>([])

// watch(route, () => {
//   const pathStr = route.path.split('PostsLayout')[1]
//   for (const page of pages) {
//     if (page.filePathRelative) {
//       const dPath = page.filePathRelative?.split('/').slice(0, -1).join('/')
//       if (md5(dPath) === pathStr) {
//         paths.value = dPath.split('/')
//         const list = [...paths.value]
//         let targetList = navs
//         while (list.length) {
//           const nextPath = list.shift()
//           const res = targetList.find((item) => item.text === nextPath)
//           if (res?.children) {
//             targetList = res.children
//           }
//         }
//         menuList.value = targetList
//         break
//       }
//     }
//   }
// })
</script>
<template>
  <!-- 头部 -->
  <!-- <Header :class="{ active: isActiveCls }" /> -->
  <!-- 背景图片 -->
  <div class="theme-background" :style="contianerStyle"></div>
  <!-- 搜索页 banner -->
  <div class="posts-banner">
    <h1>{{ paths.join('>') }}</h1>
  </div>
  <main class="theme-container theme-posts-container">
    <div class="theme-content">
      <!-- 侧边栏 -->
      <aside class="theme-aside">
        <CardCategories :pages="pages" />
        <CardTags :pages="pages" />
      </aside>
      <!-- 文章列表 -->
      <div class="theme-wrapper posts-container card-box">
        <!-- <div class="post-content markdown-body">
          <header v-if="pageData.path" class="header">
            <h1>{{ pageData.title }}</h1>
            <PostInfo :post="pageData" />
          </header>
          <Content />
        </div> -->
        <ul class="posts">
          <li v-for="item of sidebarList" :key="item.text" class="posts-item">
            <NavbarItem :item="item" />
          </li>
        </ul>
      </div>
    </div>
  </main>
  <Footer />
  <!-- 回到顶部 -->
  <BackToTop />
</template>
