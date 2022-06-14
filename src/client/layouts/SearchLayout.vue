<script setup lang="ts">
import PostList from '../components/PostList.vue'
import BackToTop from '../components/BackToTop.vue'
import Pagination from '../components/Pagination.vue'
import Footer from '../components/Footer.vue'
import { useDarkMode, usePages, useThemeOptions } from '../hooks'
import { computed, ref } from 'vue'
import type { ThemePageData } from '../../node'
import { withBase } from '@vuepress/client'
// 搜索内容
const searchText = ref('')
// 搜索的文章
const list = ref<ThemePageData[]>([])
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

// 导航是否置顶

const pages = usePages()

const perPage = themeOptions.value.perPage || 10
const page = ref(1)
const total = ref(0)
const pageList = computed(() => {
  const skip = (page.value - 1) * perPage
  return list.value.slice(skip, skip + perPage)
})

const handlePageChange = (num): void => {
  page.value = num
}

// 搜索文章
const handleSearch = (): void => {
  const arr: ThemePageData[] = []
  if (!searchText.value) {
    list.value = []
    page.value = 1
    total.value = 0
    return
  }
  for (const page of pages) {
    if (page.title.includes(searchText.value)) {
      if (!arr.includes(page)) {
        arr.push(page)
        continue
      }
    }
    const headers = page.headers
    if (!headers) continue
    for (const header of headers) {
      if (header.title.includes(searchText.value)) {
        if (!arr.includes(page)) {
          arr.push(page)
        }
        continue
      }
    }
  }
  list.value = arr
  page.value = 1
  total.value = arr.length
}
</script>
<template>
  <!-- 头部 -->
  <!-- 背景图片 -->
  <div class="theme-background" :style="contianerStyle"></div>
  <!-- 搜索页 banner -->
  <div class="search-banner">
    <Transition
      enter-active-class="animate__animated animate__fadeInDown animate__fast"
      appear
    >
      <div class="search-box">
        <button class="icon">
          <i class="iconfont icon-search"></i>
        </button>
        <input
          v-model.trim="searchText"
          type="text"
          class="search-input"
          placeholder="请输入搜索内容..."
          @change.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
    </Transition>
  </div>
  <main class="theme-container theme-search-container">
    <div class="theme-content search-container">
      <!-- 文章列表 -->
      <div class="theme-wrapper theme-content-wrapper">
        <PostList :pages="pageList" />
        <Pagination
          v-show="total > perPage"
          :per-page="perPage"
          :page="page"
          :total="total"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </main>
  <Footer />
  <!-- 回到顶部 -->
  <BackToTop />
</template>
