<script setup lang="ts">
import HomeLayout from './HomeLayout.vue'
import TagsLayout from './TagsLayout.vue'
import CategoriesLayout from './CategoriesLayout.vue'
import SearchLayout from './SearchLayout.vue'
import PostLayout from './PostLayout.vue'
import BackToTop from '../components/BackToTop.vue'
import Palette from '../components/Palette.vue'
import { computed, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { useCurrentLayout } from '../hooks'
import { debounce } from 'ts-debounce'
import Navbar from '../components/Navbar.vue'
import { getScrollTop } from '../utils'

const layout = useCurrentLayout()

const components = {
  HomeLayout,
  TagsLayout,
  CategoriesLayout,
  SearchLayout,
  PostLayout,
}
provide('layout', layout)
const currentComponent = computed(() => {
  return components[layout.value]
})

const scrollTop = ref(0)
const onScroll = debounce(() => {
  scrollTop.value = getScrollTop()
}, 100)

const onScrollFun = (): void => {
  onScroll()
}

onMounted(() => {
  scrollTop.value = getScrollTop()
  window?.addEventListener('scroll', onScrollFun, false)
})

onBeforeUnmount(() => {
  window?.removeEventListener('scroll', onScrollFun, false)
})

provide('scrollTop', scrollTop)
</script>
<template>
  <Navbar />
  <Component :is="currentComponent" :class="layout"></Component>
  <BackToTop />
  <Palette />
</template>
