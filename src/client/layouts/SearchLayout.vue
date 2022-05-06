<script setup lang="ts">
import PostList from './components/PostList.vue'
import ThemeLayout from './ThemeLayout.vue'
import CommonFooter from './components/CommonFooter.vue'
import ThemeBackground from './components/ThemeBackground.vue'
import { usePages } from '../hooks'
import { ref } from 'vue'
import type { ThemePageData } from '../../node'
const pages = usePages()

const searchText = ref('')

const list = ref<ThemePageData[]>([])

const handleSearch = (): void => {
  const arr: ThemePageData[] = []
  if (!searchText.value) {
    list.value = []
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
}
</script>
<template>
  <ThemeLayout>
    <template #background>
      <ThemeBackground />
    </template>
    <template #banner>
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
            />
            <button class="search-btn" @click="handleSearch">搜索</button>
          </div>
        </Transition>
      </div>
    </template>
    <template #default>
      <PostList :pages="list" />
    </template>
    <template #footer>
      <CommonFooter />
    </template>
  </ThemeLayout>
</template>
