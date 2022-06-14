<script setup lang="ts">
import NavbarDropdown from './NavbarDropdown.vue'
import NavbarItem from './NavbarItem.vue'
import NavbarBloger from './NavbarBloger.vue'
import Medias from './Medias.vue'
import { useDarkMode, useNavs, usePages, useThemeOptions } from '../hooks'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getMenuList } from '../utils'
const pages = usePages()
const navs = useNavs(pages)
const menuList = getMenuList(navs)
const themeOptions = useThemeOptions()
const navbar = themeOptions.value.navbar || menuList

const darkMode = useDarkMode()
const themeIcon = computed(() => (darkMode.value ? 'icon-night' : 'icon-sun'))
const navListEle = ref<HTMLElement | null>(null)
const menuBtn = ref(null)

const toggleTheme = (): void => {
  darkMode.value = !darkMode.value
}

const isNavListActive = ref(false)

const toggleNavListActive = (): void => {
  isNavListActive.value = !isNavListActive.value
}

const handleContainerClick = (e: Event): void => {
  if (e.target === menuBtn.value) {
    return
  }

  if (navListEle.value && navListEle.value.contains(e.target as HTMLElement)) {
    return
  }
  if (isNavListActive.value) {
    isNavListActive.value = false
  }
}

onMounted(() => {
  document
    .querySelector('#app')
    ?.addEventListener('click', handleContainerClick)
})

onBeforeUnmount(() => {
  document
    .querySelector('#app')
    ?.removeEventListener('click', handleContainerClick)
})
</script>
<template>
  <nav class="navbar">
    <i
      ref="menuBtn"
      class="iconfont icon-menu menu-btn"
      @click="toggleNavListActive"
    ></i>
    <ul ref="navListEle" class="nav-list" :class="{ active: isNavListActive }">
      <li class="nav-item">
        <NavbarBloger />
      </li>
      <li v-for="item in navbar" :key="item.text" class="nav-link nav-item">
        <NavbarDropdown v-if="item.children" :item="item" />
        <NavbarItem v-else :item="item" />
      </li>
      <li class="nav-link nav-item">
        <button class="theme-toggle" @click="toggleTheme">
          <i class="iconfont" :class="themeIcon"></i>
        </button>
      </li>
      <li class="nav-link nav-item search-link">
        <NavbarItem
          :item="{ text: '搜索', link: '/search/' }"
          :icon="'icon-search'"
        />
      </li>
      <li class="nav-item nav-medias">
        <Medias />
      </li>
    </ul>
  </nav>
</template>
