<script setup lang="ts">
import NavbarDropdown from './NavbarDropdown.vue'
import NavbarItem from './NavbarItem.vue'
import { useDarkMode, useThemeOptions } from '../hooks'
import { computed } from 'vue'
const themeOptions = useThemeOptions()
const navbar = themeOptions.value.navbar

const darkMode = useDarkMode()
const themeIcon = computed(() => (darkMode.value ? 'icon-night' : 'icon-sun'))

const toggleTheme = (): void => {
  darkMode.value = !darkMode.value
}
</script>
<template>
  <nav class="navbar">
    <template v-for="item in navbar" :key="item.text">
      <NavbarDropdown v-if="item.children" :item="item" />
      <NavbarItem v-else :item="item" />
    </template>
    <button class="theme-toggle" @click="toggleTheme">
      <i class="iconfont" :class="themeIcon"></i>
    </button>
    <NavbarItem
      :item="{ text: '搜索', link: '/search' }"
      :icon="'icon-search'"
    />
  </nav>
</template>
