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
    <i class="iconfont icon-menu menu-btn"></i>
    <ul class="nav-list">
      <li
        v-for="item in navbar"
        :key="item.text"
        class="nav-item animate__animated animate__slideInRight"
      >
        <NavbarDropdown v-if="item.children" :item="item" />
        <NavbarItem v-else :item="item" />
      </li>
      <li class="nav-item animate__animated animate__slideInRight">
        <button class="theme-toggle" @click="toggleTheme">
          <i class="iconfont" :class="themeIcon"></i>
        </button>
      </li>
      <li class="nav-item animate__animated animate__slideInRight search-link">
        <NavbarItem
          :item="{ text: '搜索', link: '/search/' }"
          :icon="'icon-search'"
        />
      </li>
    </ul>
    <!-- <template v-for="item in navbar" :key="item.text">
      <NavbarDropdown
        v-if="item.children"
        :item="item"
        class="animate__animated animate__slideInRight"
      />
      <NavbarItem
        v-else
        :item="item"
        class="animate__animated animate__slideInRight"
      />
    </template> -->
  </nav>
</template>
